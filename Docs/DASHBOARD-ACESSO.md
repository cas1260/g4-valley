# 📊 Dashboard de Analytics - Acesso

Dashboard completo para visualizar todas as estatísticas coletadas.

---

## 🌐 Como Acessar

### URL do Dashboard:
```
http://localhost:3000/statics
```

**Ou em produção:**
```
https://swapsoft.com.br/novidades/statics
```

---

## 📊 O Que o Dashboard Exibe

### 1. Métricas Principais (Cards no Topo):
- ✅ **Visitantes Únicos** - Total de pessoas que visitaram
- ✅ **Visualizações de Página** - Total de páginas visualizadas
- ✅ **Eventos/Interações** - Total de cliques e interações
- ✅ **Formulários Enviados** - Total de leads capturados

### 2. Métricas por Período:
- Visitantes Hoje
- Visitantes Esta Semana
- Visitantes Este Mês

### 3. Métricas de Engajamento:
- **Tempo Médio no Site** - Quanto tempo os visitantes ficam
- **Taxa de Conversão** - % de visitantes que enviam formulário

### 4. Análise de Dispositivos:
- Desktop (%)
- Mobile (%)
- Tablet (%)

### 5. Navegadores Mais Usados:
- Chrome
- Firefox
- Safari
- Edge
- Opera

### 6. Páginas Mais Visitadas:
- URL da página
- Número de visualizações
- Porcentagem do total

### 7. Visitantes Recentes:
- Session ID
- Dispositivo usado
- Navegador
- Sistema Operacional
- Primeira visita
- Total de visitas

### 8. Eventos/Cliques Recentes:
- Tipo de evento (click, scroll, etc)
- Nome do evento
- Dados adicionais (texto clicado, elemento, etc)
- Data/hora

### 9. Formulários Enviados:
- Nome do formulário
- Dados completos submetidos
- Data/hora de envio

---

## 🔄 Filtros Disponíveis

Você pode filtrar todos os dados por período:

- **Todos** - Todo o histórico
- **Hoje** - Apenas hoje
- **Esta Semana** - Últimos 7 dias
- **Este Mês** - Últimos 30 dias

---

## 💾 Exportar Dados

Clique no botão **"Exportar Dados"** no canto superior direito.

Isso irá gerar um arquivo JSON com:
- Todos os visitantes
- Todas as page views
- Todos os eventos
- Todos os formulários

**Arquivo gerado:**
```
analytics_2024-01-15.json
```

---

## 🚀 Setup Inicial

### 1. Certifique-se que o servidor está rodando:

```bash
cd server
npm start
```

Você verá:
```
Analytics server running on http://localhost:3001
```

### 2. Inicie o frontend:

```bash
# Na raiz do projeto
npm run dev
```

### 3. Acesse o dashboard:

```
http://localhost:3000/statics
```

---

## 📈 Interpretando os Dados

### Taxa de Conversão:
```
(Formulários Enviados / Visitantes Únicos) × 100
```

**Exemplo:**
- 50 visitantes
- 5 formulários enviados
- Taxa de conversão: 10%

### Tempo Médio no Site:
- Média de tempo que cada visitante passa navegando
- Calculado com base no tempo em cada página

### Dispositivos:
- **Desktop** - Computadores
- **Mobile** - Smartphones
- **Tablet** - iPads e tablets Android

---

## 🔒 Segurança do Dashboard

### ⚠️ IMPORTANTE: Proteger o Dashboard

O dashboard exibe dados sensíveis. **Recomendações:**

### 1. Adicionar Senha de Acesso:

Crie um componente de autenticação:

```tsx
// src/components/ProtectedRoute.tsx
import { useState } from 'react';

export function ProtectedRoute({ children }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    if (password === 'SUA_SENHA_AQUI') {
      setAuthenticated(true);
      localStorage.setItem('dashboard_auth', 'true');
    } else {
      alert('Senha incorreta');
    }
  };

  if (authenticated || localStorage.getItem('dashboard_auth') === 'true') {
    return children;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg">
        <h2 className="text-white text-2xl mb-4">Acesso Restrito</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-zinc-800 text-white rounded"
          placeholder="Senha"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-amber-500 text-white p-3 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
```

