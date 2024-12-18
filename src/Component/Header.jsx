import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet } from 'react-router-dom';



export default function Header() {

    const logout = () => {
        localStorage.removeItem('token')
        // setlogout(data)
        window.location.reload()
    }

    useEffect(() => {
        const login = localStorage.getItem('token')
        if (!login) {
            window.location = '/login'
        }
    })



    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Product Management
                        </Typography>
                        <Button sx={{ my: 1, color: 'white', display: 'block',float:'right' }} onClick={logout}>
                            Logout
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Outlet />
            </Box>
        </Box>
    )
}



