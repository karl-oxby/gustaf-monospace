import { useState, useMemo } from 'react'
import './DataTable.css'

export interface Column {
	key: string
	label: string
	className?: string
}

interface DataTableProps<T> {
	data: T[]
	columns: Column[]
	defaultSortKey: string
	searchKey: string
	pagePrefix: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({ data, columns, defaultSortKey, searchKey, pagePrefix }: DataTableProps<T>) {
	const [search, setSearch] = useState('')
	const [showAll, setShowAll] = useState(false)

	const [sortKey, setSortKey] = useState(defaultSortKey)
	// newest first
	const [sortDir, setSortDir] = useState<'ascending' | 'descending'>('descending')

	function handleSort(colKey: string) {
		if (sortKey === colKey) {
			setSortDir(prev => (prev === 'ascending' ? 'descending' : 'ascending'))
		} else {
			setSortKey(colKey)
			setSortDir('descending')
		}
	}

	const processed = useMemo(() => {
		let list = [...data]

		list.sort((a, b) => {
			const aVal = a[sortKey]
			const bVal = b[sortKey]

			let result: number

			if (typeof aVal === 'number' && typeof bVal === 'number') {
				result = aVal - bVal
			} else if (!isNaN(Date.parse(String(aVal))) && !isNaN(Date.parse(String(bVal)))) {
				result = Date.parse(String(aVal)) - Date.parse(String(bVal))
			} else {
				result = String(aVal).localeCompare(String(bVal))
			}

			return sortDir === 'ascending' ? result : -result
		})

		if (search) {
			const q = search.toLowerCase()
			list = list.filter(row =>
				String(row[searchKey]).toLowerCase().includes(q)
			)
		}

		return list
	}, [data, search, sortKey, sortDir, searchKey])

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
							<th
								key={col.key}
								className={col.className || ''}
								onClick={() => handleSort(col.key)}
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{visible.map((row, index) => (
						<tr
							key={index}
							onClick={() => {
								const settlementId = row['settlementId']
								if (typeof settlementId !== 'string') return
								const url = `/${pagePrefix}/${settlementId}`
								window.open(url, '_blank')
							}}
							className='clickable-row'
						>
							{columns.map(col => {
								const value = row[col.key]

								if (typeof value === 'number') {
									return (
										<td key={col.key} className={col.className || ''}>
											{value.toFixed(2)}
										</td>
									)
								}

								return (
									<td key={col.key} className={col.className || ''}>
										{String(value ?? '')}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			</table>
			<div className='table-info'>
				Showing {visible.length} of {processed.length}
			</div>
			{!showAll && processed.length > 32 && (
				<button onClick={() => setShowAll(true)}>
					Show all
				</button>
			)}
		</div>
	)
}