
export interface Customer {
  id: number
  name: string
  email: string
  phone: string | null
  company: string | null
  createdAt: string
  updatedAt: string
}

export interface CustomerRequest {
  name: string
  email: string
  phone: string
  company: string
}

const API_URL = '/api/customers'

// 공통 응답 처리
async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    let message = `요청에 실패했습니다. (HTTP ${response.status})`

    try {
      const data: unknown = await response.json()

      if (data && typeof data === 'object' && 'message' in data) {
        const serverMessage = data.message
        if (typeof serverMessage === 'string') {
          message = serverMessage
        }
      }
    } catch {
      // JSON 응답이 아니면 기본 오류 메시지 사용
    }

    throw new Error(message)
  }

  return response.json() as Promise<T>
}

// 고객 목록 조회
export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(API_URL)
  return handleResponse<Customer[]>(response)
}

// 고객 등록
export async function createCustomer(
  data: CustomerRequest
): Promise<Customer> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })

  return handleResponse<Customer>(response)
}

// 고객 수정
export async function updateCustomer(
  id: number,
  data: CustomerRequest
): Promise<Customer> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })

  return handleResponse<Customer>(response)
}

// 고객 삭제
export async function deleteCustomer(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`고객 삭제에 실패했습니다. (HTTP ${response.status})`)
  }
}
