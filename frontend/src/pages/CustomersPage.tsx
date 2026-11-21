
import { useEffect, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  type Customer,
} from '../api/customers'
import CustomerTable from '../components/CustomerTable'
import CustomerForm, {
  type CustomerFormData,
} from '../components/CustomerForm'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function loadCustomers() {
    const data = await getCustomers()
    setCustomers(data)
  }

  useEffect(() => {
    let active = true

    getCustomers()
      .then((data) => {
        if (active) setCustomers(data)
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error ? err.message : '조회 실패'
          )
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  function openCreate() {
    setEditingCustomer(null)
    setFormOpen(true)
  }

  function openEdit(customer: Customer) {
    setEditingCustomer(customer)
    setFormOpen(true)
  }

  async function handleSave(data: CustomerFormData) {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, data)
    } else {
      await createCustomer(data)
    }

    await loadCustomers()

    setFormOpen(false)
    setEditingCustomer(null)
    setMessage(
      editingCustomer
        ? '고객 정보가 수정되었습니다.'
        : '고객이 등록되었습니다.'
    )
    setError('')
  }

  async function handleDelete(customer: Customer) {
    if (deleting) return

    const confirmed = window.confirm(
      `${customer.name} 고객을 삭제하시겠습니까?`
    )

    if (!confirmed) return

    setDeleting(true)
    setError('')
    setMessage('')

    try {
      await deleteCustomer(customer.id)
      await loadCustomers()
      setMessage('고객이 삭제되었습니다.')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '삭제 실패'
      )
    } finally {
      setDeleting(false)
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.trim().toLowerCase()

    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      (customer.company ?? '').toLowerCase().includes(keyword)
    )
  })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            고객 관리
          </h2>
          <p className="mt-2 text-slate-500">
            고객 정보를 등록하고 관리합니다.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          고객 등록
        </button>
      </div>

      {message && (
        <p role="status" className="mt-6 rounded-lg bg-green-50 p-4 text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold">
            고객 목록 ({customers.length}명)
          </h3>

          <div className="flex w-full items-center gap-2 rounded-lg border border-slate-300 px-3 sm:w-auto">
            <Search size={18} className="text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 이메일, 회사명 검색"
              aria-label="고객 검색"
              className="min-w-0 flex-1 py-3 outline-none sm:w-56"
            />
          </div>
        </div>

        {loading ? (
          <p className="py-10 text-center text-slate-500">
            고객 목록을 불러오는 중...
          </p>
        ) : error && customers.length === 0 ? (
          <p className="py-10 text-center text-red-600">
            고객 목록을 표시할 수 없습니다.
          </p>
        ) : (
          <CustomerTable
            customers={filteredCustomers}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {formOpen && (
        <CustomerForm
          customer={editingCustomer}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  )
}
