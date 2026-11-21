
import { useEffect, useState } from 'react'
import {
  Users,
  UserPlus,
  Database,
  RefreshCw,
} from 'lucide-react'
import { getCustomers, type Customer } from '../api/customers'
import CustomerGrowthChart from '../components/CustomerGrowthChart'

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCustomers() {
    setLoading(true)
    setError('')

    try {
      const data = await getCustomers()
      setCustomers(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '고객 데이터를 불러오지 못했습니다.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadCustomers()
  }, [])

  const now = new Date()

  const monthlyCustomers = customers.filter((customer) => {
    const date = new Date(customer.createdAt)

    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    )
  }).length

  const recentCustomers = [...customers]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            대시보드
          </h2>
          <p className="mt-2 text-slate-500">
            BizFlow Admin 고객 관리 현황
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadCustomers()}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          새로고침
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="전체 고객"
          value={loading ? '...' : error ? '-' : customers.length}
          icon={<Users size={22} />}
        />

        <StatCard
          title="이번 달 신규 고객"
          value={loading ? '...' : error ? '-' : monthlyCustomers}
          icon={<UserPlus size={22} />}
        />

        <StatCard
          title="데이터 연동"
          value={loading ? '확인 중' : error ? '연결 실패' : '연결 성공'}
          icon={<Database size={22} />}
        />
      </div>

      {!loading && !error && (
          <CustomerGrowthChart customers={customers} />
        )}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-bold text-slate-900">
          최근 등록 고객
        </h3>

        {loading ? (
          <p className="text-slate-500">불러오는 중...</p>
        ) : error ? (
          <p className="text-red-600">고객 목록을 불러올 수 없습니다.</p>
        ) : recentCustomers.length === 0 ? (
          <p className="text-slate-500">등록된 고객이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4">이름</th>
                  <th className="p-4">이메일</th>
                  <th className="p-4">등록일</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map((customer) => (
                  <tr key={customer.id} className="border-t border-slate-100">
                    <td className="p-4 font-medium">{customer.name}</td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">
                      {new Date(customer.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        <span className="text-blue-600">{icon}</span>
      </div>

      <p className="text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  )
}
