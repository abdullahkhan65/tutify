"use client";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface Props {
  signupData: { date: string; count: number }[];
  testData: { date: string; count: number }[];
  subjectData: { subject: string; avgScore: number; tests: number }[];
}

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "12px",
  fontSize: "12px",
  color: "hsl(var(--foreground))",
};

export default function AnalyticsCharts({ signupData, testData, subjectData }: Props) {
  return (
    <div className="space-y-4">
      {/* Signups over time */}
      <div className="glass-strong rounded-2xl border border-border p-5">
        <h3 className="text-sm font-semibold mb-4">New Signups — Last 14 Days</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={signupData}>
            <defs>
              <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="count" stroke="#7c3aed" fill="url(#signupGrad)" strokeWidth={2} name="Signups" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tests completed over time */}
      <div className="glass-strong rounded-2xl border border-border p-5">
        <h3 className="text-sm font-semibold mb-4">Tests Completed — Last 14 Days</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={testData}>
            <defs>
              <linearGradient id="testGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="count" stroke="#0d9488" fill="url(#testGrad)" strokeWidth={2} name="Tests" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Average score by subject */}
      {subjectData.length > 0 && (
        <div className="glass-strong rounded-2xl border border-border p-5">
          <h3 className="text-sm font-semibold mb-4">Average Score by Subject</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis dataKey="subject" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={70} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Avg Score"]} />
              <Bar dataKey="avgScore" fill="#ea580c" radius={[0, 6, 6, 0]} name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {subjectData.length === 0 && (
        <div className="glass-strong rounded-2xl border border-border p-8 text-center text-sm text-muted-foreground">
          Subject analytics will appear once students start taking tests.
        </div>
      )}
    </div>
  );
}
