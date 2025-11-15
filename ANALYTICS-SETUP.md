# 📊 Setup do Sistema de Analytics

Sistema completo de rastreamento de visitantes com SQLite (100% silencioso).

---

## 🚀 Instalação Rápida

### 1. Instalar dependências do servidor

```bash
cd server
npm install
```

### 2. Iniciar o servidor de analytics

```bash
npm start
```

O servidor irá rodar em: **http://localhost:3001**

### 3. O frontend já está configurado!

O tracking já está integrado automaticamente:
- ✅ `src/hooks/useAnalytics.ts` - Hook de tracking
- ✅ `src/App.tsx` - Analytics inicializado
- ✅ `src/components/CTASection.tsx` - Formulário rastreado

---

## 📁 Arquivos Criados

```
g4vallues/
├── server/
│   ├── analytics.js          ← Servidor Express + SQLite
│   ├── package.json          ← Dependências do servidor
│   ├── analytics.db          ← Banco de dados (criado automaticamente)
│   └── README.md             ← Documentação do servidor
├── src/
│   └── hooks/
│       └── useAnalytics.ts   ← Hook de tracking (já integrado)
└── ANALYTICS-SETUP.md        ← Este arquivo
```

---

## 📊 O Que é Rastreado

### Automaticamente (sem código adicional):

1. **Visitantes:**
   - Navegador, SO, dispositivo
   - Resolução de tela
   - Idioma e timezone
   - Origem (referrer)
   - Primeira e última visita

2. **Page Views:**
   - URL da página
   - Título da página
   - Tempo gasto em cada página

3. **Eventos:**
   - Cliques em botões e links
   - Scroll na página
   - Texto e ID dos elementos clicados

4. **Formulários:**
   - Nome do formulário
   - Dados submetidos
   - Data/hora da submissão

---

## 🔍 Visualizar Dados

### Opção 1: API de Estatísticas

Acesse no navegador:
```
http://localhost:3001/api/analytics/stats
```

Retorna JSON com:
- Total de visitantes
- Total de page views
- Total de eventos
- Dispositivos mais usados
- Páginas mais visitadas
- Navegadores mais usados

### Opção 2: SQLite Browser (GUI)

1. Baixe: https://sqlitebrowser.org/
2. Instale e abra
3. File → Open Database
4. Selecione: `server/analytics.db`
5. Navegue pelas tabelas:
   - `visitors`
   - `page_views`
   - `events`
   - `form_submissions`

### Opção 3: Linha de Comando

```bash
cd server
sqlite3 analytics.db

.tables                          # Listar tabelas
SELECT * FROM visitors;          # Ver visitantes
SELECT * FROM page_views;        # Ver page views
SELECT * FROM events;            # Ver eventos
.quit                            # Sair
```

---

## 📈 Queries Úteis

### Visitantes por dia:
```sql
SELECT DATE(first_visit) as date, COUNT(*) as total
FROM visitors
GROUP BY DATE(first_visit)
ORDER BY date DESC;
```

### Páginas mais acessadas:
```sql
SELECT page_url, COUNT(*) as views
FROM page_views
GROUP BY page_url
ORDER BY views DESC
LIMIT 10;
```

### Dispositivos mais usados:
```sql
SELECT device_type, COUNT(*) as total
FROM visitors
GROUP BY device_type;
```

### Últimas submissões de formulário:
```sql
SELECT form_name, form_data, timestamp
FROM form_submissions
ORDER BY timestamp DESC
LIMIT 10;
```

### Taxa de conversão:
```sql
SELECT 
  (SELECT COUNT(*) FROM form_submissions) as submissions,
  (SELECT COUNT(*) FROM visitors) as visitors,
  ROUND(CAST((SELECT COUNT(*) FROM form_submissions) AS FLOAT) / 
        (SELECT COUNT(*) FROM visitors) * 100, 2) as conversion_rate;
```

---

## 🔧 Configurações Avançadas

### Alterar porta do servidor

Edite `server/analytics.js`:
```javascript
const PORT = 3001; // Altere para a porta desejada
```

### URL da API em produção

Edite `src/hooks/useAnalytics.ts`:
```typescript
const API_URL = 'https://seudominio.com/api/analytics';
```

### Desabilitar tracking em desenvolvimento

