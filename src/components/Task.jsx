import DeleteIcon from '@mui/icons-material/Delete'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startEditTask, startDeleteTask } from '../redux/thunks'

export const Task = ({ taskName, status, id, hide }) => {
  const dispatch = useDispatch()

  const removeTaskHandler = () => {
    dispatch(startDeleteTask(id))
  }
  const taskEditHandler = (key, value) => {
    dispatch(startEditTask(
      {
        id,
        key,
        value
      }
    ))
  }

  return (
        <ListItemButton
            className='animate__animated animate__fadeIn animate__faster'
            sx={{
              display: hide ? 'none' : 'flex',
              opacity: status === 'done' ? '0.5' : '1',
              textDecoration: status === 'done' ? 'line-through' : 'none',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '5px',
              margin: '5px'
            }}
            disableGutters
            disableRipple>
            <ListItem
                sx={{ pt: 0, pb: 0 }}>
                <ListItemIcon>
                    {status === 'pending'
                      ? <RadioButtonUncheckedIcon
                            onClick={() => taskEditHandler('status', 'done')}
                            sx={{
                              transition: '.2s',
                              '&:hover': {
                                color: 'success.main'
                              }
                            }} />
                      : <TaskAltIcon
                            name='status'
                            value='pending'
                            onClick={() => taskEditHandler('status', 'pending')}
                            sx={{
                              transition: '.2s',
                              color: 'success.light',
                              '&:hover': { color: 'secondary.main' }
                            }} />}
                </ListItemIcon>
                <ListItemText
                    primary={taskName}
                    secondary={null}
                />
                <ListItemIcon >
                    <DeleteIcon
                        onClick={() => removeTaskHandler()}
                        sx={{
                          ml: 'auto',
                          transition: '.2s',
                          '&:hover': {
                            color: 'error.main'
                          }
                        }} />
                </ListItemIcon>
            </ListItem>
        </ListItemButton>
  )
}
