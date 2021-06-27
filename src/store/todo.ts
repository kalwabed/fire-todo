import { action, Action, Thunk, thunk } from 'easy-peasy'

import firebase from 'src/lib/firebase'

export interface Todo {
  uid?: string
  text: string
  isCompleted?: boolean
  createdAt: string
  userId: string
}

export interface TodoModel {
  todos: Todo[]
  saveTodo: Action<TodoModel, Todo>
  addTodo: Thunk<TodoModel, Todo>
  getTodosByUserId: Thunk<TodoModel, string>
  resetTodos: Action<TodoModel>
}

const todoModel: TodoModel = {
  todos: [],
  saveTodo: action((state, payload) => {
    state.todos.push(payload)
  }),
  resetTodos: action((state, _) => {
    state.todos = []
  }),
  getTodosByUserId: thunk(async (actions, payload) => {
    const todos = await firebase.firestore().collection('todos').where('userId', '==', payload).get()
    todos.forEach(doc => {
      actions.saveTodo(doc.data() as Todo)
    })
  }),
  addTodo: thunk(async (actions, payload) => {
    await firebase
      .firestore()
      .collection('todos')
      .doc(payload.uid)
      .set({ ...payload }, { merge: true })
    actions.saveTodo(payload)
  })
}

export default todoModel
