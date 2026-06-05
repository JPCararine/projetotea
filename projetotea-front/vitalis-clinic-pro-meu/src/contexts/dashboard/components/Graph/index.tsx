import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Clock, ExternalLink } from "lucide-react";

const data = [
  { mes: "Jan", pacientes: 12 },
  { mes: "Fev", pacientes: 18 },
  { mes: "Mar", pacientes: 32 },
  { mes: "Abr", pacientes: 45 },
  { mes: "Mai", pacientes: 5 },
];

export function PatientGrowthChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6" >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Evolução do Cadastro de Pacientes
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Visão cumulativa de crianças assistidas de janeiro a maio de 2026
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          Crianças Ativas
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="patientsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#eef2f7" />

            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8fa0b8", fontSize: 12 }}
              dy={8}
            />

            <YAxis
              domain={[0, 50]}
              ticks={[0, 25, 50]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8fa0b8", fontSize: 12 }}
              tickFormatter={(value) => `${value} pac.`}
            />

            <Area
              type="monotone"
              dataKey="pacientes"
              stroke="none"
              fill="url(#patientsGradient)"
            />

            <Line
              type="monotone"
              dataKey="pacientes"
              stroke="#0f9f93"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#0f9f93",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 7,
                fill: "#0f9f93",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
              label={{
                position: "top",
                fill: "#334155",
                fontSize: 11,
                fontWeight: 700,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-teal-600" />
          Sincronizado de acordo com prontuários da clínica
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700">
          Exibir Lista de Pacientes
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default PatientGrowthChart;