import { useEffect, useState } from 'react'
import { DataTable } from '../../../../components/tables/DataTable'
import { getSelfBilling } from '../../../../services/self-billing.service'
import type { SelfBilling } from '../../../../types'
import './Selfbilling.css'

export function Selfbilling() {
	const [selfBilling, setSelfBilling] = useState<SelfBilling[]>([])

	useEffect(() => {
		getSelfBilling().then(setSelfBilling)
	}, [])

	const columns = [
		{ key: 'issueDate', label: 'ISSUE DATE' },
		{ key: 'dueDate', label: 'DUE DATE' },
		{ key: 'status', label: 'STATUS', className: 'status-cell' },
		{ key: 'selfbillingNo', label: 'SELF BILLING NO.' },
		{ key: 'amount', label: 'AMOUNT' },
	]

	return (
		<div className='self-billing'>
			<h1>Self billing</h1>

			{selfBilling.length === 0 ? (
				<p>Loading...</p>
			) : (
				<DataTable
					data={selfBilling}
					columns={columns}
					defaultSortKey="issueDate"
					searchKey="selfbillingNo"
					pagePrefix="self-billing"
				/>
			)}
		</div>
	)
}

