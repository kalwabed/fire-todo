import { action, Action, thunk, Thunk } from 'easy-peasy'

import firebase from 'src/lib/firebase'

export interface User {
  email: string
  name: string
  uid: string
}

export interface UserModel {
  user?: User
  isAuth: boolean
  signInWithGoogle: Thunk<UserModel>
  signOutWithGoogle: Thunk<UserModel>
  saveUser: Action<UserModel, User>
  changeIsAuth: Action<UserModel, boolean>
  addUserToDB: Thunk<UserModel, User>
}

function formatUser(rawUser: firebase.auth.UserCredential): User {
  return {
    email: rawUser.user?.email || '',
    uid: rawUser.user?.uid || '',
    name: rawUser.user?.displayName || ''
  }
}

const userModel: UserModel = {
  isAuth: false,
  signInWithGoogle: thunk(async (actions, _) => {
    const userSignIn = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    const user = formatUser(userSignIn)
    actions.addUserToDB(user)
    actions.saveUser(user)
    actions.changeIsAuth(true)
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
    actions.saveUser({ email: '', uid: '', name: '' })
    actions.changeIsAuth(false)
  }),
  saveUser: action((state, payload) => {
    state.user = { ...payload }
  }),
  changeIsAuth: action((state, payload) => {
    state.isAuth = payload
  })
}

export default userModel
