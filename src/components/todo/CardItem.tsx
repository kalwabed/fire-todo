import { Box, VStack, Text, Checkbox } from '@chakra-ui/react'

import { Todo } from 'src/store/todo'

const CardItem = (todo: Todo) => {
  const { createdAt, text, isCompleted } = todo

  return (
    <Box border="1px" borderColor="gray.200" rounded="sm" p={2} _hover={{ borderColor: 'gray.400' }}>
      <VStack align="start">
        <Text color="gray.500">{createdAt.toString()}</Text>
        <Checkbox defaultChecked={isCompleted}>{text}</Checkbox>
      </VStack>
    </Box>
  )
}

export default CardItem
