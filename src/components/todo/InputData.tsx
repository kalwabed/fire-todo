import { useState } from 'react'
import { Input } from '@chakra-ui/react'

import { Todo } from 'src/store/todo'
import { useActions, useStore } from 'src/store/hooks'

const InputData = () => {
  const [todo, setTodo] = useState('')

  const user = useStore(state => state.user.user)

  const addTodo = useActions(actions => actions.todo.addTodo)
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
      addTodo(newTodo)
      setTodo('')
    }
  }

  return (
    <Input
      placeholder="Add new todo"
      mb={4}
      value={todo}
      onChange={e => setTodo(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default InputData
