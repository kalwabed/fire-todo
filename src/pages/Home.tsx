import { Box, Text, Flex, Checkbox, VStack } from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'

import Content from '../components/layout/Content'
import Page from '../components/layout/Page'

const Item = () => (
  <Box border="1px" borderColor="gray.200" rounded="sm" p={2} _hover={{ borderColor: 'gray.400' }}>
    <VStack align="start">
      <Checkbox>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Checkbox>
      <Text color="gray.500">created at: 20:19 10 13 21</Text>
    </VStack>
  </Box>
)

const HomePage: React.FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Content>
        <Flex flexDir="column" justify="center" maxW={['2xl', 'lg']} mx="auto">
          <Item />
          <Item />
        </Flex>
      </Content>
    </Page>
  )
}

export default HomePage
