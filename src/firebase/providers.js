import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

export const registerUserWithEmail = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = resp.user
    // TODO: actualizar el displayName en firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName })

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const loginWithEmail = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL, displayName } = resp.user
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    } // retorno un objeto con los datos del usuario
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    } // retorno un objeto con el error
  }
}

export const logoutFirebase = async () => {
  try {
    signOut(FirebaseAuth)
  } catch (error) {
    return console.log(error)
  }
}
