import { createSlice } from '@reduxjs/toolkit'
import { sampleDatabase } from '../utils/sampleDatabase'

export const todoSlice = createSlice({
  name: 'todo',
  initialState:
  {
    activeList: 'default',
    lists: sampleDatabase
  },

  reducers: {
    addTask: (state, action) => {
      state.lists.find(list => list.id === state.activeList)
        .tasks.push(action.payload) // add new task to active list
    },

    deleteTask: (state, action) => {
      const newTasks = state.lists.find(list => list.id === state.activeList)
        .tasks.filter(task => task.id !== action.payload.id) // filter out the task to delete

      state.lists.find(list => list.id === state.activeList).tasks = newTasks // update the tasks
    },

    editTask: (state, action) => {
      state.lists.find(list => list.id === state.activeList) // find the active list
        .tasks.forEach(task => {
          if (task.id === action.payload.id) {
            task[action.payload.key] = action.payload.value
          }
        })
    },

    updateList: (state, action) => {
      state.lists.find(list => list.id === state.activeList)[action.payload.key] = action.payload.value
    },

    addList: (state, action) => {
      state.lists.push(action.payload)
    },

    changeActiveList: (state, action) => {
      state.activeList = action.payload
    },

    deleteList: (state, action) => {
      const newLists = state.lists.filter(
        list => list.id !== action.payload.id)

      state.lists = newLists
    },

    loadListsFromFirestore: (state, action) => {
      state.lists = action.payload
    },

    cleanTodoState: (state) => {
      state.activeList = '0'
      state.lists = sampleDatabase
    }
  }
})

// action creators are generated for each reducer
export const {
  addTask, deleteTask, editTask,
  addList, deleteList, updateList,
  changeActiveList, loadListsFromFirestore, cleanTodoState
} = todoSlice.actions

export default todoSlice.reducer
