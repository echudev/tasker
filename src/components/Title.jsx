import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Paper, Stack, IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { TemporaryDrawer } from './TemporaryDrawer'
import { ListMenuButton } from './ListMenuButton'
import { EmojiPicker } from './EmojiPicker'
import { startEditList } from '../redux/thunks'

export const Title = ({ theme, list }) => {
  const dispatch = useDispatch()
  const [newListName, setNewListName] = useState('')
  const [editMode, setEditMode] = useState(false)

  const handleRenameList = () => {
    if (editMode) {
      const key = 'listName'
      const value = newListName
      dispatch(startEditList(key, value))
      setNewListName('')
      setEditMode(false)
    }
  }

  return (
        <Paper variant={theme === 'dark' ? 'outlined' : 'elevation'} sx={{ mb: 1 }}>
            <Stack
                sx={{ width: '100%' }}
                direction="row"
                alignItems="center"
                spacing={1}>
                <TemporaryDrawer />
                {editMode ? null : <EmojiPicker icon={list.icon.emoji} name={list.icon.name} />}
                {editMode
                  ? <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ width: '100%' }}
                        spacing={1}>
                        <input
                            type="text"
                            placeholder={list.listName}
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <IconButton sx={{ p: 0 }} onClick={() => setEditMode(false)}>
                            <ClearIcon color='error' />
                        </IconButton>
                        <IconButton sx={{ p: 0 }} onClick={handleRenameList}>
                            <CheckIcon color='success' />
                        </IconButton>
                    </Stack>
                  : <Typography
                        sx={{
                          width: '100%',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden'
                        }}
                        variant="h6"
                        component="div"
                        color="primary">
                        {list.listName}
                    </Typography>}
                <ListMenuButton id={list.id} setEditMode={setEditMode} />
            </Stack>
        </Paper>
  )
}
