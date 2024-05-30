import {
	Alert,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import axios from 'axios'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

interface Inputs {
	name: string
	dateTime: any
	organizer: string
	theme: string
	location: string
	description: string
	status: string
}

const NewEvent: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState<string>('')

	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			name: '',
			dateTime: dayjs(),
			organizer: '',
			theme: '',
			location: '',
			description: '',
			status: 'Upcoming',
		},
	})

	const onSubmit = async (data: Inputs) => {
		setIsLoading(true)
		setError('')
		if (
			!data.name ||
			!data.dateTime ||
			!data.organizer ||
			!data.theme ||
			!data.location ||
			!data.description
		) {
			setError('Please fill in all fields')
			setIsLoading(false)
			return
		}
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/create`, data)
			setSuccess('Event created successfully')
			setError('')
			setTimeout(() => {
				navigate('/admin')
				setSuccess('')
			}, 3000)
		} catch (error) {
			setError('An error occured while saving data')
		}
	}

	return (
		<Stack spacing={4}>
			<Stack spacing={1}>
				<Typography variant='h4'>New Event</Typography>
			</Stack>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<FormControl error={Boolean(errors.name)}>
								<InputLabel>Event Name</InputLabel>
								<OutlinedInput {...field} label='Event name' type='text' />
								{errors.name ? (
									<FormHelperText>{errors.name.message}</FormHelperText>
								) : null}
							</FormControl>
						)}
					/>
					<Controller
						name='dateTime'
						control={control}
						render={({ field }) => (
							<FormControl error={Boolean(errors.dateTime)}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DateTimePicker
										{...field}
										onChange={(newValue) => field.onChange(newValue)}
										label='Date and Time'
									/>
								</LocalizationProvider>
							</FormControl>
						)}
					/>
					<Controller
						name='organizer'
						control={control}
						render={({ field }) => (
							<FormControl error={Boolean(errors.organizer)}>
								<InputLabel>Organizer</InputLabel>
								<OutlinedInput {...field} label='Organizer' type='text' />
								{errors.organizer ? (
									<FormHelperText>{errors.organizer.message}</FormHelperText>
								) : null}
							</FormControl>
						)}
					/>
					<Controller
						name='theme'
						control={control}
						render={({ field }) => (
							<FormControl error={Boolean(errors.theme)}>
								<InputLabel>Theme</InputLabel>
								<OutlinedInput {...field} label='Theme' type='text' />
								{errors.theme ? (
									<FormHelperText>{errors.theme.message}</FormHelperText>
								) : null}
							</FormControl>
						)}
					/>
					<Controller
						name='location'
						control={control}
						render={({ field }) => (
							<FormControl error={Boolean(errors.location)}>
								<InputLabel>Location</InputLabel>
								<OutlinedInput {...field} label='Location' type='text' />
								{errors.location ? (
									<FormHelperText>{errors.location.message}</FormHelperText>
								) : null}
							</FormControl>
						)}
					/>
					<Controller
						name='description'
						control={control}
						render={({ field }) => (
							<FormControl error={Boolean(errors.description)}>
								<InputLabel>Description</InputLabel>
								<OutlinedInput
									{...field}
									label='Description'
									type='text'
									rows={3}
								/>
								{errors.description ? (
									<FormHelperText>{errors.description.message}</FormHelperText>
								) : null}
							</FormControl>
						)}
					/>
					{error && <Alert severity='error'>{error}</Alert>}
					{success && <Alert color='success'>{success}</Alert>}
					<Button disabled={isLoading} type='submit' variant='contained'>
						Create Event
					</Button>
				</Stack>
			</form>
		</Stack>
	)
}

export default NewEvent
