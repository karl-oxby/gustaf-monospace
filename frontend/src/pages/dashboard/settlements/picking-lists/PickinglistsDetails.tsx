import { useParams } from 'react-router-dom'

export function PickinglistsDetails() {
  const { settlementId } = useParams()

  return <p>{settlementId}</p> 
}


