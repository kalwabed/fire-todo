import { useState } from 'react'
import { Input } from '@chakra-ui/react'

import { Todo } from 'src/store/todo'
import { useActions, useStore } from 'src/store/hooks'

const InputData = () => {
  const [todo, _setTodo] = useState('')

  const user = useStore(state => state.user.user)

  const setTodos = useActions(actions => actions.todo.setTodos)
  const checkUserAuthenticate = useActions(actions => actions.user.checkUserAuthenticate)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    const newTodo: Todo = {
      text: value,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      userId: user!.uid
    }

    if (e.key === 'Enter') {
      checkUserAuthenticate()
      setTodos(newTodo)
      _setTodo('')
    }
  }

  return (
    <Input
      placeholder="Add new todo"
      variant="flushed"
      mb={4}
      value={todo}
      onChange={e => _setTodo(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default InputData
