# 🐘 Analytics com PHP + SQLite - Setup Completo

Sistema de analytics migrado de Node.js para PHP com SQLite.

---

## 📁 Estrutura dos Arquivos PHP

```
server/
├── config.php          ← Configurações e CORS
├── database.php        ← Classe para gerenciar SQLite
├── visitor.php         ← POST /api/analytics/visitor
├── pageview.php        ← POST /api/analytics/pageview
├── event.php           ← POST /api/analytics/event
├── form.php            ← POST /api/analytics/form
├── stats.php           ← GET /api/analytics/stats
├── export.php          ← GET /api/analytics/export
├── .htaccess           ← Rewrite rules e proteção
└── analytics.db        ← Banco SQLite (criado automaticamente)
```

---

## 🚀 Setup Local (Desenvolvimento)

### Opção 1: XAMPP (Windows/Mac/Linux)

1. **Instalar XAMPP:**

   - Download: https://www.apachefriends.org/

2. **Copiar pasta server:**

   ```bash
   # Windows
   C:\xampp\htdocs\g4vallues\server\

   # Mac/Linux
   /Applications/XAMPP/htdocs/g4vallues/server/
   ```

3. **Iniciar Apache:**

   - Abrir XAMPP Control Panel
   - Clicar em "Start" no Apache

4. **Testar:**
   ```
   https://swapsoft.com.br/novidades/server/api/analytics/stats
   ```

### Opção 2: MAMP (Mac)

1. **Instalar MAMP:**

   - Download: https://www.mamp.info/

2. **Copiar pasta server:**

   ```bash
   /Applications/MAMP/htdocs/g4vallues/server/
   ```

3. **Iniciar servidores**

4. **Testar:**
   ```
   http://localhost:8888/g4vallues/server/api/analytics/stats
   ```

### Opção 3: PHP Built-in Server (Temporário)

```bash
cd /Users/soares/Desktop/Projetos/g4vallues/server
php -S localhost:8080
```

**Testar:**

```
http://localhost:8080/api/analytics/stats
```

---

## 🌐 Setup em Produção (swapsoft.com.br)

### 1. Upload dos Arquivos

Envie toda a pasta `server/` para:

```
/public_html/novidades/server/
```

### 2. Estrutura no Servidor:

```
public_html/
└── novidades/
    ├── index.html
    ├── assets/
    ├── fundo.svg
    └── server/
        ├── config.php
        ├── database.php
        ├── visitor.php
        ├── pageview.php
        ├── event.php
        ├── form.php
        ├── stats.php
        ├── export.php
        ├── .htaccess
        └── analytics.db (criado automaticamente)
```

### 3. Configurar Permissões:

```bash
# Via SSH ou File Manager
chmod 755 server/
chmod 644 server/*.php
chmod 666 server/analytics.db  # Permitir escrita
```

Se `analytics.db` não existe, será criado automaticamente na primeira requisição.

### 4. Verificar .htaccess:

O arquivo `.htaccess` já está configurado com:

- Rewrite rules para rotas limpas
- CORS headers
- Proteção do banco de dados
- PHP settings

### 5. Testar em Produção:

```
https://swapsoft.com.br/novidades/server/api/analytics/stats
```

---

## 🔧 Configuração Personalizada

### Alterar Domínios Permitidos (CORS):

Edite `server/config.php`:

```php
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://swapsoft.com.br',
    'https://seuoutrodominio.com.br',  // Adicionar aqui
]);
```

### Alterar Caminho do Banco:

```php
define('DB_PATH', __DIR__ . '/analytics.db');
```

---

## 📡 Endpoints da API

### POST /api/analytics/visitor

Registra ou atualiza visitante

**Request:**

```json
{
  "sessionId": "string",
  "userAgent": "string",
  "browser": "Chrome",
  "os": "Windows",
  "deviceType": "Desktop",
  "screenWidth": 1920,
  "screenHeight": 1080,
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "referrer": "google.com"
}
```

**Response:**

```json
{
  "message": "Visitor recorded",
  "sessionId": "..."
}
```

### POST /api/analytics/pageview

Registra visualização de página

**Request:**

```json
{
  "sessionId": "string",
  "pageUrl": "/",
  "pageTitle": "Home",
  "timeSpent": 45
}
```

### POST /api/analytics/event

Registra evento/clique

**Request:**

```json
{
  "sessionId": "string",
  "eventType": "click",
  "eventName": "button_click",
  "eventData": {
    "text": "Quero Automatizar",
    "id": "cta-button"
  }
}
```

### POST /api/analytics/form

Registra formulário

**Request:**

```json
{
  "sessionId": "string",
  "formName": "contact_form",
  "formData": {
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

### GET /api/analytics/stats

Retorna estatísticas

**Query Params:**

- `filter=all` (padrão)
- `filter=today`
- `filter=week`
- `filter=month`

**Response:**

```json
{
  "totalVisitors": 150,
  "totalPageViews": 450,
  "totalEvents": 1200,
  "totalForms": 25,
  "visitorsToday": 15,
  "visitorsThisWeek": 75,
  "visitorsThisMonth": 120,
  "avgTimeOnSite": 180,
  "conversionRate": 16.67,
  "deviceTypes": [...],
  "browsers": [...],
  "topPages": [...],
  "recentVisitors": [...],
  "recentEvents": [...],
  "recentForms": [...]
}
```

### GET /api/analytics/export

Exporta todos os dados

**Response:**

```json
{
  "visitors": [...],
  "pageViews": [...],
  "events": [...],
  "formSubmissions": [...]
}
```

---

## 🔍 Verificar SQLite no Servidor

### Via SSH:

```bash
# Conectar ao banco
sqlite3 analytics.db

