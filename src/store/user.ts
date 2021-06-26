import { action, Action, thunk, Thunk } from 'easy-peasy'

import firebase from 'src/lib/firebase'
import { useActions, useStore } from './hooks'

export interface User extends Partial<firebase.User> {
  email: string
  name: string
  uid: string
}

export interface UserModel {
  isAuthenticated: boolean
  setIsAuthenticated: Action<UserModel, boolean>
  user?: User
  signInWithGoogle: Thunk<UserModel>
  signOutWithGoogle: Thunk<UserModel>
  setUser: Action<UserModel, User>
  addUserToDB: Thunk<UserModel, User>
  checkUserAuthenticate: Thunk<UserModel>
}

function formatUser(rawUser: firebase.auth.UserCredential): User {
  return {
    email: rawUser.user?.email || '',
    uid: rawUser.user?.uid || '',
    name: rawUser.user?.displayName || ''
  }
}

const userModel: UserModel = {
  isAuthenticated: false,
  setIsAuthenticated: action((state, payload) => {
    state.isAuthenticated = payload
  }),
  signInWithGoogle: thunk(async (actions, _) => {
    const userSignIn = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    const user = formatUser(userSignIn)

    actions.addUserToDB(user)
    actions.checkUserAuthenticate()
  }),
  addUserToDB: thunk(async (_, payload) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(payload.uid)
      .set({ ...payload }, { merge: true })
  }),
  signOutWithGoogle: thunk(async (actions, _) => {
    await firebase.auth().signOut()
    actions.setIsAuthenticated(false)
    actions.setUser({ email: '', uid: '', name: '' })
  }),
  setUser: action((state, payload) => {
    state.user = { ...payload }
  }),
  checkUserAuthenticate: thunk(actions => {
    return firebase.auth().onAuthStateChanged(() => {
      const user = firebase.auth().currentUser as unknown as User
      actions.setUser(user)

      if (user) {
        actions.setIsAuthenticated(true)
      } else {
        actions.setIsAuthenticated(false)
      }
      return user
    })
  })
}

export default userModel
