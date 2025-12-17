import { useEffect, useState } from 'react'
import { DataTable } from '../../../../components/tables/DataTable'
import { getCredits } from '../../../../services/credits.service'
import './Credits.css'

export function Credits() {
	const [credits, setCredits] = useState<any[]>([])

	useEffect(() => {
		getCredits().then(setCredits)
	}, [])

	const columns = [
    		{ key: 'issueDate', label: 'ISSUE DATE' },
		{ key: 'dueDate', label: 'DUE DATE' },
    		{ key: 'status', label: 'STATUS', className: 'status-cell' },
    		{ key: 'creditNo', label: 'CREDIT NO.' },
    		{ key: 'amount', label: 'AMOUNT' },
  	]

  	return (
    		<div className='credits'>
      			<h1>Credits</h1>

      			{credits.length === 0 ? (
        			<p>Loading...</p>
      			) : (
       				<DataTable
          				data={credits}
          				columns={columns}
          				defaultSortKey="issueDate"
          				searchKey="creditNo"
          				pagePrefix="credits"
        			/>
      			)}
		</div>
	)
}

