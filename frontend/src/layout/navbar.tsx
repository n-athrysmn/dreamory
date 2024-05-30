import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { FaAlignJustify, FaSignOutAlt } from 'react-icons/fa'
import MobileNav from './mobile-nav'
import { Link } from 'react-router-dom'

const Navbar = () => {
	const [openNav, setOpenNav] = useState<boolean>(false)

	return (
		<>
			<Box
				component='header'
				sx={{
					borderBottom: '1px solid var(--mui-palette-divider)',
					backgroundColor: 'var(--mui-palette-background-paper)',
					position: 'sticky',
					top: 0,
					zIndex: 'var(--mui-zIndex-appBar)',
				}}
			>
				<Stack
					direction='row'
					spacing={2}
					sx={{
						alignItems: 'center',
						justifyContent: 'space-between',
						minHeight: '64px',
						px: 2,
					}}
				>
					<Stack sx={{ alignItems: 'center' }} direction='row' spacing={2}>
						<IconButton
							onClick={(): void => {
								setOpenNav(true)
							}}
							sx={{ display: { lg: 'none' } }}
						>
							<FaAlignJustify />
						</IconButton>
					</Stack>
					<Stack sx={{ alignItems: 'center' }} direction='row' spacing={2}>
						<Tooltip title='Logout'>
							<Link to={`/`}>
								<IconButton>
									<FaSignOutAlt />
								</IconButton>
							</Link>
						</Tooltip>
					</Stack>
				</Stack>
			</Box>
			<MobileNav
				onClose={() => {
					setOpenNav(false)
				}}
				open={openNav}
			/>
		</>
	)
}

export default Navbar
