import {
	Chip,
	FormControl,
	InputLabel,
	OutlinedInput,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'

const ViewEvent: React.FC = () => {
	const [event, setEvent] = useState<any>({})
	const [date, setDate] = useState<string>('')
	const [time, setTime] = useState<string>('')
	const location = useLocation()

	const id = location.pathname.split('/')[2]

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/get-event/${id}`
				)
				const data = response.data
				setEvent(data)
				if (data.dateTime) {
					const dateTime = dayjs(data.dateTime)
					setDate(dateTime.format('DD-MM-YYYY'))
					setTime(dateTime.format('HH:mm'))
				}
			} catch (error) {
				console.error(error)
			}
		}

		fetchEvent()
	}, [id])

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
					Event Details
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
							type='text'
							value={event.name || ''}
							disabled
							readOnly
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Date</InputLabel>
						<OutlinedInput
							label='Date'
							type='text'
							value={date}
							disabled
							readOnly
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Time</InputLabel>
						<OutlinedInput
							label='Time'
							type='text'
							value={time}
							disabled
							readOnly
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Organizer</InputLabel>
						<OutlinedInput
							label='Organizer'
							type='text'
							value={event.organizer || ''}
							disabled
							readOnly
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Theme</InputLabel>
						<OutlinedInput
							label='Theme'
							type='text'
							value={event.theme || 'This event has no theme'}
							disabled
							readOnly
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Location</InputLabel>
						<OutlinedInput
							label='Location'
							type='text'
							value={event.location || ''}
							disabled
							readOnly
						/>
					</FormControl>
					<FormControl>
						<InputLabel>Description</InputLabel>
						<OutlinedInput
							label='Description'
							type='text'
							value={event.description || 'No event discription'}
							disabled
							readOnly
						/>
					</FormControl>
				</Stack>
			</form>
		</Stack>
	)
}

export default ViewEvent
