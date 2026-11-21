
import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Customer } from '../api/customers'

export interface CustomerFormData {
  name: string
  email: string
  phone: string
  company: string
}

interface CustomerFormProps {
  customer: Customer | null
  onClose: () => void
  onSubmit: (data: CustomerFormData) => Promise<void>
}

export default function CustomerForm({
  customer,
  onClose,
  onSubmit,
}: CustomerFormProps) {
  const [form, setForm] = useState<CustomerFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm({
      name: customer?.name ?? '',
      email: customer?.email ?? '',
      phone: customer?.phone ?? '',
      company: customer?.company ?? '',
    })
    setError('')
  }, [customer])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (saving) return

    setSaving(true)
    setError('')

    try {
      await onSubmit(form)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '고객 정보를 저장하지 못했습니다.'
      )
    } finally {
      setSaving(false)
    }
  }

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customer-form-title"
      className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6"
    >

        <div className="mb-6 flex items-center justify-between">
          <h2
            id="customer-form-title"
            className="text-xl font-bold"
          >
            {customer ? '고객 수정' : '고객 등록'}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="닫기"
            className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customer-name" className="mb-1 block text-sm font-medium">
              이름 *
            </label>
            <input
              id="customer-name"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="customer-email" className="mb-1 block text-sm font-medium">
              이메일 *
            </label>
            <input
              id="customer-email"
              type="email"
              required
              maxLength={255}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="customer-phone" className="mb-1 block text-sm font-medium">
              전화번호
            </label>
            <input
              id="customer-phone"
              maxLength={30}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          <div>
            <label htmlFor="customer-company" className="mb-1 block text-sm font-medium">
              회사명
            </label>
            <input
              id="customer-company"
              maxLength={150}
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
              className="w-full rounded-lg border border-slate-300 p-3"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-50"
            >
              취소
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? '저장 중...' : customer ? '수정하기' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
