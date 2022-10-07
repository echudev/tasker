import * as React from 'react'
import CustomAppBar from './CustomAppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import UserLists from './UserLists'
import DefaultList from './DefaultList'
import AddList from './AddList'

const drawerWidth = 280

export default function PermanentDrawer () {
  return (
        <Box sx={{ display: { sm: 'flex', xs: 'none' } }}>
            <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'
                  }
                }}
                variant="permanent"
                anchor="left">
                <CustomAppBar />
                <Divider />
                <DefaultList />
                <Divider />
                <UserLists />
                <AddList />
            </Drawer>
        </Box>
  )
}
