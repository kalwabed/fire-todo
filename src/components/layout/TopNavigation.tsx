import { useState } from 'react'
import { Box, Button, List, ListItem, Link as ChakraLink } from '@chakra-ui/react'
import { Link } from '@reach/router'

import Logo from '../../logo.svg'
import { useActions, useStore } from 'src/store/hooks'

const TopNavigation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const isAuth = useStore(state => state.user.isAuth)
  const signInWithGoogle = useActions(actions => actions.user.signInWithGoogle)
  const signOutWithGoogle = useActions(actions => actions.user.signOutWithGoogle)

  console.log(isAuth)

  const handleButton = () => {
    if (isAuth) {
      setIsLoading(true)
      signOutWithGoogle()
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    signInWithGoogle()
    setIsLoading(false)
  }

  return (
    <Box as="nav" height={['88px', '80px']} zIndex={50}>
      <List display="flex" flexWrap="wrap" alignItems="center" mx="auto" maxW={['2xl', '5xl']}>
        <ListItem display="flex" alignItems="center" h="full" mr="auto" pos="relative">
          <ChakraLink as={Link} to="/" py=".5rem" px="1rem" h="full" _hover={{ textDecoration: 'none' }}>
            <img src={Logo} alt="logo" width={80} />
          </ChakraLink>
        </ListItem>

        <ListItem display="flex" alignItems="center" h="full">
          <ChakraLink
            as={Link}
            to="/"
            py=".5rem"
            px="1rem"
            h="full"
            _hover={{ textDecoration: 'none', bgColor: 'gray.100' }}
          >
            Home
          </ChakraLink>
        </ListItem>

        <ListItem display="flex" alignItems="center" h="full">
          <ChakraLink
            as={Link}
            to="/todo"
            py=".5rem"
            px="1rem"
            h="full"
            _hover={{ textDecoration: 'none', bgColor: 'gray.100' }}
          >
            My todo
          </ChakraLink>
        </ListItem>

        <ListItem display="flex" alignItems="center" h="full" ml={3}>
          <Button isLoading={isLoading} colorScheme="teal" onClick={handleButton}>
            {isAuth ? 'Logout' : 'Login'}
          </Button>
        </ListItem>
      </List>
    </Box>
  )
}

export default TopNavigation
