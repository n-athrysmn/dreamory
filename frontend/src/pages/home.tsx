import React, { SyntheticEvent, useState } from 'react'
import EnhancedTable from '../components/table'
import EnhancedTableUpcoming from '../components/table-upcoming'
import EnhancedTableOngoing from '../components/table-ongoing'
import EnhancedTableCancelled from '../components/table-cancelled'
import {
	Box,
	IconButton,
	Stack,
	Tab,
	Tabs,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const Home = () => {
	const [value, setValue] = useState(0)
	const location = useLocation()

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	return (
		<Box sx={{ width: '100%' }}>
			<Stack>
				<Toolbar
					sx={{
						pl: { sm: 2 },
						pr: { xs: 2, sm: 2 },
					}}
				>
					<Typography
						sx={{ flex: '1 1 100%' }}
						variant='h6'
						id='tableTitle'
						component='div'
					>
						Events
					</Typography>
					{location.pathname === '/admin' ? (
						<Tooltip title='Create Event'>
							<Link to={`/create`}>
								<IconButton>
									<FaPlus />
								</IconButton>
							</Link>
						</Tooltip>
					) : null}
				</Toolbar>
			</Stack>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange}>
					<Tab label='All' {...a11yProps(0)} />
					<Tab label='Upcoming' {...a11yProps(1)} />
					<Tab label='Ongoing' {...a11yProps(2)} />
					<Tab label='Cancelled' {...a11yProps(3)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<EnhancedTable />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<EnhancedTableUpcoming />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				<EnhancedTableOngoing />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={3}>
				<EnhancedTableCancelled />
			</CustomTabPanel>
		</Box>
	)
}

export default Home
