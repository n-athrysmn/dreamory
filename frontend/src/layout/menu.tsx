import React from 'react'
import { FaHome } from 'react-icons/fa'

interface MenuItem {
	title: string
	path: string
	icon: JSX.Element
}

const Menu: MenuItem[] = [
	{
		title: 'Dashboard',
		path: '/admin',
		icon: <FaHome />,
	},
	{
		title: 'Dashboard',
		path: '/user',
		icon: <FaHome />,
	},
]

export default Menu
