import { Brain, ShieldAlert } from "lucide-react";
import { useDashboardViewModel } from "../../hooks/use-dashboard-view-model";

export function AlertSignal () {

    const { developmentAlerts } = useDashboardViewModel();
    return (
        <div className="p-6 flex flex-col justify-center">
            <div className="flex-row items-center flex gap-1 p-1 px-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold">
                <Brain size={16}/>
                <span className="">Triagem Denver II</span>
            </div>
            <div className="mt-2">
                <h3 className="font-sans font-bold text-base text-slate-800 tracking-tight">Sinalizadores de Desenvolvimento</h3>
                <p className="text-xs text-slate-400 mt-0.5">Pacientes sob alerta de marcos atrasados</p>
                <div className="space-y-3.5 mt-5 max-h-[220px] overflow-y-auto pr-1">
              {developmentAlerts.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Excelente! Nenhuma criança com marcos de desenvolvimento em alerta no momento.
                </div>
              ) : (
                developmentAlerts.map((da, index) => (
                  <div key={index} className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md hover:border-slate-200 transition-all duration-200">
                    <div className="mt-0.5 mr-2">
                      <ShieldAlert className="w-4.5 h-4.5 mb-14  text-rose-500" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-800">{da.patientName}</h4>
                      <p className="text-[10px] leading-relaxed text-slate-500 line-clamp-2 hover:line-clamp-none transition-all duration-800">
                        {da.observations}
                      </p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 font-extrabold text-[9px] uppercase tracking-wide rounded">
                          {da.status}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium">Médico: {da.assessorName}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            </div>
        </div>
    )

}

export default AlertSignal;