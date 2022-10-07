import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography, Paper, Stack, List } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Title } from './Title'
import { AddTodo } from './AddTodo'
import { Task } from './Task'

const TodoList = () => {
  const theme = useSelector(state => state.theme.theme)

  const list = useSelector((state) => state.todo.lists.find(list => list.id === state.todo.activeList))

  // muestra-oculta las tareas completas
  const [listState, setListState] = useState(
    {
      showCompleted: false,
      hideDoneTasks: true,
      doneCount: 0
    }
  )
  const listStateHandler = () => {
    if (list) {
      const count = list.tasks.filter((task) => task.status === 'done').length
      // chequeo que haya al menos una tarea comletada
      count > 0
        ? setListState({ ...listState, doneCount: count, showCompleted: true })
        :				setListState({ ...listState, doneCount: count, showCompleted: false })
    }
  }
  useEffect(() => {
    listStateHandler()
  }, [list])

  return (
		<Grid
			container
			item
			direction="column"
			xs={12} sm={12} md={10}
			sx={{
			  p: 2,
			  width: '100%',
			  maxHeight: '100vh',
			  minHeight: '100vh',
			  flexGrow: 1,
			  justifyContent: 'space-between',
			  flexWrap: 'nowrap'
			}}>

			{list && (<>
				<Title theme={theme} list={list} />

				<Paper
					variant={theme === 'dark' ? 'outlined' : 'elevation'}
					sx={{
					  width: '100%',
					  minHeight: '100%',
					  flex: '1 1 auto',
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
					<List disablePadding>
						{list.tasks.map((todo, index) =>
						  todo.status === 'pending'
						    ? <Task
									index={index}
									key={todo.id}
									id={todo.id}
									taskName={todo.taskName}
									status={todo.status}
								/>
						    : null)}
					</List>

					{/* separador Tareas completadas e incompletas */}
					<Stack
						direction="row"
						spacing={1}
						onClick={() => setListState({ ...listState, hideDoneTasks: !listState.hideDoneTasks })}
						sx={{
						  m: 1,
						  cursor: 'pointer',
						  display: listState.showCompleted ? 'flex' : 'none',
						  userSelect: 'none'
						}}>
						<ArrowRightIcon
							color='primary'
							sx={{ transform: listState.hideDoneTasks ? 'rotate(0deg)' : 'rotate(90deg)' }}
						/>
						<Typography
							sx={{
							  mt: 1,
							  mb: 1,
							  ml: 3,
							  '&:hover': { color: 'primary.dark' }
							}}
							variant="button"
							component="div"
							color="primary">
							Completadas ({listState.doneCount})
						</Typography>
					</Stack>

					<List disablePadding >
						{list.tasks.map((todo) =>
						  todo.status === 'done'
						    ? <Task
									key={todo.id}
									id={todo.id}
									taskName={todo.taskName}
									status={todo.status}
									hide={listState.hideDoneTasks}
								/>
						    : null)}
					</List>
				</Paper>

				<AddTodo theme={theme} />
			</>)}
		</Grid >

  )
}

export default TodoList
