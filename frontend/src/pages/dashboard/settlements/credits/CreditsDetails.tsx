import { useParams } from 'react-router-dom'

export function CreditsDetails() {
  const { settlementId } = useParams()

  return <p>{settlementId}</p> 
}



