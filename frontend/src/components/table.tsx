import {
	Box,
	Chip,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import { FaAlignCenter, FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import React, {
	ChangeEvent,
	MouseEvent,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { visuallyHidden } from '@mui/utils'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

interface Data {
	index: number
	id: string
	name: string
	date: string
	time: string
	location: string
	status: string
}

function createData(
	index: number,
	id: string,
	name: string,
	date: string,
	time: string,
	location: string,
	status: string
): Data {
	return {
		index,
		id,
		name,
		date,
		time,
		location,
		status,
	}
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
	disablePadding: boolean
	id: keyof Data
	label: string
	numeric: boolean
}

const headCells: readonly HeadCell[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Name',
	},
	{
		id: 'date',
		numeric: false,
		disablePadding: false,
		label: 'Date',
	},
	{
		id: 'time',
		numeric: false,
		disablePadding: false,
		label: 'Time',
	},
	{
		id: 'location',
		numeric: false,
		disablePadding: false,
		label: 'Location',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'Status',
	},
]

interface EnhancedTableProps {
	onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void
	order: Order
	orderBy: string
	rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, rowCount, onRequestSort } = props
	const createSortHandler =
		(property: keyof Data) => (event: MouseEvent<unknown>) => {
			onRequestSort(event, property)
		}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell>Action</TableCell>
			</TableRow>
		</TableHead>
	)
}

function EnhancedTableToolbar() {
	return (
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
				Events
			</Typography>
		</Toolbar>
	)
}
export default function EnhancedTable() {
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof Data>('name')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [rows, setRows] = useState<Data[]>([])

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/get-all`
				)
				const data = response.data

				const mappedData = data.map((event: any, index: number) => {
					const date = new Date(event.dateTime)
					const formattedDate = date.toLocaleDateString('en-GB', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
					})
					const formattedTime = date.toLocaleTimeString()

					return createData(
						index + 1,
						event._id,
						event.name,
						formattedDate,
						formattedTime,
						event.location,
						event.status
					)
				})
				setRows(mappedData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchEvents()
	}, [])

	const handleRequestSort = (
		event: MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage, rows]
	)

	const location = useLocation()

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const labelId = `enhanced-table-checkbox-${index}`

								return (
									<TableRow
										hover
										tabIndex={-1}
										key={row.index}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell
											component='th'
											id={labelId}
											scope='row'
											padding='none'
										>
											{row.name}
										</TableCell>
										<TableCell>{row.date}</TableCell>
										<TableCell>{row.time}</TableCell>
										<TableCell>{row.location}</TableCell>
										{row.status === 'Upcoming' ? (
											<TableCell>
												<Chip color={'info'} label={'Upcoming'} size='small' />
											</TableCell>
										) : row.status === 'Ongoing' ? (
											<TableCell>
												<Chip
													color={'warning'}
													label={'On-going'}
													size='small'
												/>
											</TableCell>
										) : row.status === 'Cancelled' ? (
											<TableCell>
												<Chip
													color={'error'}
													label={'Cancelled'}
													size='small'
												/>
											</TableCell>
										) : (
											<TableCell>
												<Chip
													color={'success'}
													label={'Past Event'}
													size='small'
												/>
											</TableCell>
										)}
										{location.pathname === '/user' ? (
											<TableCell>
												<Tooltip title='View'>
													<Link to={`/view/${row.id}`}>
														<IconButton>
															<FaEye />
														</IconButton>
													</Link>
												</Tooltip>
											</TableCell>
										) : (
											<>
												<TableCell>
													<Tooltip title='Edit'>
														<Link to={`/edit/${row.id}`}>
															<IconButton>
																<FaEdit />
															</IconButton>
														</Link>
													</Tooltip>
													<Tooltip title='Delete'>
														<Link to={`/delete/${row.id}`}>
															<IconButton>
																<FaTrash />
															</IconButton>
														</Link>
													</Tooltip>
												</TableCell>
											</>
										)}
									</TableRow>
								)
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	)
}
