import { Outlet } from 'react-router-dom'
import './Layout.css'
import { Sidebar } from './Sidebar'

export function Layout() {
	return (
		<div className='layout'>
			<Sidebar />

			<main className='layout-pages'>
				<Outlet />
			</main>
		</div>
	)
}

