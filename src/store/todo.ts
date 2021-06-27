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
  saveTodo: Action<TodoModel, Todo>
  setTodos: Thunk<TodoModel, Todo>
  getTodosByUserId: Thunk<TodoModel, string>
  resetTodos: Action<TodoModel>
}

function sortTodos(todos: Todo[]) {
  return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

const todoModel: TodoModel = {
  todos: [],
  saveTodo: action((state, payload) => {
    state.todos = sortTodos([...state.todos, payload])
  }),
  resetTodos: action((state, _) => {
    state.todos = []
  }),
  getTodosByUserId: thunk(async (actions, payload) => {
    const todos = await firebase.firestore().collection('todos').where('userId', '==', payload).get()
    todos.forEach(doc => {
      actions.saveTodo({ id: doc.id, ...doc.data() } as Todo)
    })
  }),
  setTodos: thunk(async (actions, payload) => {
    await firebase
      .firestore()
      .collection('todos')
      .doc(payload.id)
      .set({ ...payload }, { merge: true })
    actions.saveTodo(payload)
  })
}

export default todoModel
