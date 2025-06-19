import {
  Box,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useDisclosure,
  VStack,
  Input,
} from '@chakra-ui/react'
import { useColorModeValue } from '../components/ui/color-mode'
import { MdDelete } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import { useProductStore } from '../store/product'
import { toaster, Toaster } from '../components/ui/toaster'
import { Button, CloseButton, Portal } from "@chakra-ui/react"
import { useState } from "react"

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600, gray.200')
  const bg = useColorModeValue('white', 'gray.800')

  const { open, onOpen, onClose } = useDisclosure()
  const [updatedProduct, setUpdateProduct] = useState(product)


  const { updateProduct, deleteProduct } = useProductStore()
  const handleDeleteProduct = async (pid) => {
    console.log('deleting: ', pid)
    const { success, message } = await deleteProduct(pid)

    if (!success) {
      toaster.create({
        title: 'Error',
        type: 'error',
        description: message,
        closable: true,
      })
    } else {
      toaster.create({
        title: 'Success',
        type: 'success',
        description: message,
        closable: true,
      })
    }
  }

  const handleUpdateProduct = async (pid, updatedProduct) => {
    console.log('updating: ', pid, updatedProduct)
    const { success, message } = await updateProduct(pid, updatedProduct)
    onClose()

    if (!success) {
      toaster.create({
        title: 'Error',
        type: 'error',
        description: message,
        closable: true,
      })
    }
    else {
      toaster.create({
        title: 'Success',
        type: 'success',
        description: "Product updated successfully",
        closable: true,
      })
    }
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
      margin={8}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton colorPalette={'blue'} variant={'subtle'} onClick={onOpen}>
            <FaEdit />
          </IconButton>

          <IconButton
            colorPalette={'red'}
            variant={'subtle'}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <Icon>
              <MdDelete />
            </Icon>
          </IconButton>
        </HStack>
      </Box>
      <Dialog.Root lazyMount open={open} 
      // onOpenChange={(e) => setOpen(e.open)}
      >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
            <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) => setUpdateProduct({ ...updatedProduct, name: e.target.value })}
                />

                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) => setUpdateProduct({ ...updatedProduct, price: e.target.value })}
                />

                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) => setUpdateProduct.image({ ...updatedProduct, image: e.target.value })}
                />
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              {/* <Dialog.ActionTrigger asChild> */}
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              {/* </Dialog.ActionTrigger> */}
              <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>

      <Toaster />
    </Box>
  )
}

export default ProductCard
