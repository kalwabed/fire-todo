import { Button, HStack, Text } from '@chakra-ui/react'

import { useActions, useStore } from 'src/store/hooks'

const Identity = () => {
  const signInWithGoogle = useActions(actions => actions.user.signInWithGoogle)
  const signOutWithGoogle = useActions(actions => actions.user.signOutWithGoogle)

  const user = useStore(state => state.user.user)
  const resetTodos = useActions(state => state.todo.resetTodos)
  const isAuthenticated = useStore(state => state.user.isAuthenticated)

  const handleButton = () => {
    if (isAuthenticated) {
      resetTodos([])
      signOutWithGoogle()
      return
    }
    signInWithGoogle()
  }

  return (
    <HStack>
      {isAuthenticated ? (
        <Text color="gray.500">Welcome, {user?.displayName} | </Text>
      ) : (
        <Text color="gray.500">Please login to proceed | </Text>
      )}
      <Button colorScheme="teal" variant="link" onClick={handleButton}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </HStack>
  )
}

export default Identity
