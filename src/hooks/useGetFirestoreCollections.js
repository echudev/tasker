import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'
import { loadListsFromFirestore } from '../redux/todoSlice'

export const useGetFirestoreCollections = () => {
  const [loadingFirestoreDB, setLoadingFirestoreDB] = useState(null)
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.auth)

  const getFirestoreCollections = async () => {
    setLoadingFirestoreDB(true)
    const listCollectionRef = collection(FirebaseDB, `${uid}/todo/lists`)
    const listCollectionRefOrdered = query(listCollectionRef, orderBy('date', 'asc'))
    const taskCollectionRef = collection(FirebaseDB, `${uid}/todo/tasks`)

    const listQueryResult = await getDocs(listCollectionRefOrdered)
    const taskQueryResult = await getDocs(taskCollectionRef)

    const lists = []
    const tasks = []

    taskQueryResult.forEach((doc) => {
      const newTask = { ...doc.data(), id: doc.id }
      tasks.push(newTask)
    })

    listQueryResult.forEach((doc) => {
      const newList = { ...doc.data(), id: doc.id }
      newList.tasks = tasks.filter(task => task.list === newList.id)
      lists.push(newList)
    })

    dispatch(loadListsFromFirestore(lists))
    setLoadingFirestoreDB(false)
  }

  useEffect(() => {
    if (uid) {
      getFirestoreCollections()
    }
  }, [uid])

  return { loadingFirestoreDB }
}
