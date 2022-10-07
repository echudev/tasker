import { Typography, Menu, IconButton, Box, Divider } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startEditList } from '../redux/thunks'

export const EmojiPicker = ({ icon, name }) => {
  const emojiList = [
    { emoji: '🎮', name: 'gamepad' }, { emoji: '👾', name: 'invader' },
    { emoji: '🤖', name: 'robot' }, { emoji: '🦖', name: 'dino' },
    { emoji: '😊', name: 'grind' }, { emoji: '🤔', name: 'thinking' },
    { emoji: '🤓', name: 'nerd' }, { emoji: '🤩', name: 'haha' },
    { emoji: '🤯', name: 'mindblown' }, { emoji: '🤠', name: 'cowboy' },
    { emoji: '🛠️', name: 'tools' }, { emoji: '💻', name: 'laptop' },
    { emoji: '💡', name: 'bulb' }, { emoji: '💾', name: 'hdd' },
    { emoji: '🎁', name: 'gift' }, { emoji: '📷', name: 'camera' },
    { emoji: '💖', name: 'heart' }, { emoji: '💘', name: 'arrow_heart' },
    { emoji: '🍟', name: 'fries' }, { emoji: '🍕', name: 'pizza' },
    { emoji: '📚', name: 'books' }, { emoji: '🥂', name: 'glasses' },
    { emoji: '✈️', name: 'airplane' }, { emoji: '🚗', name: 'car' },
    { emoji: '🚀', name: 'rocket' }, { emoji: '⚓', name: 'anchor' },
    { emoji: '🏠', name: 'home' }, { emoji: '🐶', name: 'dog' },
    { emoji: '🏋️', name: 'gym' }, { emoji: '🏌️', name: 'golf' },
    { emoji: '💪', name: 'muscle' }, { emoji: '🤙', name: 'cool' },
    { emoji: '💫', name: 'shootingStar' }, { emoji: '⭐', name: 'star' },
    { emoji: '🌟', name: 'star2' }, { emoji: '🌈', name: 'rainbow' },
    { emoji: '✅', name: 'check' }, { emoji: '❌', name: 'x' },
    { emoji: '📋', name: 'list' }, { emoji: '💦', name: 'splash' },
    { emoji: '👽', name: 'alien' }, { emoji: '👻', name: 'ghost' }
  ]

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()

  const handleSelect = (e) => {
    setAnchorEl(null)
    const key = 'icon'
    const value = { emoji: e.target.innerText, name: e.target.id }
    dispatch(startEditList(key, value))
  }

  return (
        <div>
            <IconButton
                sx={{ p: 0, color: 'text.primary' }}
                id="emoji-picker-button"
                aria-controls={open ? 'emoji-picker' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                size='medium'
                onClick={handleClick}
            >
                <span
                    style={{ marginBottom: '5px' }}
                    role="img" aria-label={name}>
                    {icon}
                </span>
            </IconButton>

            <Menu
                id="emoji-picker"
                aria-labelledby="emoji-picker"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
            >
                <Typography align='center' variant="body1">Elige un emoji</Typography>
                <Divider />
                <Box sx={{ maxWidth: '220px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 35px)' }}>
                    {emojiList.map(({ emoji, name }) => (
                        <IconButton
                            sx={{ color: 'text.primary' }}
                            size='small'
                            key={name}
                            onClick={(e) => handleSelect(e)}>
                            <span role="img" aria-label={name} id={name}>
                                {emoji}
                            </span>
                        </IconButton>
                    ))}
                </Box>
            </Menu>
        </div>
  )
}
