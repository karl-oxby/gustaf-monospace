import { useEffect, useState } from 'react'
import { DataTable } from '../../../../components/tables/DataTable'
import { getInvoices } from '../../../../services/invoices.service'
import type { Invoice } from '../../../../types'
import './Invoices.css'

export function Invoices() {
	const [invoices, setInvoices] = useState<Invoice[]>([])
	
	useEffect(() => {
		getInvoices().then(setInvoices)
	}, [])

	const columns = [
		{ key: 'issueDate', label: 'ISSUE DATE' },
		{ key: 'dueDate', label: 'DUE DATE' },
		{ key: 'status', label: 'STATUS', className: 'status-cell' },
		{ key: 'invoiceNo', label: 'INVOICE NO.' },
		{ key: 'amount', label: 'AMOUNT' },
	]

	return (
		<div className='invoices'>
			<h1>Invoices (v2.0)</h1>

			{invoices.length === 0 ? (
				<p>Loading...</p>
			) : (
				<DataTable 
					data={invoices}
					columns={columns}
					defaultSortKey="issueDate"
					searchKey="invoiceNo"
					pagePrefix="invoices"
				/>
			)}
		</div>
	)
}

