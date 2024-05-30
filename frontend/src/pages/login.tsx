import { Box } from '@mui/material'
import React from 'react'
import UserLogin from '../components/login-form'

const Login = () => {
	return (
		<Box
			sx={{
				minHeight: '100%',
			}}
		>
			<Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flex: '1 1 auto',
						justifyContent: 'center',
						p: 3,
					}}
				>
					<Box sx={{ maxWidth: '450px', width: '100%' }}>
						<UserLogin />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Login
