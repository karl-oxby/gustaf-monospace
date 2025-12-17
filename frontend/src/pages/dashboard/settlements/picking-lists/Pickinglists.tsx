import { useEffect, useState } from 'react'
import { DataTable } from '../../../../components/tables/DataTable'
import { getPickingLists } from '../../../../services/picking-lists.service'
import './Pickinglists.css'

export function Pickinglists() {
	const [pickingLists, setPickingLists] = useState<any[]>([])

	useEffect(() => {
		getPickingLists().then(setPickingLists)
	}, [])

	const columns = [
		{ key: 'issueDate', label: 'ISSUE DATE' },
		{ key: 'trackingNo', label: 'TRACKING NO.', className: 'status-cell' },
		{ key: 'pickinglistNo', label: 'PICKING LIST NO.' },
	]

	return (
		<div className='picking-lists'>
			<h1>Picking lists</h1>

			{pickingLists.length === 0 ? (
				<p>Loading...</p>
			) : (
				<DataTable
					data={pickingLists}
					columns={columns}
					defaultSortKey="issueDate"
					searchKey="pickinglistNo"
					pagePrefix="picking-lists"
				/>
			)}
		</div>
	)
}

