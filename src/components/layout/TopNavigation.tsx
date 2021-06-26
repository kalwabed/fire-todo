import { useState, useEffect } from 'react'
import { Box, Button, List, Text, ListItem, Link as ChakraLink } from '@chakra-ui/react'
import { Link } from '@reach/router'

import Logo from '../../logo.svg'
import { useActions, useStore } from 'src/store/hooks'

const TopNavigation = () => {
  const [isLoading, setIsLoading] = useState(false)

  const checkUserAuthenticate = useActions(actions => actions.user.checkUserAuthenticate)
  const signInWithGoogle = useActions(actions => actions.user.signInWithGoogle)
  const signOutWithGoogle = useActions(actions => actions.user.signOutWithGoogle)

  const user = useStore(state => state.user.user)
  const isAuthenticated = useStore(state => state.user.isAuthenticated)

  useEffect(() => {
    checkUserAuthenticate()
  }, [])

  const handleButton = () => {
    if (isAuthenticated) {
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

        {isAuthenticated && (
          <ListItem display="flex" alignItems="center" h="full">
            <Text color="gray.500">Welcome, {user?.displayName}</Text>
          </ListItem>
        )}

        <ListItem display="flex" alignItems="center" h="full" ml={3}>
          <Button isLoading={isLoading} colorScheme="teal" onClick={handleButton}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </ListItem>
      </List>
    </Box>
  )
}

export default TopNavigation
