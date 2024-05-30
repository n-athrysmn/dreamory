import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login'
import Layout from './layout/layout'
import NotFound from './pages/404'
import Home from './pages/home'
import { ThemeProvider } from './theme-provider'
import Event from './pages/event'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
	{
		path: '/admin',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: '/create',
		element: (
			<Layout>
				<Event />
			</Layout>
		),
	},
	{
		path: '/edit/:id',
		element: (
			<Layout>
				<Event />
			</Layout>
		),
	},
	{
		path: '/delete/:id',
		element: (
			<Layout>
				<Event />
			</Layout>
		),
	},
	{
		path: '/user',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: '/view/:id',
		element: (
			<Layout>
				<Event />
			</Layout>
		),
	},
])

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={routes} />
		</ThemeProvider>
	)
}

export default App
