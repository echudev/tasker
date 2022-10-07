export const sampleDatabase = [
  {
    id: 'default', // lista por defecto, no puede eliminarse
    icon: { emoji: '🙂', name: 'smile' },
    listName: 'Bienvenido!',
    tasks: [
      {
        id: '0',
        taskName: 'Agrega tareas presionando el boton + al final de la pantalla',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      },
      {
        id: '33',
        taskName: 'Marca la tarea como completada presionando el circulo a la izquierda, o eliminala presionando el ícono de la derecha',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      },
      {
        id: '1',
        taskName: 'Crea todas las listas que quieras para organizar mejor tus tareas!',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      },
      {
        id: '2',
        taskName: 'Podes editar el nombre de la lista o eliminarlas abriendo el menú de opciones de la lista seleccionada',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      },
      {
        id: '3',
        taskName: 'Para elegir otro ícono solo tenés que presionar sobre ícono de la lista seleccionada',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      }
    ]
  },
  {
    id: '1',
    icon: { emoji: '📝', name: 'paper' },
    listName: 'Registro',
    tasks: [
      {
        id: '0',
        taskName: 'Registrate con tu correo y contraseña para que tus listas y tareas se guarden en la nube, y puedas acceder desde cualquier dispositivo',
        status: 'pending',
        list: '1',
        date: new Date().getTime()
      },
      {
        id: '1',
        taskName: 'También podes ingresar usando tu cuenta de Google! es más rápido y seguro',
        status: 'pending',
        list: '1',
        date: new Date().getTime()
      }
    ]
  },
  {
    id: '2',
    icon: { emoji: '📧', name: 'mail' },
    listName: 'Contacto',
    tasks: [
      {
        id: '0',
        taskName: 'Podés ver mis otros proyectos en GitHub 👽 https://github.com/echudev',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      }
    ]
  },
  {
    id: '3',
    icon: { emoji: '🚀', name: 'rocket' },
    listName: 'Next features',
    tasks: [
      {
        id: '0',
        taskName: 'Calendario para ver las tareas por fecha y agregar recordatorios 📆',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      },
      {
        id: '1',
        taskName: 'Drag and drop para reordenar listas y tareas',
        status: 'pending',
        list: 'default',
        date: new Date().getTime()
      }
    ]
  }
]
