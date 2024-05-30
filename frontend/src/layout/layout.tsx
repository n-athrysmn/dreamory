import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import { Box, Container, GlobalStyles } from '@mui/material'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<GlobalStyles
				styles={{
					body: {
						'--MainNav-height': '56px',
						'--MainNav-zIndex': 1000,
						'--SideNav-width': '280px',
						'--SideNav-zIndex': 1100,
						'--MobileNav-width': '320px',
						'--MobileNav-zIndex': 1100,
					},
				}}
			/>
			<Box
				sx={{
					bgcolor: 'var(--mui-palette-background-default)',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					minHeight: '100%',
				}}
			>
				<Sidebar />
				<Box
					sx={{
						display: 'flex',
						flex: '1 1 auto',
						flexDirection: 'column',
						pl: { lg: 'var(--SideNav-width)' },
					}}
				>
					<Navbar />
					<main>
						<Container maxWidth='xl' sx={{ py: '64px' }}>
							{children}
						</Container>
					</main>
				</Box>
			</Box>
		</>
	)
}

export default Layout
