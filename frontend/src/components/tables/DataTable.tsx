import { useState, useMemo } from 'react'
import './DataTable.css'

export interface Column {
	key: string
	label: string
	className?: string
}

interface DataTableProps {
	data: any[]
	columns: Column[]
	defaultSortKey: string
	searchKey: string
	pagePrefix: string
}

export function DataTable({ data, columns, defaultSortKey, searchKey, pagePrefix }: DataTableProps) {
	const [search, setSearch] = useState('')
	const [showAll, setShowAll] = useState(false)

	const processed = useMemo(() => {
		let list = [...data]

		// newest first
		list.sort((a, b) =>
			new Date(b[defaultSortKey]).getTime() -
			new Date(a[defaultSortKey]).getTime()
		)

		if (search) {
			const q = search.toLowerCase()
			list = list.filter(row =>
				String(row[searchKey]).toLowerCase().includes(q)
			)
		}

		return list
	}, [data, search, defaultSortKey, searchKey])

	const visible = showAll ? processed : processed.slice(0, 32)

	return (
		<div className='data-table'>
			<div className='table-info'>
				Showing {visible.length} of {processed.length}
			</div>
			<div className='table-search'>
				<label>
					Search
					<input 
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</label>
			</div>
			<table>
				<thead>
					<tr>
						{columns.map(col => (
							<th key={col.key} className={col.className || ''}>
								{col.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{visible.map((row, index) => (
						<tr key={index}
							onClick={() => {
								if (!row.settlementId) return
								const url = `/${pagePrefix}/${row.settlementId}`
								window.open(url, '_blank')
							}}
							className='clickable-row'
						>
							{columns.map(col => (
								<td key={col.key} className={col.className || ''}>
									{row[col.key]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{!showAll && processed.length > 32 && (
				<button onClick={() => setShowAll(true)}>
					Show all
				</button>
			)}
		</div>
	)
}

