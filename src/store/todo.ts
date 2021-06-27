import { action, Action, Thunk, thunk } from 'easy-peasy'

import firebase from 'src/lib/firebase'

export interface Todo {
  id?: string
  text: string
  isCompleted?: boolean
  createdAt: string
  userId: string
}

export interface TodoModel {
  todos: Todo[]
  setAndSortTodos: Action<TodoModel, Todo>
  saveTodo: Thunk<TodoModel, Todo>
  updateTodo: Thunk<TodoModel, Todo>
  getTodosByUserId: Thunk<TodoModel, string>
  resetTodos: Action<TodoModel, [] | Todo[]>
}

function sortTodos(todos: Todo[]) {
  return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

const todoModel: TodoModel = {
  todos: [],
  setAndSortTodos: action((state, payload) => {
    state.todos = sortTodos([...state.todos, payload])
  }),
  resetTodos: action((state, payload) => {
    state.todos = payload
  }),
  getTodosByUserId: thunk(async (actions, payload) => {
    const todos = await firebase.firestore().collection('todos').where('userId', '==', payload).get()

    todos.forEach(doc => {
      actions.setAndSortTodos({ id: doc.id, ...doc.data() } as Todo)
    })
  }),
  saveTodo: thunk(async (actions, payload) => {
    const todo = await firebase
      .firestore()
      .collection('todos')
      .add({ ...payload })

    const id = todo.id
    actions.setAndSortTodos({ id, ...payload })
  }),
  updateTodo: thunk(async (actions, payload) => {
    await firebase
      .firestore()
      .collection('todos')
      .doc(payload.id)
      .set({ ...payload }, { merge: true })

    actions.setAndSortTodos({ ...payload })
  })
}

export default todoModel
