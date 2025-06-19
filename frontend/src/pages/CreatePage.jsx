import { Container, VStack, Box, Input, Button, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { useColorModeValue } from '../components/ui/color-mode'
import { useProductStore } from '../store/product'
import { toaster, Toaster } from '../components/ui/toaster'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  })

  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)

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

    setNewProduct({ name: '', prine: '', image: '' })
  }

  return (
    <Container maxW="800px">
      <VStack spacing={8}>
        <Heading as={'h1'} size={'4xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              borderColor={'gray.700'}
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />

            <Input
              borderColor={'gray.700'}
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />

            <Input
              borderColor={'gray.700'}
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button colorScheme={'blue'} onClick={handleAddProduct} w="full">
              Add Product
            </Button>

            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
