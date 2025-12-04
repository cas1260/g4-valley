# 🔄 Correção do Banco de Dados - Campos Faltantes

## ❌ Problema Identificado

O banco de dados estava com campos faltantes, causando erros:
- `SQLSTATE[HY000]: General error: 1 no such column: page_url`
- `SQLSTATE[HY000]: General error: 1 no such column: click_x`

## ✅ Solução Implementada

Foi criado um **banco de dados completo** com TODOS os campos necessários.

---

## 📊 Estrutura Completa do Banco

### 1. **Tabela `visitors`** (17 campos)
```sql
- id (PRIMARY KEY)
- session_id (UNIQUE)
- first_visit
- last_visit
- total_visits
- user_agent
- browser
- os
- device_type
- screen_width
- screen_height
- language
- timezone
- referrer
- ip_address
- country
- city
```

### 2. **Tabela `page_views`** (6 campos)
```sql
- id (PRIMARY KEY)
- session_id (FOREIGN KEY)
- page_url ✅ ADICIONADO
- page_title ✅ ADICIONADO
- timestamp
- time_spent
```

### 3. **Tabela `events`** (12 campos)
```sql
- id (PRIMARY KEY)
- session_id (FOREIGN KEY)
- event_type
- event_name
- event_data
- click_x ✅ ADICIONADO
- click_y ✅ ADICIONADO
- element_tag ✅ ADICIONADO
- element_id ✅ ADICIONADO
- element_class ✅ ADICIONADO
- page_url ✅ ADICIONADO
- timestamp
```

### 4. **Tabela `form_submissions`** (5 campos)
```sql
- id (PRIMARY KEY)
- session_id (FOREIGN KEY)
- form_name
- form_data
- timestamp
```

### 5. **Tabela `contacts`** (11 campos)
```sql
- id (PRIMARY KEY)
- name
- email
- phone
- company
- service
- message
- ip_address
- user_agent
- created_at
- email_sent
- email_sent_at
```

---

## 🚀 Como Aplicar a Correção

### **OPÇÃO 1: Via Navegador (RECOMENDADO)**

1. **Fazer upload do arquivo:**
   - Arquivo: `recreate-database.php`
   - Destino: `/novidades/recreate-database.php`

2. **Acessar no navegador:**
   ```
   https://swapsoft.com.br/novidades/recreate-database.php
   ```

3. **O script vai:**
   - ✅ Fazer backup do banco antigo
   - ✅ Deletar banco antigo
   - ✅ Criar novo banco com TODOS os campos
   - ✅ Mostrar confirmação visual

4. **Após execução:**
   - Deletar o arquivo `recreate-database.php`
   - Acessar o dashboard: `https://swapsoft.com.br/novidades/statics`

---

### **OPÇÃO 2: Via SSH/Terminal**

```bash
# 1. Acessar pasta do projeto
cd /caminho/para/novidades/server

# 2. Fazer backup do banco antigo
mv analytics.db analytics.db.backup

# 3. Fazer upload do database.php atualizado
# (copiar o arquivo server/database.php)

# 4. Acessar qualquer página do site
# O banco será recriado automaticamente
```

---

## 📋 Arquivos Atualizados

### 1. **`server/database.php`**
- ✅ Estrutura completa de todas as tabelas
- ✅ Todos os campos necessários
- ✅ 9 índices para performance
- ✅ Métodos de salvamento atualizados

### 2. **`recreate-database.php`** (NOVO)
- ✅ Interface visual para recriar banco
- ✅ Backup automático
- ✅ Confirmação de sucesso

### 3. **`migrate-database.php`** (NOVO)
- ✅ Script CLI para migração
- ✅ Verificação de erros

---

## ✅ Verificação Pós-Migração

Após aplicar a correção, verifique:

1. **Dashboard funciona:**
   ```
   https://swapsoft.com.br/novidades/statics
   ```

2. **Sem erros no console:**
   - Abrir DevTools (F12)
   - Verificar aba "Console"
   - Não deve haver erros de SQL

3. **Dados sendo salvos:**
   - Navegar pelo site
   - Clicar em elementos
   - Submeter formulário
   - Ver estatísticas no dashboard

---

## 🔍 Campos Críticos Adicionados

| Tabela | Campo | Uso |
|--------|-------|-----|
| `page_views` | `page_url` | URL da página visitada |
| `page_views` | `page_title` | Título da página |
| `events` | `click_x` | Coordenada X do clique |
| `events` | `click_y` | Coordenada Y do clique |
| `events` | `page_url` | URL onde ocorreu o evento |
| `events` | `element_tag` | Tag HTML do elemento |
| `events` | `element_id` | ID do elemento |
| `events` | `element_class` | Classes do elemento |

---

## 📊 Índices para Performance

```sql
CREATE INDEX idx_visitors_session ON visitors(session_id);
CREATE INDEX idx_pageviews_session ON page_views(session_id);
CREATE INDEX idx_pageviews_timestamp ON page_views(timestamp);
CREATE INDEX idx_events_session ON events(session_id);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_timestamp ON events(timestamp);
CREATE INDEX idx_forms_session ON form_submissions(session_id);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created ON contacts(created_at);
```

---

## 🎯 Resultado Final

Após a migração:
- ✅ Todos os erros de "no such column" corrigidos
- ✅ Dashboard funcionando 100%
- ✅ Analytics capturando todos os dados
- ✅ Heatmap de cliques funcionando
- ✅ Formulário salvando corretamente

---

## 📞 Suporte

Se houver algum problema:
1. Verificar permissões da pasta `server/`
2. Verificar se o arquivo `database.php` foi atualizado
3. Deletar `analytics.db` e deixar recriar automaticamente
4. Verificar logs do PHP no servidor

---

**Data:** 16/11/2025  
**Versão:** 2.0 - Banco Completo  
**Status:** ✅ Pronto para Deploy



