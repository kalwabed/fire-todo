import { Flex } from '@chakra-ui/react'

const AppRoot: React.FC = ({ children }) => {
  return (
    <Flex flexDir="column" minH="100vh">
      {children}
    </Flex>
  )
}

export default AppRoot
