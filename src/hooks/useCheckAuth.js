import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { login, logout, checkAuth } from '../redux/auth/authSlice'
import { startNewUserDB } from '../redux/thunks'

export const useCheckAuth = () => {
  const { status, uid } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  // check if user is logged in Firebase
  // dispatch login action and load tasks from firestore
  useEffect(() => {
    dispatch(checkAuth())
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())
      const { uid, email, displayName, photoURL } = user
      dispatch(login({ uid, email, displayName, photoURL }))

      const { creationTime, lastSignInTime } = user.metadata
      if (creationTime === lastSignInTime) {
        dispatch(startNewUserDB())
      }
    })
  }, [])

  return { status, uid }
}