Depois, proteja a rota:

```tsx
// src/main.tsx
<Route 
  path="/statics" 
  element={
    <ProtectedRoute>
      <StatisticsPage />
    </ProtectedRoute>
  } 
/>
```

### 2. Usar Autenticação JWT:

Para produção, use um sistema de autenticação mais robusto.

### 3. Configurar Nginx (Produção):

```nginx
location /novidades/statics {
    auth_basic "Dashboard Analytics";
    auth_basic_user_file /etc/nginx/.htpasswd;
    # ... resto da config
}
```

Criar senha:
```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

---

## 📱 Dashboard Responsivo

O dashboard é totalmente responsivo:
- **Desktop** - Layout completo com todas as tabelas
- **Tablet** - Layout otimizado
- **Mobile** - Scroll horizontal nas tabelas grandes

---

## 🔄 Auto-Refresh (Opcional)

Para atualizar automaticamente os dados:

```tsx
// Adicionar em StatisticsPage.tsx
useEffect(() => {
  const interval = setInterval(() => {
    fetchStats();
  }, 60000); // Atualizar a cada 1 minuto

  return () => clearInterval(interval);
}, []);
```

---

## 📊 Queries SQL Úteis (Diretamente no Banco)

Se quiser queries mais avançadas:

```bash
cd server
sqlite3 analytics.db
```

### Visitantes por hora do dia:
```sql
SELECT strftime('%H', first_visit) as hour, COUNT(*) as visitors
FROM visitors
GROUP BY hour
ORDER BY hour;
```

### Origem dos visitantes:
```sql
SELECT referrer, COUNT(*) as count
FROM visitors
WHERE referrer != 'Direct'
GROUP BY referrer
ORDER BY count DESC;
```

### Jornada do visitante (páginas visitadas por sessão):
```sql
SELECT session_id, GROUP_CONCAT(page_url, ' -> ') as journey
FROM page_views
GROUP BY session_id
LIMIT 10;
```

### Taxa de rejeição (1 página e saiu):
```sql
SELECT 
  COUNT(CASE WHEN page_count = 1 THEN 1 END) as single_page_visits,
  COUNT(*) as total_visits,
  ROUND(COUNT(CASE WHEN page_count = 1 THEN 1 END) * 100.0 / COUNT(*), 2) as bounce_rate
FROM (
  SELECT session_id, COUNT(*) as page_count
  FROM page_views
  GROUP BY session_id
);
```

---

## 🐛 Troubleshooting

### Dashboard não carrega:
1. Verificar se o servidor está rodando:
   ```bash
   curl http://localhost:3001/api/analytics/stats
   ```

2. Verificar console do navegador (F12)

3. Verificar CORS no servidor

### Dados não aparecem:
1. Verificar se tem dados no banco:
   ```bash
   sqlite3 server/analytics.db "SELECT COUNT(*) FROM visitors;"
   ```

2. Acessar o site principal para gerar dados

3. Verificar logs do servidor

### Erro 404 na rota /statics:
1. Verificar se `react-router-dom` está instalado
2. Verificar se o `BrowserRouter` está configurado
3. Limpar cache do navegador

---

## 📦 Dependências Instaladas

```json
{
  "react-router-dom": "^6.x.x"
}
```

---

## ✅ Checklist

- [ ] Servidor analytics rodando (porta 3001)
- [ ] Frontend rodando (porta 3000)
- [ ] Acessar dashboard em `/statics`
- [ ] Verificar se os dados aparecem
- [ ] Testar filtros (Hoje, Semana, Mês)
- [ ] Testar exportação de dados
- [ ] Adicionar proteção por senha (recomendado)
- [ ] Configurar auto-refresh (opcional)

---

## 🎯 Próximos Passos

1. **Acesse o dashboard:**
   ```
   http://localhost:3000/statics
   ```

2. **Analise os dados coletados**

3. **Exporte relatórios** quando necessário

4. **Proteja com senha** antes de ir para produção

5. **Configure backup** do banco de dados

---

**Dashboard completo e funcional! 📊🚀**

Todos os dados coletados estão sendo exibidos de forma visual e organizada.

