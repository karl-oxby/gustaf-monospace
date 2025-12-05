import { useParams } from 'react-router-dom'

export function InvoicesDetails() {
  const { settlementId } = useParams()

  return <p>{settlementId}</p> 
}

