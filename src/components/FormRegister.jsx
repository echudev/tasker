import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import { startRegisterUserWithEmail } from '../redux/auth/thunks'
import { useForm } from '../hooks/useForm'

const formData = {
  displayName: '',
  email: '',
  password: ''
}

// eslint-disable-next-line no-useless-escape
const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const formValidations = {
  email: [(value) => value.match(mailRegex), 'El correo no es válido'],
  password: [(value) => value.length > 5, 'La contraseña deben tener al menos 6 caracteres'],
  displayName: [(value) => value.length > 0, 'El nombre de usuario no puede estar vacío']
}

export const FormRegister = () => {
  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    displayName, email, password, onInputChange, onResetForm, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true) // set form submitted to true to show error messages
    if (!isFormValid) return // if form is not valid, do not submit
    dispatch(startRegisterUserWithEmail(formState)) // dispatch action to register user
  }

  return (
    <form
    className='animate__animated animate__fadeIn'
    onSubmit={onSubmit}>

      <Typography variant='body1' align='center' sx={{ mb: 4, flexGrow: 1 }}>
        Registrate con tu correo
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <TextField
          sx={{ mb: 1 }}
          autoComplete='off'
          label="Nombre Completo"
          type='text'
          name='displayName'
          value={displayName}
          onChange={onInputChange}
          error={!!displayNameValid && formSubmitted}
          helperText={formSubmitted ? displayNameValid : null}
        />
        <TextField
          sx={{ mb: 1 }}
          autoComplete='off'
          label="Correo"
          type='email'
          name='email'
          value={email}
          onChange={onInputChange}
          error={!!emailValid && formSubmitted}
          helperText={formSubmitted ? emailValid : null}
        />
        <TextField
          sx={{ mb: 1 }}
          autoComplete='off'
          label="Contraseña"
          type='password'
          name='password'
          value={password}
          onChange={onInputChange}
          error={!!passwordValid && formSubmitted}
          helperText={passwordValid}
        />

        <Alert
					sx={{ display: !!errorMessage && formSubmitted ? 'flex' : 'none' }}
					variant='outlined'
					severity="error">
					{errorMessage}
				</Alert>
      </Box>

      <Button
        sx={{ mb: 1 }}
        fullWidth
        variant="text"
        onClick={onResetForm}
      >
        Borrar
      </Button>

      <Button
        fullWidth
        disabled= {isCheckingAuthentication}
        variant="contained"
        type='submit'
      >
        Registrarme
      </Button>
    </form>
  )
}
