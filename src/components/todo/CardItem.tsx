import { useState } from 'react'
import { Skeleton, Box, VStack, Text, Checkbox } from '@chakra-ui/react'

import { useActions, useStore } from 'src/store/hooks'
import { Todo } from 'src/store/todo'

function dateFormatter(date: string): string {
  const fDate = new Date(date)
  return `${fDate.toLocaleDateString()}, ${fDate.toLocaleTimeString()}`
}

const CardItem = (todo: Todo) => {
  const [isTodosTransition, setIsTodosTransition] = useState(false)
  const { createdAt, text, isCompleted } = todo

  const todos = useStore(state => state.todo.todos)

  const updateTodo = useActions(actions => actions.todo.updateTodo)
  const resetTodos = useActions(actions => actions.todo.resetTodos)

  const handleCheckbox = () => {
    const refactoredTodos = todos.filter(target => target.id !== todo.id) as Todo[]
    setIsTodosTransition(true)
    setTimeout(() => {
      resetTodos(refactoredTodos)
      updateTodo({ ...todo, isCompleted: !todo.isCompleted })
      setIsTodosTransition(false)
    }, 1000)
  }

  return (
    <Skeleton mb={1} isLoaded={!isTodosTransition}>
      <Box border="1px" borderColor="gray.200" rounded="sm" p={2} _hover={{ borderColor: 'gray.400' }}>
        <VStack align="start">
          <Text color="gray.500">{dateFormatter(createdAt)}</Text>
          <Checkbox defaultChecked={isCompleted} onChange={handleCheckbox}>
            <Text as={isCompleted ? 'del' : 'span'}>{text}</Text>
          </Checkbox>
        </VStack>
      </Box>
    </Skeleton>
  )
}

export default CardItem
