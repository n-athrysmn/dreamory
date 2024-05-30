import { Box, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import NewEvent from '../components/new-form'
import ViewEvent from '../components/view-form'
import EditEvent from '../components/edit-form'
import DeleteEvent from '../components/delete-event'

const Event = () => {
	const location = useLocation()
	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2, p: 3 }}>
				{location.pathname === '/create' && <NewEvent />}
				{location.pathname.startsWith('/edit/') && <EditEvent />}
				{location.pathname.startsWith('/view/') && <ViewEvent />}
				{location.pathname.startsWith('/delete/') && <DeleteEvent />}
			</Paper>
		</Box>
	)
}

export default Event