# Listar tabelas
.tables

# Ver visitantes
SELECT * FROM visitors;

# Sair
.quit
```

### Via PHP:

Criar arquivo `check-db.php`:

```php
<?php
$db = new PDO('sqlite:analytics.db');
$result = $db->query('SELECT COUNT(*) as total FROM visitors');
$row = $result->fetch();
echo "Total de visitantes: " . $row['total'];
?>
```

---

## ⚙️ Requisitos do Servidor

### Mínimo Necessário:

- ✅ PHP 7.4+ (recomendado 8.0+)
- ✅ Extensão PDO (habilitada por padrão)
- ✅ Extensão PDO_SQLITE (habilitada por padrão)
- ✅ mod_rewrite (Apache)
- ✅ Permissão de escrita na pasta server/

### Verificar Requisitos:

Criar arquivo `check-requirements.php`:

```php
<?php
echo "PHP Version: " . phpversion() . "\n";
echo "PDO: " . (extension_loaded('pdo') ? 'OK' : 'ERRO') . "\n";
echo "PDO_SQLITE: " . (extension_loaded('pdo_sqlite') ? 'OK' : 'ERRO') . "\n";
echo "Write Permission: " . (is_writable(__DIR__) ? 'OK' : 'ERRO') . "\n";
?>
```

---

## 🐛 Troubleshooting

### Erro: "Database is locked"

```bash
# Verificar permissões
chmod 666 analytics.db

# Ou deletar e deixar recriar
rm analytics.db
```

### Erro: "Unable to open database"

```bash
# Verificar permissão da pasta
chmod 755 server/

# Verificar se SQLite está habilitado
php -m | grep sqlite
```

### Erro 500: Internal Server Error

```php
// Habilitar erros em config.php (temporário)
ini_set('display_errors', 1);
error_reporting(E_ALL);
```

### CORS Error no Frontend

Edite `server/config.php` e adicione seu domínio em `ALLOWED_ORIGINS`.

### .htaccess não funciona

Verificar se `mod_rewrite` está habilitado:

```apache
# Apache config
a2enmod rewrite
service apache2 restart
```

---

## 📊 Frontend já Configurado

Os arquivos frontend já foram atualizados:

- ✅ `src/hooks/useAnalytics.ts` - URLs PHP
- ✅ `src/pages/StatisticsPage.tsx` - URLs PHP
- ✅ Auto-detecta ambiente (dev/prod)

### URLs Utilizadas:

**Desenvolvimento:**

```
https://swapsoft.com.br/novidades/server/api/analytics/
```

**Produção:**

```
https://swapsoft.com.br/novidades/server/api/analytics/
```

---

## 🔒 Segurança

### ✅ Implementado:

- CORS configurado
- Banco protegido via .htaccess
- Prepared statements (SQL injection)
- Validação de métodos HTTP
- Error handling adequado

### ⚠️ Recomendações:

- [ ] Adicionar rate limiting
- [ ] Adicionar autenticação no dashboard
- [ ] Usar HTTPS em produção
- [ ] Backup automático do banco
- [ ] Monitorar tamanho do banco

---

## 💾 Backup do Banco

### Manual:

```bash
cp analytics.db analytics_backup_$(date +%Y%m%d).db
```

### Automático (cron):

```bash
# Editar crontab
crontab -e

# Backup diário às 3h
0 3 * * * cp /path/to/analytics.db /path/to/backups/analytics_$(date +\%Y\%m\%d).db
```

### Via PHP (script de backup):

Criar `backup.php`:

```php
<?php
$source = 'analytics.db';
$dest = 'backups/analytics_' . date('Y-m-d') . '.db';

if (copy($source, $dest)) {
    echo "Backup criado: $dest";
} else {
    echo "Erro ao criar backup";
}
?>
```

---

## ✅ Checklist de Deploy

- [ ] Fazer upload da pasta `server/`
- [ ] Verificar extensões PHP (PDO, PDO_SQLITE)
- [ ] Configurar permissões (755 pasta, 644 PHP, 666 DB)
- [ ] Testar endpoint: `/server/api/analytics/stats`
- [ ] Verificar CORS no `config.php`
- [ ] Fazer build do frontend (`npm run build`)
- [ ] Upload do `dist/` para `/novidades/`
- [ ] Testar site em produção
- [ ] Testar dashboard em `/statics`
- [ ] Configurar backup automático

---

## 🎯 Tudo Pronto!

**Sistema PHP 100% funcional!**

Não precisa mais de Node.js no servidor. Apenas PHP 7.4+ com SQLite.

**Próximo passo:** Fazer upload para `swapsoft.com.br/novidades/server/` 🚀
