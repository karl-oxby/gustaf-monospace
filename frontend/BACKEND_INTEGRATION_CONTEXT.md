# Frontend Integration Guide (React.js)

This document provides all the necessary details for a React.js project to interact with the **Settlements Service**.

## 🔌 API Connection
- **Base URL:** `http://localhost:8001`
- **Prefix:** `/api/v1`
- **Swagger UI:** `http://localhost:8001/docs` (Use this for real-time testing)

## 🛠 CORS Configuration
CORS is currently enabled for **all origins** (`*`) in development.
*Note: In production, this should be restricted to your frontend domain.*

## 📄 Core Data Models (TypeScript)

### Enums
```typescript
export enum SettlementStatus {
  WAITING = 'waiting',
  INVOICED = 'invoiced',
  CANCELLED = 'cancelled',
  PAID = 'paid'
}

export enum PaymentType {
  PI = 'PI',
  SB = 'SB',
  CR = 'CR',
  CL = 'CL'
}
```

### Main Entities
```typescript
export interface SettlementItem {
  id: number;
  payment_id: string;
  status: SettlementStatus;
  payment_type: PaymentType | null;
  ownable_type: string;
  ownable_id: string; // UUID
  data_url?: string;
  data_url2?: string;
  data_url3?: string;
  data: any; // Can be a Dictionary or an Array
  created_at?: string; // ISO DateTime
  updated_at?: string; // ISO DateTime
}

export interface Settlement {
  id: string; // UUID
  issue_date: string; // ISO DateTime
  due_date: string; // ISO DateTime
  status: SettlementStatus;
  data: any; // Can be a Dictionary or an Array
  items: SettlementItem[];
  created_at?: string;
  updated_at?: string;
}

export interface PickingList {
  settlementId: string; // UUID
  issueDate: string; // Format: YYYY-MM-DD
  trackingNo: string; // From shipment_id
  pickinglistNo: string; // From payment_id
}
```

## 🛣 Endpoints

### 1. List Settlements
*   **Method:** `GET`
*   **Path:** `/api/v1/settlements/`
*   **Query Params:**
    *   `skip`: number (default: 0)
    *   `limit`: number (default: 100)
*   **Response:** `Settlement[]`

### 2. Get Single Settlement
*   **Method:** `GET`
*   **Path:** `/api/v1/settlements/{id}`
*   **Response:** `Settlement`

### 3. Create Settlement
*   **Method:** `POST`
*   **Path:** `/api/v1/settlements/`
*   **Body:** `Partial<Settlement>`
*   **Response:** `Settlement`

### 4. Update Settlement
*   **Method:** `PATCH`
*   **Path:** `/api/v1/settlements/{id}`
*   **Body:** `{ status?: SettlementStatus, data?: any }`
*   **Response:** `Settlement`

### 5. List Picking Lists
*   **Method:** `GET`
*   **Path:** `/api/v1/picking-lists/`
*   **Query Params:**
    *   `skip`: number (default: 0)
    *   `limit`: number (default: 100)
*   **Response:** `PickingList[]`

### 6. Health Check
*   **Method:** `GET`
*   **Path:** `/health`
*   **Response:** `{ "status": "ok", "service": "settlements-service" }`

## ⚠️ Important Note on "data" fields
The `data` field in both `Settlement` and `SettlementItem` is polymorphic.
- Existing legacy data often returns an **Array of Objects**.
- New data often returns a **Dictionary**.
  Ensure your React components check for `Array.isArray(data)` before rendering.
