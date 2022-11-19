import { useSelector, useDispatch } from 'react-redux'
import { changeActiveList } from '../redux/todoSlice'
import { Typography, IconButton, List, ListItem, ListItemButton } from '@mui/material'
import { blue } from '@mui/material/colors'

const DefaultList = () => {
  const todo = useSelector((state) => state.todo)
  const activeList = todo.activeList
  const defaultList = todo.lists.find((list) => list.id === 'default')

  const dispatch = useDispatch()
  const selectListHandler = (id) => {
    dispatch(
      changeActiveList(id)
    )
  }

  return (
        <List sx={{ p: 0 }}>
            <ListItem sx={{ p: 1, mb: 0 }} disablePadding>

                {defaultList && (
                    <ListItemButton
                        selected={defaultList.id === activeList}
                        onClick={() => selectListHandler(defaultList.id)}
                        sx={{
                          p: 1,
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 1,
                          overflow: 'hidden',
                          '&::before': {
                            position: 'absolute',
                            left: 0,
                            zIndex: 1,
                            content: '""',
                            display: 'block',
                            width: 7,
                            transition: 'all 0.2s ease-in-out',
                            height: '100%',
                            transform: activeList === 'default' ? 'translateX(0)' : 'translateX(-100%)',
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            backgroundColor: blue[700]
                          }
                        }}>
                        <IconButton sx={{ pl: 1, pb: 0.5, pt: 0, pr: 0, color: 'text.primary' }} size='small' disableRipple>
                            {defaultList.icon.emoji}
                        </IconButton>
                        <Typography
                            variant="body1"
                            sx={{
                              ml: 1,
                              width: '100%',
                              textAlign: 'start',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden'
                            }}>
                            {defaultList.listName}
                        </Typography>

                        <Typography variant="body2" color="primary" sx={{ mr: 1 }}>
                            ({defaultList.tasks.filter((task) => task.status === 'pending').length})
                        </Typography>

                    </ListItemButton>
                )}

            </ListItem>
        </List>
  )
}

export default DefaultList
