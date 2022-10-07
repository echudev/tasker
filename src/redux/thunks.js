import { collection, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'
import { addTask, deleteTask, editTask, addList, deleteList, updateList } from './todoSlice'

// mantengo la misma dinámica en la mayoría de los thunks,
// primero edito la bse de datos (asíncrona), luego llamo al dispatch para editar el estado local
// si no hay un usuario logueado, se ejecuta solo la acción local con base de datos de prueba (utils/sampleDatabase.js)

export const startNewTask = (value) => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth
    const { activeList } = getState().todo

    const newTask = {
      taskName: value,
      status: 'pending',
      list: activeList,
      date: new Date().getTime()
    }

    if (status === 'authenticated') {
      // cargo la tarea en firestore
      const newDoc = doc(collection(FirebaseDB, `${uid}/todo/tasks/`))
      await setDoc(newDoc, newTask)
      // le asigno el id de firestore a la tarea
      newTask.id = newDoc.id
      // cargo la tarea en el store local
      dispatch(addTask(newTask))
    } else {
      // cargo la tarea en el store local
      newTask.id = new Date().getTime()
      dispatch(addTask(newTask))
    }
  }
}

export const startNewList = (value) => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth

    const newList = {
      icon: { emoji: '📋', name: 'list' },
      listName: value,
      date: new Date().getTime(),
      tasks: []
    }

    if (status === 'authenticated') {
      const newDoc = doc(collection(FirebaseDB, `${uid}/todo/lists`))
      await setDoc(newDoc, newList)
      newList.id = newDoc.id
      dispatch(addList(newList))
    } else {
      newList.id = new Date().getTime()
      dispatch(addList(newList))
    }
  }
}
export const startDeleteTask = (docId) => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth

    if (status === 'authenticated') {
      const docRef = doc(FirebaseDB, `${uid}/todo/tasks`, docId)
      await deleteDoc(docRef)
      dispatch(deleteTask({ id: docId }))
    } else {
      dispatch(deleteTask({ id: docId }))
    }
  }
}
export const startDeleteList = (docId) => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth

    if (status === 'authenticated') {
      const docRef = doc(FirebaseDB, `${uid}/todo/lists`, docId)
      await deleteDoc(docRef)
      dispatch(deleteList({ id: docId }))
    } else {
      dispatch(deleteList({ id: docId }))
    }
  }
}

export const startEditTask = ({ id, key, value }) => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth

    if (status === 'authenticated') {
      const docRef = doc(FirebaseDB, `${uid}/todo/tasks`, id)
      // actualizo la tarea en firestore
      await updateDoc(docRef, { [key]: value })
      // actualizo la tarea en el store local (redux)
      dispatch(editTask({ id, key, value }))
    } else {
      dispatch(editTask({ id, key, value }))
    }
  }
}

export const startEditList = (key, value) => {
  return async (dispatch, getState) => {
    const { uid, status } = getState().auth
    const { activeList } = getState().todo

    if (status === 'authenticated') {
      const docRef = doc(FirebaseDB, `${uid}/todo/lists`, activeList)
      // actualizo la tarea en firestore
      await updateDoc(docRef, { [key]: value })
      // actualizo la tarea en el store local (redux)
      dispatch(updateList({ key, value }))
    } else {
      dispatch(updateList({ key, value }))
    }
  }
}

export const startNewUserDB = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const defaultList = {
      icon: { emoji: '🏠', name: 'home' },
      listName: 'Mis Tareas',
      date: new Date().getTime(),
      tasks: []
    }

    const newDoc = doc(FirebaseDB, `${uid}/todo/lists`, 'default')
    await setDoc(newDoc, defaultList)
    defaultList.id = newDoc.id
    dispatch(addList(defaultList))
  }
}
