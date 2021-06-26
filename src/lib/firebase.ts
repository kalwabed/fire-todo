import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'

import firebase from 'firebase/app'

if (!firebase.app.length) {
  firebase.initializeApp(
    {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    },
    'my-todo'
  )
}

export default firebase
