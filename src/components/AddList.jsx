import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Box, Alert, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { startNewList } from '../redux/thunks'

const AddTodo = () => {
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert3, setShowAlert3] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const onSubmitList = (event) => {
    event.preventDefault()

    if (value.trim().length === 0) {
      setShowAlert2(true)
      setValue('')
      setTimeout(() => {
        setShowAlert2(false)
      }, 3000)
      return
    }
    if (value.trim().length > 35) {
      setShowAlert3(true)
      setValue('')
      setTimeout(() => {
        setShowAlert3(false)
      }, 3000)
      return
    }

    dispatch(startNewList(value))

    setValue('')
  }

  const onKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      onSubmitList(event)
    }
  }

  return (
		<Box sx={{ mt: 'auto', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }} >
			{showAlert2 &&
				<Alert
					sx={{ position: 'relative', top: '0', zIndex: 2, width: '100%' }}
					onClose={() => setShowAlert2(false)}
					variant='filled'
					severity="error">
					El nombre no puede estar vacío!
				</Alert>
			}
			{showAlert3 &&
				<Alert
					sx={{ position: 'relative', top: '0', zIndex: 2, width: '100%' }}
					onClose={() => setShowAlert3(false)}
					variant='filled'
					severity="error">
					Nombre demasiado largo!
				</Alert>
			}

			<Stack spacing={1} direction='row' width='100%' >
				<AddIcon onClick={onSubmitList} color='primary' sx={{ ml: 1, mt: 'auto', cursor: 'pointer' }} />
				<TextField
					disabled={showAlert2 || showAlert3}
					autoComplete='off'
					id="add-list"
					label="Nueva lista"
					variant="standard"
					value={value}
					onChange={(event) => setValue(event.target.value)}
					onKeyDown={(event) => { onKeyDownHandler(event) }}
					sx={{ width: '100%', ml: 1, pr: 1 }}
				/>
			</Stack>
		</Box>
  )
}

export default AddTodo
