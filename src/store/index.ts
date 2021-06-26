import { createStore } from 'easy-peasy'

import todoModel, { TodoModel } from './todo'
import userModel, { UserModel } from './user'

export interface StoreModel {
  todo: TodoModel
  user: UserModel
}

const store = createStore<StoreModel>({ todo: todoModel, user: userModel })

export default store
