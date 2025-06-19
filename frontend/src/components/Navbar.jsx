import { Text, Container, Flex, HStack, Button, VStack } from '@chakra-ui/react'
import { useColorMode } from './ui/color-mode'
import { LuShoppingCart, LuSun, LuMoon } from 'react-icons/lu'
import { IoMoon } from 'react-icons/io5'
// import { PlusSquareIcon } from '@chakra-ui/icons' // Not found in icons
import { CiSquarePlus } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Link to={'/'}>
          <HStack>
            <Text
              fontSize={{ base: '22', sm: '28' }}
              fontWeight={'bold'}
              textTransform={'uppercase'}
              textAlign={'center'}
              bgGradient="to-r"
              gradientFrom="cyan.400"
              gradientTo="blue.500"
              bgClip={'text'}
            >
              Product Store
            </Text>
            <LuShoppingCart />
          </HStack>
        </Link>
        <HStack spacing={2} alignItems={'center'}>
          <Link to="/create">
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
