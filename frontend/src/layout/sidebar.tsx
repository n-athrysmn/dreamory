import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Menu from './menu'

interface MenuItemProps {
	menuItem: { title: string; path: string; icon: JSX.Element }
	isActive: boolean
}

const MenuItem = ({ menuItem, isActive }: MenuItemProps) => (
	<Link to={menuItem.path} style={{ textDecoration: 'none', color: 'inherit' }}>
		<Box
			component='div'
			sx={{
				alignItems: 'center',
				borderRadius: 1,
				color: isActive
					? 'var(--NavItem-active-color)'
					: 'var(--NavItem-color)',
				cursor: 'pointer',
				display: 'flex',
				gap: 1,
				p: '6px 16px',
				position: 'relative',
				textDecoration: 'none',
				whiteSpace: 'nowrap',
				...(isActive && {
					bgcolor: 'var(--NavItem-active-background)',
				}),
			}}
		>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					flex: '0 0 auto',
				}}
			>
				{menuItem.icon}
			</Box>
			<Box sx={{ flex: '1 1 auto' }}>
				<Typography
					component='span'
					sx={{
						color: 'inherit',
						fontSize: '0.875rem',
						fontWeight: 500,
						lineHeight: '28px',
					}}
				>
					{menuItem.title}
				</Typography>
			</Box>
		</Box>
	</Link>
)

const Sidebar = () => {
	const location = useLocation()

	const mapMenuItems = () => {
		if (
			location.pathname === '/user' ||
			location.pathname.startsWith('/view')
		) {
			return Menu.filter((menuItem) => menuItem.path === '/user').map(
				(menuItem) => {
					const isActive = location.pathname === menuItem.path
					return (
						<MenuItem
							key={menuItem.path}
							menuItem={menuItem}
							isActive={isActive}
						/>
					)
				}
			)
		} else {
			return Menu.filter(
				(menuItem) =>
					menuItem.path !== '/user' && !menuItem.path.startsWith('/view')
			).map((menuItem) => {
				const isActive = location.pathname === menuItem.path
				return (
					<MenuItem
						key={menuItem.path}
						menuItem={menuItem}
						isActive={isActive}
					/>
				)
			})
		}
	}

	return (
		<Box
			sx={{
				'--SideNav-background': 'var(--mui-palette-neutral-950)',
				'--SideNav-color': 'var(--mui-palette-common-white)',
				'--NavItem-color': 'var(--mui-palette-neutral-300)',
				'--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
				'--NavItem-active-background': 'var(--mui-palette-primary-main)',
				'--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
				'--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
				'--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
				'--NavItem-icon-active-color':
					'var(--mui-palette-primary-contrastText)',
				'--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
				bgcolor: 'var(--SideNav-background)',
				color: 'var(--SideNav-color)',
				display: { xs: 'none', lg: 'flex' },
				flexDirection: 'column',
				height: '100%',
				left: 0,
				maxWidth: '100%',
				position: 'fixed',
				scrollbarWidth: 'none',
				top: 0,
				width: 'var(--SideNav-width)',
				zIndex: 'var(--SideNav-zIndex)',
				'&::-webkit-scrollbar': { display: 'none' },
			}}
		>
			<Box component='nav' sx={{ flex: '1 1 auto', p: '12px' }}>
				<Stack
					component='ul'
					spacing={1}
					sx={{ listStyle: 'none', m: 0, p: 0 }}
				>
					{mapMenuItems()}
				</Stack>
			</Box>
			<Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
		</Box>
	)
}

export default Sidebar
