import {
  Calendar,
  Clock,
  Download,
  Eye,
  FileText,
  Globe,
  Monitor,
  MousePointer,
  Smartphone, Tablet,
  TrendingUp,
  Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';

interface Stats {
  totalVisitors: number;
  totalPageViews: number;
  totalEvents: number;
  totalForms: number;
  deviceTypes: { device_type: string; count: number }[];
  topPages: { page_url: string; count: number }[];
  browsers: { browser: string; count: number }[];
  recentVisitors: any[];
  recentPageViews: any[];
  recentEvents: any[];
  recentForms: any[];
  visitorsToday: number;
  visitorsThisWeek: number;
  visitorsThisMonth: number;
  avgTimeOnSite: number;
  conversionRate: number;
  clickHeatmap: { click_x: number; click_y: number; count: number; page_url: string }[];
  topClickedElements: { element_tag: string; element_id: string; element_class: string; event_name: string; clicks: number }[];
  uniqueIPs: { ip_address: string; sessions: number; last_visit: string; device_type: string; browser: string }[];
}

export function StatisticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    fetchStats();
  }, [dateFilter]);

  const fetchStats = async () => {
    try {
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isDevelopment
        ? 'https://swapsoft.com.br/novidades/server/api/analytics/stats'
        : 'https://swapsoft.com.br/novidades/server/api/analytics/stats';
      
      const response = await fetch(`${apiUrl}?filter=${dateFilter}`);
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setLoading(false);
    }
  };

  const exportData = async () => {
    try {
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isDevelopment
        ? 'https://swapsoft.com.br/novidades/server/api/analytics/export'
        : 'https://swapsoft.com.br/novidades/server/api/analytics/export';
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `analytics_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Carregando estatísticas...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Erro ao carregar dados</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-8 px-4">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">📊 Dashboard Analytics</h1>
            <p className="text-zinc-400">Estatísticas completas de visitantes e comportamento</p>
          </div>
          <button
            onClick={exportData}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Exportar Dados
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-4">
          {['all', 'today', 'week', 'month'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                dateFilter === filter
                  ? 'bg-amber-500 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {filter === 'all' && 'Todos'}
              {filter === 'today' && 'Hoje'}
              {filter === 'week' && 'Esta Semana'}
              {filter === 'month' && 'Este Mês'}
            </button>
          ))}
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">Total</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalVisitors}</div>
            <div className="text-zinc-400 text-sm">Visitantes Únicos</div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-purple-500" />
              <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">Views</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalPageViews}</div>
            <div className="text-zinc-400 text-sm">Visualizações de Página</div>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <MousePointer className="w-8 h-8 text-amber-500" />
              <span className="text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded-full">Clicks</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalEvents}</div>
            <div className="text-zinc-400 text-sm">Eventos/Interações</div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-green-500" />
              <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Forms</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalForms || 0}</div>
            <div className="text-zinc-400 text-sm">Formulários Enviados</div>
          </Card>
        </div>

        {/* Métricas Secundárias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-amber-500" />
              <h3 className="text-white font-semibold">Visitantes por Período</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Hoje:</span>
                <span className="text-white font-bold">{stats.visitorsToday || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Esta Semana:</span>
                <span className="text-white font-bold">{stats.visitorsThisWeek || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Este Mês:</span>
                <span className="text-white font-bold">{stats.visitorsThisMonth || 0}</span>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-amber-500" />
              <h3 className="text-white font-semibold">Tempo Médio no Site</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {Math.floor((stats.avgTimeOnSite || 0) / 60)}m {(stats.avgTimeOnSite || 0) % 60}s
            </div>
            <div className="text-zinc-400 text-sm">Por visitante</div>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="text-white font-semibold">Taxa de Conversão</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {(stats.conversionRate || 0).toFixed(2)}%
            </div>
            <div className="text-zinc-400 text-sm">Formulários / Visitantes</div>
          </Card>
        </div>

        {/* Dispositivos e Navegadores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Dispositivos */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-amber-500" />
              Dispositivos Mais Usados
            </h3>
            <div className="space-y-4">
              {stats.deviceTypes?.map((device, index) => {
                const total = stats.deviceTypes.reduce((sum, d) => sum + d.count, 0);
                const percentage = (device.count / total) * 100;
                const Icon = device.device_type === 'Desktop' ? Monitor : 
                           device.device_type === 'Mobile' ? Smartphone : Tablet;
                
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-zinc-400" />
                        <span className="text-zinc-300">{device.device_type}</span>
                      </div>
                      <div className="text-white font-bold">{device.count}</div>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Navegadores */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-500" />
              Navegadores Mais Usados
            </h3>
            <div className="space-y-4">
              {stats.browsers?.slice(0, 5).map((browser, index) => {
                const total = stats.browsers.reduce((sum, b) => sum + b.count, 0);
                const percentage = (browser.count / total) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-zinc-300">{browser.browser}</span>
                      <span className="text-white font-bold">{browser.count}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Páginas Mais Visitadas */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-500" />
            Páginas Mais Visitadas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">#</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Página</th>
                  <th className="text-right text-zinc-400 font-medium py-3 px-4">Visualizações</th>
                  <th className="text-right text-zinc-400 font-medium py-3 px-4">%</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages?.slice(0, 10).map((page, index) => {
                  const percentage = (page.count / stats.totalPageViews) * 100;
                  return (
                    <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="text-zinc-500 py-3 px-4">{index + 1}</td>
                      <td className="text-white py-3 px-4">{page.page_url}</td>
                      <td className="text-white font-bold py-3 px-4 text-right">{page.count}</td>
                      <td className="text-amber-500 py-3 px-4 text-right">{percentage.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Visitantes Recentes */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            Visitantes Recentes
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Session ID</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Dispositivo</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Navegador</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">SO</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Primeira Visita</th>
                  <th className="text-right text-zinc-400 font-medium py-3 px-4">Visitas</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentVisitors?.slice(0, 10).map((visitor, index) => (
                  <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="text-zinc-400 py-3 px-4 font-mono text-xs">
                      {visitor.session_id.substring(0, 12)}...
                    </td>
                    <td className="text-white py-3 px-4">{visitor.device_type}</td>
                    <td className="text-white py-3 px-4">{visitor.browser}</td>
                    <td className="text-white py-3 px-4">{visitor.os}</td>
                    <td className="text-zinc-400 py-3 px-4">
                      {new Date(visitor.first_visit).toLocaleString('pt-BR')}
                    </td>
                    <td className="text-amber-500 font-bold py-3 px-4 text-right">
                      {visitor.total_visits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* IPs Únicos */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-500" />
            Endereços IP Únicos
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Endereço IP</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Sessões</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Dispositivo</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Navegador</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Último Acesso</th>
                </tr>
              </thead>
              <tbody>
                {stats.uniqueIPs?.slice(0, 20).map((ip, index) => (
                  <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="text-amber-500 py-3 px-4 font-mono">{ip.ip_address}</td>
                    <td className="text-white font-bold py-3 px-4">{ip.sessions}</td>
                    <td className="text-zinc-300 py-3 px-4">{ip.device_type}</td>
                    <td className="text-zinc-300 py-3 px-4">{ip.browser}</td>
                    <td className="text-zinc-400 py-3 px-4">
                      {new Date(ip.last_visit).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Elementos Mais Clicados */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-amber-500" />
            Elementos Mais Clicados
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Elemento</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">ID</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Classes</th>
                  <th className="text-right text-zinc-400 font-medium py-3 px-4">Cliques</th>
                </tr>
              </thead>
              <tbody>
                {stats.topClickedElements?.map((element, index) => (
                  <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="text-amber-500 py-3 px-4 font-mono">
                      &lt;{element.element_tag}&gt;
                    </td>
                    <td className="text-zinc-300 py-3 px-4 text-xs">
                      {element.element_id || '-'}
                    </td>
                    <td className="text-zinc-400 py-3 px-4 text-xs max-w-md truncate">
                      {element.element_class || '-'}
                    </td>
                    <td className="text-white font-bold py-3 px-4 text-right">{element.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mapa de Calor de Cliques */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-red-500" />
            Mapa de Calor - Posições de Cliques
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Posição X</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Posição Y</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Página</th>
                  <th className="text-right text-zinc-400 font-medium py-3 px-4">Cliques</th>
                </tr>
              </thead>
              <tbody>
                {stats.clickHeatmap?.slice(0, 20).map((click, index) => (
                  <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="text-blue-400 py-3 px-4 font-mono">{click.click_x}px</td>
                    <td className="text-green-400 py-3 px-4 font-mono">{click.click_y}px</td>
                    <td className="text-zinc-300 py-3 px-4">{click.page_url}</td>
                    <td className="text-right py-3 px-4">
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold">
                        {click.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Eventos Recentes */}
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-amber-500" />
            Eventos/Cliques Recentes (Detalhado)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Tipo</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Elemento</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Posição (X, Y)</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Página</th>
                  <th className="text-left text-zinc-400 font-medium py-3 px-4">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEvents?.slice(0, 20).map((event, index) => (
                  <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="text-amber-500 py-3 px-4">{event.event_type}</td>
                    <td className="text-white py-3 px-4">
                      {event.element_tag && (
                        <span className="font-mono text-xs">
                          &lt;{event.element_tag}
                          {event.element_id && ` id="${event.element_id}"`}&gt;
                        </span>
                      )}
                      {!event.element_tag && '-'}
                    </td>
                    <td className="text-zinc-300 py-3 px-4">
                      {event.click_x && event.click_y ? (
                        <span className="font-mono text-xs">
                          <span className="text-blue-400">{event.click_x}</span>,{' '}
                          <span className="text-green-400">{event.click_y}</span>
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="text-zinc-400 py-3 px-4 text-xs">
                      {event.page_url || '-'}
                    </td>
                    <td className="text-zinc-400 py-3 px-4">
                      {new Date(event.timestamp).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Formulários Submetidos */}
        {stats.recentForms && stats.recentForms.length > 0 && (
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              Formulários Enviados Recentemente
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left text-zinc-400 font-medium py-3 px-4">Formulário</th>
                    <th className="text-left text-zinc-400 font-medium py-3 px-4">Dados</th>
                    <th className="text-left text-zinc-400 font-medium py-3 px-4">Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentForms.map((form, index) => (
                    <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="text-green-500 py-3 px-4 font-semibold">{form.form_name}</td>
                      <td className="text-zinc-300 py-3 px-4">
                        <pre className="text-xs max-w-2xl overflow-x-auto">
                          {JSON.stringify(JSON.parse(form.form_data), null, 2)}
                        </pre>
                      </td>
                      <td className="text-zinc-400 py-3 px-4">
                        {new Date(form.timestamp).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

