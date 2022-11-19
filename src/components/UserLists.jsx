import { useSelector, useDispatch } from 'react-redux'
import { changeActiveList } from '../redux/todoSlice'
import { Typography, Box, List, ListItem, ListItemButton, IconButton } from '@mui/material'
import { blue } from '@mui/material/colors'

const UserLists = () => {
  const todo = useSelector((state) => state.todo)
  const lists = todo.lists
  const activeList = todo.activeList

  const dispatch = useDispatch()
  const selectListHandler = (id) => {
    dispatch(
      changeActiveList(id)
    )
  }

  return (
        <Box sx={{
          mb: 1,
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: 7,
            backgroundColor: 'transparent'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'secondary.dark',
            borderRadius: 5
          }
        }}>
            <List>
                {lists.map((list) =>
                  list.id !== 'default'
                    ? (
                        <ListItem sx={{ pl: 1, mb: 0.5 }} key={list.id} disablePadding>
                            <ListItemButton
                                selected={list.id === activeList}
                                onClick={() => selectListHandler(list.id)}
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
                                    transform: list.id === activeList ? 'translateX(0)' : 'translateX(-100%)',
                                    borderTopLeftRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    backgroundColor: blue[700]
                                  }
                                }}>
                                <IconButton sx={{ pl: 1, pb: 0.5, pt: 0, pr: 0, color: 'text.primary' }} size='small' disableRipple>
                                    {list.icon.emoji}
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
                                    {list.listName}
                                </Typography>
                                <Typography variant="body2" color="primary" sx={{ mr: 1 }}>
                                    ({list.tasks.filter((task) => task.status === 'pending').length})
                                </Typography>

                            </ListItemButton>
                        </ListItem>
                      )
                    : null)}
            </List>
        </Box>
  )
}

export default UserLists
