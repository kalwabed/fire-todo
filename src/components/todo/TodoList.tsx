import { useStore } from 'src/store/hooks'
import CardItem from 'src/components/todo/CardItem'

const TodoList = () => {
  const todos = useStore(state => state.todo.todos)

  return (
    <>
      {todos?.map(todo => (
        <CardItem key={todo.id} {...todo} />
      ))}
    </>
  )
}

export default TodoList
