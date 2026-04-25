import {
  Calendar,
  Download,
  Eye,
  FileText,
  Globe,
  Monitor,
  MousePointer,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';

interface Stats {
  totalVisitors: number;
  totalPageViews: number;
  totalEvents: number;
  totalForms: number;
  visitorsToday: number;
  visitorsThisWeek: number;
  visitorsThisMonth: number;
  avgTimeOnSite: number;
  conversionRate: number;
  deviceTypes: { device_type: string; count: number }[];
  topPages: { page_url: string; count: number; views?: number }[];
  browsers: { browser: string; count: number }[];
  recentVisitors: {
    session_id: string;
    device_type: string;
    browser: string;
    os: string;
    first_visit: string;
    total_visits: number;
  }[];
  recentForms: { form_name: string; form_data: string; timestamp: string }[];
  topClickedElements: {
    element_tag: string;
    element_id: string;
    element_class: string;
    event_name: string;
    clicks: number;
  }[];
}

const analyticsApiBases = [
  `${getRuntimeBasePath()}/server/api/analytics`,
  `${getRuntimeBasePath()}/novidades/server/api/analytics`,
];

function getRuntimeBasePath() {
  const script = document.querySelector('script[type="module"][src*="/assets/"]') as HTMLScriptElement | null;
  const source = script?.src || import.meta.url;
  const modulePath = new URL(source, window.location.href).pathname;
  const basePath = modulePath.replace(/\/assets\/[^/]+$/, '');

  return basePath === '/' || basePath === modulePath ? '' : basePath.replace(/\/$/, '');
}

function emptyStats(): Stats {
  return {
    totalVisitors: 0,
    totalPageViews: 0,
    totalEvents: 0,
    totalForms: 0,
    visitorsToday: 0,
    visitorsThisWeek: 0,
    visitorsThisMonth: 0,
    avgTimeOnSite: 0,
    conversionRate: 0,
    deviceTypes: [],
    topPages: [],
    browsers: [],
    recentVisitors: [],
    recentForms: [],
    topClickedElements: [],
  };
}

function normalizeStats(data: Partial<Stats> | null): Stats {
  const stats = { ...emptyStats(), ...(data || {}) };

  return {
    ...stats,
    totalVisitors: Number(stats.totalVisitors || 0),
    totalPageViews: Number(stats.totalPageViews || 0),
    totalEvents: Number(stats.totalEvents || 0),
    totalForms: Number(stats.totalForms || 0),
    visitorsToday: Number(stats.visitorsToday || 0),
    visitorsThisWeek: Number(stats.visitorsThisWeek || 0),
    visitorsThisMonth: Number(stats.visitorsThisMonth || 0),
    avgTimeOnSite: Number(stats.avgTimeOnSite || 0),
    conversionRate: Number(stats.conversionRate || 0),
    deviceTypes: Array.isArray(stats.deviceTypes) ? stats.deviceTypes : [],
    browsers: Array.isArray(stats.browsers) ? stats.browsers : [],
    recentVisitors: Array.isArray(stats.recentVisitors) ? stats.recentVisitors : [],
    recentForms: Array.isArray(stats.recentForms) ? stats.recentForms : [],
    topClickedElements: Array.isArray(stats.topClickedElements) ? stats.topClickedElements : [],
    topPages: Array.isArray(stats.topPages)
      ? stats.topPages.map((page) => ({ ...page, count: Number(page.count ?? page.views ?? 0) }))
      : [],
  };
}

async function fetchAnalyticsJson(endpoint: string, query = '') {
  const errors: string[] = [];

  for (const base of analyticsApiBases) {
    const url = `${base}/${endpoint}${query}`;

    try {
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      const contentType = response.headers.get('content-type') || '';

      if (!response.ok || !contentType.includes('application/json')) {
        errors.push(`${url}: ${response.status}`);
        continue;
      }

      return response.json();
    } catch (error) {
      errors.push(`${url}: ${error instanceof Error ? error.message : 'falha na requisicao'}`);
    }
  }

  throw new Error(errors.join(' | '));
}

function downloadJson(data: unknown) {
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  const fileName = `analytics_${new Date().toISOString().split('T')[0]}.json`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
}

function parseFormData(value: string) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

export function StatisticsPage() {
  const [stats, setStats] = useState<Stats>(() => emptyStats());
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');
  const [dataStatus, setDataStatus] = useState('');

  useEffect(() => {
    let active = true;

    async function loadStats() {
      setLoading(true);

      try {
        const data = await fetchAnalyticsJson('stats', `?filter=${dateFilter}`);
        if (!active) return;
        setStats(normalizeStats(data));
        setDataStatus('');
      } catch {
        if (!active) return;
        setStats(emptyStats());
        setDataStatus('Aguardando dados reais da API em /server/api/analytics/stats.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadStats();

    return () => {
      active = false;
    };
  }, [dateFilter]);

  async function exportData() {
    const data = await fetchAnalyticsJson('export').catch(() => stats);
    downloadJson(data);
  }

  const metricCards = [
    { label: 'Visitantes unicos', value: stats.totalVisitors, icon: Users, tone: 'text-blue-400' },
    { label: 'Visualizacoes', value: stats.totalPageViews, icon: Eye, tone: 'text-purple-400' },
    { label: 'Eventos e cliques', value: stats.totalEvents, icon: MousePointer, tone: 'text-amber-400' },
    { label: 'Formularios', value: stats.totalForms, icon: FileText, tone: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-8 px-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard Analytics</h1>
            <p className="text-zinc-400">Estatisticas completas de visitantes e comportamento.</p>
            {dataStatus && <p className="text-amber-400 mt-2">{dataStatus}</p>}
          </div>
          <button
            onClick={exportData}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
            type="button"
          >
            <Download className="w-5 h-5" />
            Exportar dados
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {['all', 'today', 'week', 'month'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                dateFilter === filter ? 'bg-amber-500 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
              type="button"
            >
              {filter === 'all' && 'Todos'}
              {filter === 'today' && 'Hoje'}
              {filter === 'week' && 'Esta semana'}
              {filter === 'month' && 'Este mes'}
            </button>
          ))}
        </div>

        {loading && <div className="text-white text-lg mb-6">Carregando estatisticas...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card className="bg-zinc-900/70 border-zinc-800 p-6" key={card.label}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${card.tone}`} />
                  <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">Total</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                <div className="text-zinc-400 text-sm">{card.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900/60 border-zinc-800 p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              Visitantes por periodo
            </h2>
            <div className="space-y-3 text-sm">
              <p className="flex justify-between text-zinc-400"><span>Hoje</span><strong className="text-white">{stats.visitorsToday}</strong></p>
              <p className="flex justify-between text-zinc-400"><span>Esta semana</span><strong className="text-white">{stats.visitorsThisWeek}</strong></p>
              <p className="flex justify-between text-zinc-400"><span>Este mes</span><strong className="text-white">{stats.visitorsThisMonth}</strong></p>
            </div>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800 p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Taxa de conversao
            </h2>
            <div className="text-4xl font-bold text-white mb-2">{stats.conversionRate.toFixed(2)}%</div>
            <p className="text-zinc-400 text-sm">Formularios divididos por visitantes.</p>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800 p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-amber-500" />
              Tempo medio
            </h2>
            <div className="text-4xl font-bold text-white mb-2">
              {Math.floor(stats.avgTimeOnSite / 60)}m {stats.avgTimeOnSite % 60}s
            </div>
            <p className="text-zinc-400 text-sm">Tempo medio por visitante.</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-zinc-900/60 border-zinc-800 p-6">
            <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-amber-500" />
              Dispositivos
            </h2>
            <div className="space-y-4">
              {stats.deviceTypes.length === 0 && <p className="text-zinc-500">Nenhum dispositivo registrado ainda.</p>}
              {stats.deviceTypes.map((device) => {
                const total = stats.deviceTypes.reduce((sum, item) => sum + Number(item.count || 0), 0);
                const percentage = total > 0 ? (Number(device.count || 0) / total) * 100 : 0;
                const Icon = device.device_type === 'Desktop' ? Monitor : device.device_type === 'Mobile' ? Smartphone : Tablet;

                return (
                  <div key={device.device_type}>
                    <div className="flex justify-between mb-2 text-zinc-300">
                      <span className="flex items-center gap-2"><Icon className="w-4 h-4" />{device.device_type || 'Nao identificado'}</span>
                      <strong className="text-white">{device.count}</strong>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800 p-6">
            <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-500" />
              Navegadores
            </h2>
            <div className="space-y-4">
              {stats.browsers.length === 0 && <p className="text-zinc-500">Nenhum navegador registrado ainda.</p>}
              {stats.browsers.slice(0, 6).map((browser) => (
                <div className="flex justify-between border-b border-zinc-800 pb-3 text-zinc-300" key={browser.browser}>
                  <span>{browser.browser || 'Nao identificado'}</span>
                  <strong className="text-white">{browser.count}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="bg-zinc-900/60 border-zinc-800 p-6 mb-8">
          <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-500" />
            Paginas mais visitadas
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Pagina</th>
                  <th className="text-right text-zinc-400 font-medium py-3 px-4">Visualizacoes</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages.length === 0 && (
                  <tr><td className="text-zinc-500 py-4 px-4" colSpan={2}>Nenhuma pagina registrada ainda.</td></tr>
                )}
                {stats.topPages.slice(0, 10).map((page) => (
                  <tr className="border-b border-zinc-800/50" key={page.page_url}>
                    <td className="text-white py-3 px-4">{page.page_url}</td>
                    <td className="text-white font-bold py-3 px-4 text-right">{page.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="bg-zinc-900/60 border-zinc-800 p-6">
            <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              Visitantes recentes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {stats.recentVisitors.length === 0 && (
                    <tr><td className="text-zinc-500 py-4">Nenhum visitante registrado ainda.</td></tr>
                  )}
                  {stats.recentVisitors.slice(0, 8).map((visitor) => (
                    <tr className="border-b border-zinc-800/50" key={visitor.session_id}>
                      <td className="text-zinc-400 py-3 pr-4 font-mono text-xs">{visitor.session_id?.substring(0, 12) || '-'}</td>
                      <td className="text-white py-3 pr-4">{visitor.device_type || '-'}</td>
                      <td className="text-zinc-300 py-3 pr-4">{visitor.browser || '-'}</td>
                      <td className="text-zinc-400 py-3">{visitor.first_visit ? new Date(visitor.first_visit).toLocaleString('pt-BR') : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800 p-6">
            <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              Formularios recentes
            </h2>
            <div className="space-y-4">
              {stats.recentForms.length === 0 && <p className="text-zinc-500">Nenhum formulario registrado ainda.</p>}
              {stats.recentForms.slice(0, 5).map((form) => (
                <div className="border-b border-zinc-800 pb-4" key={`${form.form_name}-${form.timestamp}`}>
                  <div className="flex justify-between gap-4 mb-2">
                    <strong className="text-white">{form.form_name}</strong>
                    <span className="text-zinc-500 text-sm">{form.timestamp ? new Date(form.timestamp).toLocaleString('pt-BR') : '-'}</span>
                  </div>
                  <pre className="text-xs text-zinc-300 whitespace-pre-wrap">{parseFormData(form.form_data)}</pre>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
