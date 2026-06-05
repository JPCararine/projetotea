import { ArrowRight, ShieldCheck, Sparkles, Users, Activity, FileText } from 'lucide-react';
import { buildAuthorizeUrl } from '../shared/auth/pkce';

function resolveAuthRegisterUrl() {
  return import.meta.env.VITE_AUTH_REGISTER_URL || 'http://localhost:8081/register';
}

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Login centralizado',
    description: 'Fluxo OAuth2/OIDC com autenticação concentrada no authserver.',
  },
  {
    icon: Users,
    title: 'Base clínica',
    description: 'Pacientes, avaliações, agenda e relatórios no mesmo padrão visual.',
  },
  {
    icon: Activity,
    title: 'Operação organizada',
    description: 'Layout orientado a uso diário, com navegação rápida e legível.',
  },
];

export default function HomePage() {
  const authRegisterUrl = resolveAuthRegisterUrl();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden border-b border-slate-200 bg-slate-900 text-white lg:border-b-0 lg:border-r lg:border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.24),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(15,118,110,0.18),transparent_28%)]" />

          <div className="relative flex h-full flex-col justify-between px-8 py-8 sm:px-12 lg:px-14">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-500/15 text-teal-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-white">Projeto TEA</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Plataforma clínica</p>
              </div>
            </div>

            <div className="max-w-2xl py-10">
              <span className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
                Entrada do sistema
              </span>

              <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Uma entrada clara para o ambiente clínico e operacional.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                A tela inicial leva o usuário direto para a autenticação centralizada, preservando a
                mesma identidade visual do painel privado.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={async () => window.location.assign(await buildAuthorizeUrl())}
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-400"
                >
                  Entrar
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => window.location.assign(authRegisterUrl)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  Criar conta
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-teal-300" />
                  <h2 className="mt-4 text-sm font-semibold text-white">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex items-center justify-center px-8 py-10 sm:px-12 lg:px-14">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="rounded-[22px] bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Acesso protegido</p>
                  <p className="text-xs text-slate-500">Redirecionamento para o authserver</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                O front serve como porta de entrada. A autenticação, o login e o cadastro seguem
                para o servidor de autenticação mantendo a segregação correta entre UI e segurança.
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Fluxo de login</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Botão de entrada aponta para a rota de login hospedada no authserver.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Fluxo de registro</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A criação de conta também segue para a rota de cadastro do authserver.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
