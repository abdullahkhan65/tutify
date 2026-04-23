"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Static demo data — will be replaced with real DB queries
const signupData = [
  { day: "Mon", users: 2 },
  { day: "Tue", users: 5 },
  { day: "Wed", users: 3 },
  { day: "Thu", users: 8 },
  { day: "Fri", users: 12 },
  { day: "Sat", users: 7 },
  { day: "Sun", users: 4 },
];

const subjectData = [
  { subject: "Physics", sessions: 45 },
  { subject: "Chemistry", sessions: 32 },
  { subject: "Math", sessions: 38 },
  { subject: "Biology", sessions: 18 },
  { subject: "English", sessions: 10 },
];

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function AdminCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Signups chart */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="text-sm font-semibold mb-4">New Signups (Last 7 Days)</div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={signupData}>
            <defs>
              <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(240 5% 55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(240 5% 55%)" }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="users" stroke="#7c3aed" strokeWidth={2} fill="url(#signupGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Subject popularity */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="text-sm font-semibold mb-4">Sessions by Subject</div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={subjectData} barSize={28}>
            <XAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(240 5% 55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(240 5% 55%)" }} axisLine={false} tickLine={false} width={24} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sessions" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
