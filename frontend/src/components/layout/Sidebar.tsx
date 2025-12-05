import { NavLink } from 'react-router-dom'
import Logo from '../../assets/svg/gustaf.svg?react'
import './Sidebar.css'

export function Sidebar() {
	return (
		<aside className='sidebar'>
			<Logo width={64} height={64} className='logo'/>
			<nav className='sidebar-nav'>
				<h2>Settlements</h2>
				<ul>
					<li>
						<NavLink 
							to="/invoices" 
							className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
						>
							Invoices
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/self-billing" 
							className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
						>
							Self billing
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/credits" 
							className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
						>
							Credits
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/picking-lists" 
							className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
						>
							Picking lists
						</NavLink>
					</li>
				</ul>
			</nav>
			<button>
				Log out
			</button>
		</aside>
	)
}

