import {
	Alert,
	Button,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

interface Inputs {
	name: string
	dateTime: Dayjs | null
	organizer: string
	theme: string
	location: string
	description: string
	status: string
}

const EditEvent: React.FC = () => {
	const [event, setEvent] = useState<Inputs>({
		name: '',
		dateTime: null,
		organizer: '',
		theme: '',
		location: '',
		description: '',
		status: '',
	})
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isDisabled, setIsDisabled] = useState<boolean>(true)
	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState<string>('')

	const location = useLocation()
	const id = location.pathname.split('/')[2]
	const navigate = useNavigate()

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/get-event/${id}`
				)
				const data = response.data
				setEvent({
					name: data.name || '',
					dateTime: data.dateTime ? dayjs(data.dateTime) : null,
					organizer: data.organizer || '',
					theme: data.theme || '',
					location: data.location || '',
					description: data.description || '',
					status: data.status || '',
				})
			} catch (error) {
				console.error(error)
			}
		}

		fetchEvent()
	}, [id])

	const handleCancelClick = () => {
		setIsEditing(false)
		setIsDisabled(true)
		setError('')
		setSuccess('')
		window.location.reload()
	}

	const handleEditClick = () => {
		setIsEditing(true)
		setIsDisabled(false)
	}

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setEvent((prev) => ({ ...prev, [name]: value }))
	}

	const handleDateTimeChange = (newDate: Dayjs | null) => {
		setEvent((prev) => ({ ...prev, dateTime: newDate }))
	}

	console.log(event)
	const handleSaveClick = async () => {
		setIsLoading(true)
		setError('')
		if (
			!event.name ||
			!event.dateTime ||
			!event.organizer ||
			!event.theme ||
			!event.location ||
			!event.description
		) {
			setError('Please fill in all fields')
			setIsLoading(false)
			return
		}
		try {
			await axios.put(
				`${process.env.REACT_APP_API_URL}/edit-event/${id}`,
				event
			)
			setSuccess('Event edited successfully')
			setTimeout(() => {
				navigate('/admin')
			}, 3000)
		} catch (error) {
			setError('An error occurred while saving data')
		}
		setIsLoading(false)
	}

	return (
		<Stack spacing={4}>
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
				}}
			>
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant='h6'
					id='tableTitle'
					component='div'
				>
					Edit Event Details
				</Typography>
				{event.status === 'Upcoming' ? (
					<Chip color={'info'} label={'Upcoming'} size='medium' />
				) : event.status === 'Ongoing' ? (
					<Chip color={'warning'} label={'On-going'} size='medium' />
				) : event.status === 'Cancelled' ? (
					<Chip color={'error'} label={'Cancelled'} size='medium' />
				) : (
					<Chip color={'success'} label={'Past Event'} size='medium' />
				)}
			</Toolbar>
			<form>
				<Stack spacing={2}>
					<FormControl>
						<InputLabel>Event Name</InputLabel>
						<OutlinedInput
							label='Event name'
							name='name'
							type='text'
							value={event.name || ''}
							disabled={isDisabled}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								label='Date and Time'
								value={event.dateTime}
								onChange={handleDateTimeChange}
								disabled={isDisabled}
							/>
						</LocalizationProvider>
					</FormControl>
					<FormControl>
						<InputLabel>Organizer</InputLabel>
						<OutlinedInput
							label='Organizer'
							name='organizer'
							type='text'
							value={event.organizer || ''}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Theme</InputLabel>
						<OutlinedInput
							label='Theme'
							name='theme'
							type='text'
							value={event.theme || 'This event has no theme'}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Location</InputLabel>
						<OutlinedInput
							label='Location'
							name='location'
							type='text'
							value={event.location || ''}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Description</InputLabel>
						<OutlinedInput
							label='Description'
							name='description'
							type='text'
							value={event.description || 'No event description'}
							onChange={handleChange}
							disabled={isDisabled}
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Status</InputLabel>
						<Select
							value={event.status}
							name='status'
							label='Status'
							disabled={isDisabled}
							onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
						>
							<MenuItem value={'Ongoing'}>Ongoing</MenuItem>
							<MenuItem value={'Upcoming'}>Upcoming</MenuItem>
							<MenuItem value={'Cancelled'}>Cancelled</MenuItem>
							<MenuItem value={'Past'}>Past Event</MenuItem>
						</Select>
					</FormControl>
					{error && <Alert severity='error'>{error}</Alert>}
					{success && <Alert color='success'>{success}</Alert>}
					{isEditing ? (
						<>
							<Button
								type='button'
								variant='contained'
								onClick={handleCancelClick}
								color='error'
							>
								Cancel
							</Button>
							<Button
								type='button'
								variant='contained'
								onClick={handleSaveClick}
								disabled={isLoading}
							>
								Save
							</Button>
						</>
					) : (
						<Button type='button' variant='contained' onClick={handleEditClick}>
							Edit Event
						</Button>
					)}
				</Stack>
			</form>
		</Stack>
	)
}

export default EditEvent
