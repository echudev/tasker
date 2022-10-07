import { checkAuth, logout, login } from './authSlice'
import { signInWithGoogle, logoutFirebase, registerUserWithEmail, loginWithEmail } from '../../firebase/providers'

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkAuth())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    // inicio la autenticacion poniendo estado en 'checking'
    dispatch(checkAuth())
    // pido autenticacion con google
    const result = await signInWithGoogle()
    // si el resultado no es ok, ejetuar el logout
    if (!result.ok) return dispatch(logout(result.errorMessage))
    // si el resultado es ok, ejetuar el login
    dispatch(login(result))
  }
}

export const startLogOut = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(logout())
  }
}

export const startRegisterUserWithEmail = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkAuth())

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({ email, password, displayName })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export const startLoginWithEmail = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkAuth())

    const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmail({ email, password })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }))
  }
}
