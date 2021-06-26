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
}

const todoModel: TodoModel = {
  todos: [{ createdAt: '13-04-02', text: 'Mandi', userId: '1' }],
  saveTodo: action((state, payload) => {
    state.todos.push(payload)
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
