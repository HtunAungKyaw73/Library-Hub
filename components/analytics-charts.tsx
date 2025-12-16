"use client"

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  LineChart,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsChartsProps {
  genreData: { name: string; value: number }[]
  authorData: { name: string; books: number }[]
  decadeData: { decade: string; count: number }[]
}

const COLORS = ["#2563eb", "#16a34a", "#ea580c", "#8b5cf6", "#ec4899"]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-3">
      {label && <p className="font-medium text-foreground mb-1">{label}</p>}
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: entry.color || entry.fill }}>
          {entry.name || entry.dataKey}: {entry.value}
        </p>
      ))}
    </div>
  )
}

export function AnalyticsCharts({ genreData, authorData, decadeData }: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Books by Genre Pie Chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Books by Genre</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {genreData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Books by Author Bar Chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Books by Author</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={authorData} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={75} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="books" fill="#2563eb" radius={[0, 4, 4, 0]} name="Books" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Books by Decade Line Chart */}
      <Card className="lg:col-span-2 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Books by Publication Decade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={decadeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="decade" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ fill: "#16a34a", strokeWidth: 2 }}
                  name="Number of Books"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="lg:col-span-2 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Collection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{genreData.reduce((sum, g) => sum + g.value, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Books</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{authorData.length}</p>
              <p className="text-sm text-muted-foreground">Authors</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{genreData.length}</p>
              <p className="text-sm text-muted-foreground">Genres</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{decadeData.length}</p>
              <p className="text-sm text-muted-foreground">Decades Covered</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
