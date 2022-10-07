import * as React from 'react'
import { Dialog, Button, IconButton, Box, Tab, Stack } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { FormLogin } from './FormLogin'
import { FormRegister } from './FormRegister'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const LoginDialog = () => {
  // modal config
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // tabs config
  const [value, setValue] = React.useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
        <Stack
            ml={2}
            spacing={1}
            direction="row"
        >
            <IconButton
                size="small"
                color="inherit">
                <AccountCircleIcon />
            </IconButton>

            <Button
                sx={{
                  ml: 2,
                  fontWeight: 'bold',
                  color: 'white',
                  borderColor: '#fff9',
                  borderRadius: '10px',
                  '&:hover': {
                    borderColor: '#fff2',
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
                  }
                }}
                size="small"
                variant="outlined"
                onClick={handleClickOpen}>
                Ingresa
            </Button>

            <Dialog open={open} onClose={handleClose} >
                <Box>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                variant="fullWidth"
                                aria-label="login/register tabs">
                                <Tab label="Ingresa" value="1" />
                                <Tab label="Registrate" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><FormLogin /></TabPanel>
                        <TabPanel value="2"><FormRegister /></TabPanel>
                    </TabContext>
                </Box>
            </Dialog>
        </Stack>
  )
}
