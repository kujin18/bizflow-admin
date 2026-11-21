
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import type { Customer } from '../api/customers'

interface CustomerGrowthChartProps {
  customers: Customer[]
}

export default function CustomerGrowthChart({
  customers,
}: CustomerGrowthChartProps) {
  const now = new Date()

  const data = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(
      now.getFullYear(),
      now.getMonth() - 5 + index,
      1
    )

    const nextMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      1
    )

    const count = customers.filter((customer) => {
      const createdAt = new Date(customer.createdAt)

      return createdAt >= month && createdAt < nextMonth
    }).length

    return {
      month: `${month.getMonth() + 1}월`,
      customers: count,
    }
  })

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          월별 신규 고객 추이
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          최근 6개월간 신규 등록 고객 수
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />

            <Tooltip
              formatter={(value) => [`${value ?? 0}명`, '신규 고객']}
            />

            <Area
              type="monotone"
              dataKey="customers"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#customerGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
