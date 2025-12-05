import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'

import { Invoices } from '../pages/dashboard/settlements/invoices/Invoices'
import { InvoicesDetails } from '../pages/dashboard/settlements/invoices/InvoicesDetails'

import { Selfbilling } from '../pages/dashboard/settlements/self-billing/Selfbilling'
import { SelfbillingDetails } from '../pages/dashboard/settlements/self-billing/SelfbillingDetails'

import { Credits } from '../pages/dashboard/settlements/credits/Credits'
import { CreditsDetails } from '../pages/dashboard/settlements/credits/CreditsDetails'

import { Pickinglists } from '../pages/dashboard/settlements/picking-lists/Pickinglists'
import { PickinglistsDetails } from '../pages/dashboard/settlements/picking-lists/PickinglistsDetails'

import { Login } from '../pages/auth/Login'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Navigate to="/invoices" />  },

			{ path: 'invoices', element: <Invoices /> },
			{ path: 'self-billing', element: <Selfbilling /> },
			{ path: 'credits', element: <Credits /> },
			{ path: 'picking-lists', element: <Pickinglists /> },
		],
	},
	{ path: 'invoices/:settlementId', element: <InvoicesDetails /> },
	{ path: 'self-billing/:settlementId', element: <SelfbillingDetails /> },
	{ path: 'credits/:settlementId', element: <CreditsDetails /> },
	{ path: 'picking-lists/:settlementId', element: <PickinglistsDetails /> },

	{ path: '/login',	element: <Login /> }
])

