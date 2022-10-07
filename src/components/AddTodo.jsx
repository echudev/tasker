import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import { startNewTask } from '../redux/thunks'
import { TextField, Fab, Paper, Alert } from '@mui/material'

export const AddTodo = ({ theme }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()

    if (value.trim().length === 0) {
      setShowAlert(true)
      setValue('')
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return
    }

    dispatch(startNewTask(value))
    setValue('')
  }

  return (
		<div>
			{showAlert &&
				<Alert
					sx={{ position: 'relative', top: '0', zIndex: 2 }}
					onClose={() => setShowAlert(false)}
					variant='filled'
					severity="error">
					Ingresa una tarea!
				</Alert>
			}
			<Paper
				variant={theme === 'dark' ? 'outlined' : 'elevation'}
				sx={{ mt: 1 }}>
				<form style={addTodoContainer} onSubmit={onSubmit}>
					<Fab sx={btnstyle} size='small' aria-label="add" type='submit'>
						<AddIcon />
					</Fab>
					<TextField
						disabled={showAlert}
						autoComplete='off'
						id="add-task"
						label="Agrega una tarea"
						variant="standard"
						value={value}
						onChange={(event) => setValue(event.target.value)}
						sx={txfieldstyle} />
				</form>
			</Paper>
		</div>
  )
}
const addTodoContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px'
}

const btnstyle = {
  marginTop: '10px',
  backgroundColor: 'primary.main'
}

const txfieldstyle = {
  margin: '10px',
  width: '100%'
}
