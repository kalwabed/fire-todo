import { Box } from '@chakra-ui/react'

const Content: React.FC = ({ children }) => {
  return (
    <Box as="main" flex="1 1 auto" maxW={['2xl', '5xl']} mx="auto">
      {children}
    </Box>
  )
}

export default Content
