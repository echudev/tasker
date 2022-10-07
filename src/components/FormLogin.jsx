import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography, FormControl, InputLabel, OutlinedInput, Box, Divider, Alert } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { startGoogleSignIn, startLoginWithEmail } from '../redux/auth/thunks'
import { useForm } from '../hooks/useForm'

export const FormLogin = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const dispatch = useDispatch()
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true) // set form submitted to true to show error messages
    dispatch(startLoginWithEmail({ email, password }))
  }

  const onGoogleSignIn = (event) => {
    event.preventDefault()
    dispatch(startGoogleSignIn())
  }

  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  return (
    <div className='animate__animated animate__fadeIn' >
      <form onSubmit={onSubmit}>

        <Typography variant='body1' align='center' sx={{ m: 1, flexGrow: 1 }}>
          Ingresa con tu correo
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <FormControl>
            <InputLabel htmlFor="outlined-email">Correo</InputLabel>
            <OutlinedInput
              sx={{ mb: 1 }}
              autoComplete='off'
              label="Correo"
              id="outlined-email"
              type='email'
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="outlined-password">Contraseña</InputLabel>
            <OutlinedInput
              sx={{ mb: 3 }}
              autoComplete='off'
              label="Contraseña"
              id="outlined-password"
              type='password'
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </FormControl>
        </Box>

        <Alert
          sx={{ display: !!errorMessage && formSubmitted ? 'flex' : 'none', mb: 1 }}
          variant='outlined'
          severity="error">
          {errorMessage}
        </Alert>

        <Button
          disabled={isCheckingAuthentication}
          fullWidth
          variant="contained"
          type='submit'
        >
          inciar sesion
        </Button>
      </form>

      <Divider sx={{ mb: 2, mt: 2 }} textAlign='center'>o bien</Divider>

      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        fullWidth
        color="error"
        onClick={onGoogleSignIn}
      >
        Continuar con Google
      </Button>
    </div>
  )
}
