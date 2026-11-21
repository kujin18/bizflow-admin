
import type { Customer } from '../api/customers'

interface CustomerTableProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <p className="py-10 text-center text-slate-500">
        표시할 고객이 없습니다.
      </p>
    )
  }

  return (
    <>
      {/* 모바일: 카드 형태 */}
      <div className="space-y-4 md:hidden">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900">
                  {customer.name}
                </h4>
                <p className="text-xs text-slate-400">
                  ID: {customer.id}
                </p>
              </div>
            </div>

            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-slate-500">이메일</dt>
                <dd className="break-all">{customer.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">전화번호</dt>
                <dd>{customer.phone || '-'}</dd>
              </div>
              <div>
                <dt className="text-slate-500">회사명</dt>
                <dd>{customer.company || '-'}</dd>
              </div>
            </dl>

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => onEdit(customer)}
                className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => onDelete(customer)}
                className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PC 및 태블릿: 테이블 형태 */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 md:block">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">이름</th>
              <th className="p-4">이메일</th>
              <th className="p-4">전화번호</th>
              <th className="p-4">회사명</th>
              <th className="p-4">관리</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-slate-100 transition-colors hover:bg-blue-100"
              >
                <td className="whitespace-nowrap p-4">
                  {customer.id}
                </td>
                <td className="whitespace-nowrap p-4 font-medium">
                  {customer.name}
                </td>
                <td className="whitespace-nowrap p-4">
                  {customer.email}
                </td>
                <td className="whitespace-nowrap p-4">
                  {customer.phone || '-'}
                </td>
                <td className="whitespace-nowrap p-4">
                  {customer.company || '-'}
                </td>
                <td className="whitespace-nowrap p-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(customer)}
                      className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(customer)}
                      className="rounded-lg bg-red-50 px-3 py-2 font-medium text-red-700 hover:bg-red-100"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
