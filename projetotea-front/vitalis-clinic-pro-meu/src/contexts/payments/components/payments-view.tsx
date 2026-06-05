import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Filter, 
  Plus, 
  Receipt,
  FileDown,
  Calendar,
  Wallet,
  Coins,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  CreditCard,
  QrCode
} from 'lucide-react';
import { usePaymentsViewModel } from '../hooks/use-payments-view-model';

interface PaymentsPageProps {
  searchTerm: string;
}

export default function PaymentsPage({ searchTerm }: PaymentsPageProps) {
  const {
    activePlan,
    filteredInvoices,
    handleExecutePayment,
    onSelectPlan,
    patientsCount,
    payInvoiceModalId,
    plans,
    selectedPayMethod,
    setPayInvoiceModalId,
    setSelectedPayMethod,
    setStatusFilter,
    statusFilter,
    usagePercentage,
  } = usePaymentsViewModel({ searchTerm });

  return (
    <div id="payments-view-wrapper" className="space-y-8 animate-fade-in text-left">
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        
        <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assinatura Hospitalis</span>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Ativa</h3>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Em dia (Próxima cobrança 15/06)
            </span>
          </div>
          <div className="p-3.5 bg-teal-50 rounded-xl text-teal-600">
            <ShieldCheck className="w-5.5 h-5.5" />
          </div>
        </div>

        
        <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Custos Semanais/Mensais</span>
            <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
              R$ {activePlan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<span className="text-xs font-normal text-slate-400">/mês</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">Valor com tributos inclusos</span>
          </div>
          <div className="p-3.5 bg-indigo-50 rounded-xl text-indigo-600">
            <Coins className="w-5.5 h-5.5" />
          </div>
        </div>

        
        <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition lg:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Limite de Pacientes Cadastrados</span>
              <h4 className="text-sm font-bold text-slate-800 mt-1">{patientsCount} de {activePlan.patientLimit} pacientes cadastrados</h4>
            </div>
            <span className="text-xs font-extrabold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{usagePercentage}%</span>
          </div>

          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-teal-500 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block">Sua clínica necessita de mais de {activePlan.patientLimit} registros? Faça um upgrade de plano!</span>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        
        <div className="p-6 bg-slate-900 text-white rounded-xl shadow-xl flex flex-col justify-between h-full space-y-6">
          <div className="space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Configurações Ativas</span>
                <h4 className="text-lg font-extrabold text-white">{activePlan.name}</h4>
              </div>
              <span className="text-xs px-2 py-0.5 bg-teal-500/10 text-teal-400 font-extrabold rounded-full border border-teal-500/30">Atual</span>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">Benefícios inclusos em sua assinatura mensal corporativa:</p>
              <ul className="space-y-2.5 text-xs">
                {activePlan.features.map((feat, index) => (
                  <li key={index} className="flex gap-2 items-start text-slate-200 font-medium">
                    <CheckCircle className="w-4.5 h-4.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <p className="text-[10px] text-slate-400 leading-relaxed text-left">
              * Para trocar o cartão de débito recorrente, emitir nota fiscal de serviços corporativos (NFS-e) ou rescindir o contrato SaaS, envie um e-mail para <strong className="text-teal-400">faturamento@hospitalis.com.br</strong>.
            </p>
          </div>
        </div>

        
        <div className="lg:col-span-2 space-y-6">
          <h4 className="font-sans font-bold text-lg text-slate-800 tracking-tight">Catálogo de Assinaturas e Upgrade do Sistema</h4>
          <p className="text-xs text-slate-400 -mt-4">Escolha a escala de pacientes adequada e acesse novos recursos de acompanhamento</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl border p-5 flex flex-col justify-between hover:border-slate-300 transition ${
                  p.isCurrent ? 'ring-2 ring-teal-500 border-teal-500 shadow-sm bg-teal-50/5' : 'border-slate-200'
                }`}
              >
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-start gap-1">
                    <h5 className="font-bold text-slate-800 text-xs lines-clamp-1">{p.name}</h5>
                    {p.isCurrent && (
                      <span className="text-[8px] bg-teal-500 text-white font-extrabold uppercase px-1.5 py-0.5 rounded-full shrink-0">Ativo</span>
                    )}
                  </div>
                  <div className="text-lg font-extrabold text-slate-800">
                    R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    <span className="text-[10px] text-slate-400 font-normal">/mês</span>
                  </div>
                  
                  <span className="block text-[10px] text-teal-700 bg-teal-100/50 px-2 py-0.5 rounded w-fit font-bold font-mono">Até {p.patientLimit} Pacientes</span>
                  
                  <ul className="space-y-1.5 pt-2 border-t border-slate-50">
                    {p.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-[10px] text-slate-500 leading-normal flex gap-1 items-start font-medium">
                        <span className="text-teal-500 font-bold shrink-0">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  {p.isCurrent ? (
                    <button 
                      disabled
                      className="w-full bg-teal-50 text-teal-700 border border-teal-100 py-1.5 rounded-lg text-xs font-bold"
                    >
                      Plano Utilizado
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onSelectPlan(p.name);
                        alert(`Plano migrado para ${p.name}! As alterações entrarão em vigor no próximo vencimento de faturamento.`);
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Contratar Plano
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <h4 className="font-sans font-bold text-lg text-slate-800 tracking-tight">Histórico de Faturas da Assinatura</h4>
            <p className="text-xs text-slate-400 mt-0.5">Laudos e notas de pagamento correspondentes ao uso corporativo</p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-xs font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">Sitação da Fatura</option>
              <option value="Pago">Faturas Quitadas</option>
              <option value="Pendente">Faturas Pendentes</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-bold uppercase text-slate-500 border-b border-slate-100">
                  <th className="py-4 px-6">Identificador</th>
                  <th className="py-4 px-6">Faturamento Associado</th>
                  <th className="py-4 px-6">Valor Mensalidade</th>
                  <th className="py-4 px-6">Meio Utilizado</th>
                  <th className="py-4 px-6">Vencimento</th>
                  <th className="py-4 px-6">Pagamento Confirmado</th>
                  <th className="py-4 px-6">Status faturamento</th>
                  <th className="py-4 px-6 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      Não há faturas cadastradas correspondentes ao filtro.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/20 transition">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-slate-400">
                        {inv.id}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {inv.planName}
                      </td>
                      <td className="py-4 px-6 font-extrabold text-slate-850 font-mono">
                        R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-xs">
                        {inv.status === 'Pago' ? inv.paymentMethod : '—'}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-600">
                        {new Date(inv.dueDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-600">
                        {inv.paymentDate ? new Date(inv.paymentDate).toLocaleDateString('pt-BR') : '—'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          inv.status === 'Pago' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {inv.status === 'Pendente' ? (
                            <button
                              onClick={() => {
                                setPayInvoiceModalId(inv.id);
                                setSelectedPayMethod('Pix');
                              }}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] rounded transition shadow-sm cursor-pointer shrink-0"
                            >
                              Pagar Fatura
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                alert(`Simulação: XML/Receita de NFS-e copiada para área de transferência.`);
                              }}
                              className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition block"
                              title="Visualizar Nota Fiscal"
                            >
                              <Receipt className="w-4 h-4 text-slate-400" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      {payInvoiceModalId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-slide-up">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="font-sans font-bold text-base text-white">Quitar Fatura Hospitalis</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Transação Segura Gateway de Pagamento</p>
                </div>
              </div>
              <button onClick={() => setPayInvoiceModalId(null)} className="text-slate-400 hover:text-white transition cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-left">
              <div className="space-y-1">
                <label className="block text-[10px] text-slate-400 uppercase font-bold">Meio para Liquidação</label>
                <select
                  value={selectedPayMethod}
                  onChange={(e) => setSelectedPayMethod(e.target.value)}
                  className="w-full p-2.5 bg-slate-55 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none"
                >
                  <option value="Pix">Pix Instantâneo (QR Code)</option>
                  <option value="Cartão de Crédito">Cartão de Crédito Corporativo</option>
                  <option value="Boleto">Boleto Bancário (Lançamento)</option>
                </select>
              </div>

              {selectedPayMethod === 'Pix' && (
                <div className="p-4 bg-teal-50/50 rounded-lg border border-teal-100 flex flex-col items-center space-y-3 text-center">
                  <QrCode className="w-32 h-32 text-slate-800" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Código Pix Copia e Cola</span>
                    <input 
                      readOnly 
                      value="00020101021226850014br.gov.bcb.pix2563qrcodeHospitalisSaaS" 
                      onClick={(e) => { (e.target as any).select(); alert('Código Pix Copiado!'); }}
                      className="w-full text-[10px] font-mono p-1 bg-white border text-center text-slate-600 rounded select-all focus:outline-none"
                    />
                    <p className="text-[10px] text-teal-800 font-medium mt-1">Escaneie o QR Code em seu aplicativo de banco para faturamento imediato.</p>
                  </div>
                </div>
              )}

              {selectedPayMethod === 'Cartão de Crédito' && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[9px] text-slate-400 font-bold uppercase">No. do Cartão</label>
                    <input type="text" readOnly value="•••• •••• •••• 4056" className="w-full p-2 bg-white border text-xs text-slate-600 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[9px] text-slate-400 font-bold uppercase">Validade</label>
                      <input type="text" readOnly value="12/29" className="w-full p-2 bg-white border text-xs text-slate-600 rounded text-center" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] text-slate-400 font-bold uppercase">CVV</label>
                      <input type="text" readOnly value="***" className="w-full p-2 bg-white border text-xs text-slate-600 rounded text-center" />
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal">Cartão principal previamente cadastrado no ambiente sandbox em conformidade com as exigências PCI-DSS.</p>
                </div>
              )}

              {selectedPayMethod === 'Boleto' && (
                <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100 text-center">
                  <p className="text-xs text-amber-900 leading-normal">Boleto gerado sob código de registro bancário de vencimento no dia útil subsequente. O envio do boleto em formato PDF é realizado para seu e-mail cadastrado.</p>
                </div>
              )}

              <div className="pt-4 border-t flex items-center justify-end gap-3 text-sm">
                <button type="button" onClick={() => setPayInvoiceModalId(null)} className="px-4 py-2 border hover:bg-slate-50 text-slate-600 rounded-lg font-semibold cursor-pointer">Voltar</button>
                <button type="button" onClick={handleExecutePayment} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-lg shadow-teal-600/10 cursor-pointer">Confirmar Pagamento</button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
