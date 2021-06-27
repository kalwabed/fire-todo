import { Flex } from '@chakra-ui/react'

const AppRoot: React.FC = ({ children }) => {
  return (
    <Flex flexDir="column" minH="100vh" pb={20}>
      {children}
    </Flex>
  )
}

export default AppRoot