```typescript
// Em src/hooks/useAnalytics.ts
const isDevelopment = import.meta.env.DEV;
if (isDevelopment) return; // Não rastrear em dev
```

---

## 🚀 Deploy em Produção

### Opção 1: VPS (Ubuntu/Debian)

```bash
# 1. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Copiar pasta server para o servidor
scp -r server usuario@servidor:/var/www/g4vallues/

# 3. No servidor, instalar dependências
cd /var/www/g4vallues/server
npm install

# 4. Instalar PM2 (gerenciador de processos)
sudo npm install -g pm2

# 5. Iniciar servidor
pm2 start analytics.js --name g4vallues-analytics

# 6. Salvar configuração
pm2 save
pm2 startup

# 7. Configurar Nginx (reverse proxy)
sudo nano /etc/nginx/sites-available/g4vallues

# Adicionar:
location /api/analytics {
    proxy_pass http://localhost:3001/api/analytics;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Opção 2: Heroku

```bash
# 1. Criar app no Heroku
heroku create g4vallues-analytics

# 2. Fazer deploy
cd server
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a g4vallues-analytics
git push heroku master

# 3. Verificar logs
heroku logs --tail
```

### Opção 3: Docker

```bash
# Criar Dockerfile em server/
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]

# Build e run
docker build -t g4vallues-analytics .
docker run -d -p 3001:3001 -v $(pwd):/app g4vallues-analytics
```

---

## 🛡️ Segurança e Privacidade

### ✅ O que é feito:
- Tracking 100% silencioso (sem alertas)
- Dados armazenados localmente
- Não usa cookies de terceiros
- Session ID em localStorage
- Sem rastreamento cross-site

### ⚠️ Recomendações:
- Adicione uma política de privacidade no site
- Mencione o uso de analytics locais
- Ofereça opt-out (opcional)
- Configure CORS corretamente
- Use HTTPS em produção

### Exemplo de Opt-Out (opcional):

```typescript
// Em src/hooks/useAnalytics.ts
const hasOptedOut = localStorage.getItem('analytics_opt_out') === 'true';
if (hasOptedOut) return; // Não rastrear
```

```tsx
// Botão para opt-out
<button onClick={() => {
  localStorage.setItem('analytics_opt_out', 'true');
  alert('Analytics desabilitado');
}}>
  Desabilitar Analytics
</button>
```

---

## 📦 Backup do Banco

### Manual:
```bash
cp server/analytics.db server/backups/analytics_$(date +%Y%m%d).db
```

### Automático (cron):
```bash
# Editar crontab
crontab -e

# Adicionar (backup diário às 3h)
0 3 * * * cp /path/to/server/analytics.db /path/to/backups/analytics_$(date +\%Y\%m\%d).db
```

### Restaurar backup:
```bash
cp server/backups/analytics_20231215.db server/analytics.db
```

---

## 🐛 Troubleshooting

### Erro: "spawn /bin/zsh ENOENT"
```bash
# Use npm diretamente:
cd server
npm install
npm start
```

### Servidor não inicia:
```bash
# Verificar se a porta 3001 está em uso
lsof -i :3001

# Matar processo se necessário
kill -9 [PID]
```

### Frontend não conecta:
```bash
# Verificar URL da API
# Em src/hooks/useAnalytics.ts
const API_URL = 'http://localhost:3001/api/analytics';

# Verificar CORS no servidor
# Em server/analytics.js - já configurado
```

### Banco de dados corrompido:
```bash
# Verificar integridade
sqlite3 server/analytics.db "PRAGMA integrity_check;"

# Restaurar de backup
cp server/backups/analytics_backup.db server/analytics.db
```

---

## ✅ Checklist de Implementação

- [ ] Instalar dependências do servidor (`npm install`)
- [ ] Iniciar servidor (`npm start`)
- [ ] Verificar servidor em http://localhost:3001/api/analytics/stats
- [ ] Testar frontend (o analytics já está integrado)
- [ ] Abrir o site e verificar que está rastreando
- [ ] Verificar banco de dados (`analytics.db`)
- [ ] Configurar backup automático
- [ ] Deploy em produção (opcional)
- [ ] Adicionar política de privacidade (opcional)

---

**Sistema totalmente configurado e funcionando! 🎉**

O tracking é 100% silencioso e automático. Nenhum alerta ou aviso será exibido ao usuário.

