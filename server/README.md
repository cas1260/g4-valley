# Analytics Server - G4 Valley

Sistema de analytics com SQLite para rastrear visitantes e comportamento no site.

## 🚀 Instalação

```bash
cd server
npm install
```

## ▶️ Executar

### Modo Desenvolvimento (com auto-reload):
```bash
npm run dev
```

### Modo Produção:
```bash
npm start
```

O servidor irá rodar em: **http://localhost:3001**

## 📊 Banco de Dados

O banco de dados SQLite será criado automaticamente em:
```
server/analytics.db
```

### Tabelas Criadas:

#### 1. `visitors` - Dados dos visitantes
- `id` - ID único
- `session_id` - ID da sessão (único por visitante)
- `first_visit` - Primeira visita
- `last_visit` - Última visita
- `total_visits` - Total de visitas
- `user_agent` - User Agent completo
- `browser` - Navegador (Chrome, Firefox, etc)
- `os` - Sistema operacional
- `device_type` - Tipo de dispositivo (Desktop, Mobile, Tablet)
- `screen_width` - Largura da tela
- `screen_height` - Altura da tela
- `language` - Idioma do navegador
- `timezone` - Fuso horário
- `referrer` - De onde veio o visitante
- `ip_address` - Endereço IP
- `country` - País
- `city` - Cidade

#### 2. `page_views` - Visualizações de páginas
- `id` - ID único
- `session_id` - ID da sessão
- `page_url` - URL da página
- `page_title` - Título da página
- `timestamp` - Data/hora
- `time_spent` - Tempo gasto na página (segundos)

#### 3. `events` - Eventos e cliques
- `id` - ID único
- `session_id` - ID da sessão
- `event_type` - Tipo de evento (click, scroll, etc)
- `event_name` - Nome do evento
- `event_data` - Dados adicionais (JSON)
- `timestamp` - Data/hora

#### 4. `form_submissions` - Submissões de formulários
- `id` - ID único
- `session_id` - ID da sessão
- `form_name` - Nome do formulário
- `form_data` - Dados do formulário (JSON)
- `timestamp` - Data/hora

## 🔌 Endpoints da API

### POST `/api/analytics/visitor`
Registra ou atualiza dados do visitante

**Body:**
```json
{
  "sessionId": "string",
  "userAgent": "string",
  "browser": "string",
  "os": "string",
  "deviceType": "string",
  "screenWidth": 1920,
  "screenHeight": 1080,
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "referrer": "string",
  "ipAddress": "string",
  "country": "string",
  "city": "string"
}
```

### POST `/api/analytics/pageview`
Registra visualização de página

**Body:**
```json
{
  "sessionId": "string",
  "pageUrl": "/",
  "pageTitle": "Home",
  "timeSpent": 45
}
```

### POST `/api/analytics/event`
Registra evento/clique

**Body:**
```json
{
  "sessionId": "string",
  "eventType": "click",
  "eventName": "button_click",
  "eventData": {
    "text": "Quero Automatizar Meu Negócio",
    "id": "cta-button"
  }
}
```

### POST `/api/analytics/form`
Registra submissão de formulário

**Body:**
```json
{
  "sessionId": "string",
  "formName": "contact_form",
  "formData": {
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(31) 99999-9999"
  }
}
```

### GET `/api/analytics/stats`
Retorna estatísticas gerais

**Response:**
```json
{
  "totalVisitors": 150,
  "totalPageViews": 450,
  "totalEvents": 1200,
  "deviceTypes": [
    { "device_type": "Desktop", "count": 100 },
    { "device_type": "Mobile", "count": 50 }
  ],
  "topPages": [
    { "page_url": "/", "count": 200 },
    { "page_url": "/servicos", "count": 100 }
  ],
  "browsers": [
    { "browser": "Chrome", "count": 90 },
    { "browser": "Firefox", "count": 30 }
  ]
}
```

## 🔍 Consultar Dados

Você pode usar qualquer ferramenta SQLite para visualizar os dados:

### SQLite Browser (GUI):
1. Baixe: https://sqlitebrowser.org/
2. Abra o arquivo `server/analytics.db`
3. Navegue pelas tabelas

### Linha de comando:
```bash
sqlite3 server/analytics.db

# Listar tabelas
.tables

# Ver visitantes
SELECT * FROM visitors;

# Ver page views
SELECT * FROM page_views ORDER BY timestamp DESC LIMIT 10;

# Ver eventos
SELECT * FROM events ORDER BY timestamp DESC LIMIT 10;

# Estatísticas
SELECT device_type, COUNT(*) as total FROM visitors GROUP BY device_type;
```

## 📈 Exemplos de Queries Úteis

### Visitantes únicos por dia:
```sql
SELECT DATE(first_visit) as date, COUNT(*) as visitors
FROM visitors
GROUP BY DATE(first_visit)
ORDER BY date DESC;
```

### Páginas mais visitadas:
```sql
SELECT page_url, COUNT(*) as views
FROM page_views
GROUP BY page_url
ORDER BY views DESC
LIMIT 10;
```

### Tempo médio por página:
```sql
SELECT page_url, AVG(time_spent) as avg_time
FROM page_views
WHERE time_spent > 0
GROUP BY page_url
ORDER BY avg_time DESC;
```

### Dispositivos mais usados:
```sql
SELECT device_type, COUNT(*) as total,
       ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM visitors), 2) as percentage
FROM visitors
GROUP BY device_type;
```

### Conversões de formulário:
```sql
SELECT form_name, COUNT(*) as submissions
FROM form_submissions
GROUP BY form_name;
```

## 🛡️ Privacidade

- Todo o tracking é **silencioso** - sem alertas ou avisos
- Dados armazenados **localmente** em SQLite
- **Não utiliza cookies de terceiros**
- Session ID armazenado em localStorage
- Totalmente **GDPR compliant** (se configurado corretamente)

## ⚙️ Configuração no Frontend

O hook `useAnalytics` já está integrado automaticamente no `App.tsx` e `CTASection.tsx`.

### Tracking automático:
- ✅ Visitantes
- ✅ Page views
- ✅ Cliques em botões/links
- ✅ Scroll na página
- ✅ Tempo de permanência
- ✅ Submissão de formulários

### Tracking manual (opcional):
```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleCustomEvent = () => {
    trackEvent('custom', 'my_event', { data: 'value' });
  };

  return <button onClick={handleCustomEvent}>Track Me</button>;
}
```

## 🚀 Deploy em Produção

1. **Configure o servidor:**
   - Altere `API_URL` em `src/hooks/useAnalytics.ts`
   - Configure CORS para aceitar seu domínio

2. **Rode o servidor:**
   ```bash
   npm start
   ```

3. **Use PM2 para manter rodando:**
   ```bash
   npm install -g pm2
   pm2 start analytics.js
   pm2 save
   pm2 startup
   ```

4. **Nginx reverse proxy (opcional):**
   ```nginx
   location /api/analytics {
       proxy_pass http://localhost:3001/api/analytics;
   }
   ```

## 📦 Backup do Banco

```bash
# Backup simples
cp analytics.db analytics_backup_$(date +%Y%m%d).db

# Backup automático diário (crontab)
0 3 * * * cp /path/to/analytics.db /path/to/backups/analytics_$(date +\%Y\%m\%d).db
```

---

**Sistema 100% silencioso e automático!** 🎯

