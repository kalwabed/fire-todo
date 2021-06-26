import { Box, Text, Flex, Checkbox, VStack } from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'

import Content from '../components/layout/Content'
import Page from '../components/layout/Page'
import { useStore } from 'src/store/hooks'

const Item = ({ text = '', createdAt = '' }) => (
  <Box border="1px" borderColor="gray.200" rounded="sm" p={2} _hover={{ borderColor: 'gray.400' }}>
    <VStack align="start">
      <Checkbox>{text}</Checkbox>
      <Text color="gray.500">{createdAt}</Text>
    </VStack>
  </Box>
)

const HomePage: React.FC<RouteComponentProps> = () => {
  const todos = useStore(state => state.todo.todos)

  return (
    <Page>
      <Content>
        <Flex flexDir="column" justify="center" maxW={['2xl', 'lg']} mx="auto">
          {todos?.map(todo => (
            <Item key={todo.userId} {...todo} />
          ))}
        </Flex>
      </Content>
    </Page>
  )
}

export default HomePage
