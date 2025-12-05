import { DataTable } from '../../../../components/tables/DataTable'
import './Invoices.css'

export function Invoices() {
	const invoices = [
		{
			settlementId: 'b8f4031e-1e03-4aec-bc11-c6b5359a3871',
			issueDate: '2025-01-01',
			dueDate: '2025-02-01',
			status: 'Paid',
			invoiceNo: 'PI0000001',
			amount: 100.00,
		},
		{
			settlementId: 'a072ffd6-12c7-4654-8ce2-dbe17ced17f6',
			issueDate: '2025-02-01',
			dueDate: '2025-03-01',
			status: 'Paid',
			invoiceNo: 'PI0000002',
			amount: 100.00,
		}
	]

	const columns = [
		{ key: 'issueDate', label: 'ISSUE DATE' },
		{ key: 'dueDate', label: 'DUE DATE' },
		{ key: 'status', label: 'STATUS', className: 'status-cell' },
		{ key: 'invoiceNo', label: 'INVOICE NO.' },
		{ key: 'amount', label: 'AMOUNT' },
	]

	return (
		<div className='invoices'>
			<h1>Invoices</h1>
			<DataTable 
				data={invoices}
				columns={columns}
				defaultSortKey="issueDate"
				searchKey="invoiceNo"
				pagePrefix="invoices"
			/>
		</div>
	)
}

