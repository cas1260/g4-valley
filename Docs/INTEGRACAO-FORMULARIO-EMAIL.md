# Integração Formulário de Contato + E-mail

## 📋 Resumo

Sistema completo de captura de contatos via formulário, salvamento em banco de dados SQLite e envio automático de e-mail.

**Data:** Novembro 2025  
**Status:** ✅ 100% Implementado

---

## 🎯 Funcionalidades Implementadas

### 1. Banco de Dados SQLite
- ✅ Tabela `contacts` criada no `database.php`
- ✅ Campos: nome, e-mail, telefone, empresa, serviço, mensagem, IP, user agent
- ✅ Controle de envio de e-mail (email_sent, email_sent_at)
- ✅ Timestamp automático de criação

### 2. Backend PHP
- ✅ Endpoint `/novidades/server/api/contact` criado
- ✅ Validação de dados obrigatórios
- ✅ Validação de formato de e-mail
- ✅ Salvamento no banco de dados
- ✅ Envio automático de e-mail
- ✅ CORS configurado
- ✅ Tratamento de erros

### 3. Frontend React
- ✅ Formulário atualizado para enviar via API
- ✅ Feedback visual com toast notifications
- ✅ Tratamento de erros
- ✅ Reset automático após sucesso
- ✅ URL da API configurada por ambiente (dev/prod)

---

## 📂 Arquivos Criados/Modificados

### Novos Arquivos
1. **`server/contact.php`** (NOVO)
   - Endpoint principal de contato
   - Validação e salvamento
   - Envio de e-mail

### Arquivos Modificados
2. **`server/database.php`**
   - Tabela `contacts` adicionada
   - Método `saveContact()` criado
   - Método `markEmailSent()` criado

3. **`server/.htaccess`**
   - Rota `api/contact` adicionada

4. **`src/components/CTASection.tsx`**
   - Função `handleSubmit` atualizada para async
   - Integração com API via fetch
   - Tratamento de erros

5. **`INTEGRACAO-FORMULARIO-EMAIL.md`** (ESTE ARQUIVO)
   - Documentação completa

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `contacts`

```sql
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    service TEXT NOT NULL,
    message TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    email_sent INTEGER DEFAULT 0,
    email_sent_at DATETIME
)
```

**Campos:**
- `id`: ID único auto-incremento
- `name`: Nome completo do contato
- `email`: E-mail do contato
- `phone`: Telefone/WhatsApp
- `company`: Empresa (opcional)
- `service`: Serviço de interesse (ia, erp, crm, ecommerce, etc.)
- `message`: Mensagem/desafio descrito
- `ip_address`: IP do visitante
- `user_agent`: Navegador/dispositivo
- `created_at`: Data/hora do contato
- `email_sent`: Flag de e-mail enviado (0/1)
- `email_sent_at`: Data/hora do envio do e-mail

---

## 🔌 API Endpoint

### POST `/novidades/server/api/contact`

**Request Body (JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@empresa.com.br",
  "phone": "(31) 99999-9999",
  "company": "Empresa XYZ",
  "service": "erp",
  "message": "Preciso de um sistema ERP..."
}
```

**Campos Obrigatórios:**
- `name`
- `email`
- `phone`
- `service`

**Campos Opcionais:**
- `company`
- `message`

**Response Success (201):**
```json
{
  "success": true,
  "contactId": 123,
  "emailSent": true,
  "emailError": null,
  "message": "Contato salvo com sucesso e e-mail enviado"
}
```

**Response Error (400/500):**
```json
{
  "error": "Descrição do erro",
  "details": "Detalhes técnicos"
}
```

---

## 📧 E-mail Automático

### Configuração
- **Destinatário:** `cleber@swapsoft.com.br`
- **Remetente:** `Landing Page G4 Valley <noreply@swapsoft.com.br>`
- **Reply-To:** E-mail do contato
- **Formato:** HTML responsivo

### Conteúdo do E-mail
- Cabeçalho visual com gradiente laranja
- Todos os dados do formulário formatados
- Links clicáveis (e-mail, WhatsApp)
- Badge visual para o serviço selecionado
- Data/hora e IP do contato
- ID do contato no banco de dados
- Footer com informações do sistema

### Mapeamento de Serviços
```php
'ia' => 'Agentes de IA'
'erp' => 'Sistema ERP'
'crm' => 'CRM'
'ecommerce' => 'E-commerce'
'integracao' => 'APIs e Integrações'
'consultoria' => 'Consultoria TI'
'outro' => 'Outro / Não sei ainda'
```

---

## 🔒 Segurança

### Validações Implementadas
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de e-mail
- ✅ Prepared statements (SQL injection protection)
- ✅ Sanitização de HTML no e-mail
- ✅ CORS configurado
- ✅ Captura de IP real (considerando proxies)

### Proteções
- ✅ Banco de dados protegido via .htaccess
- ✅ Logs de erro (não exibe detalhes ao usuário)
- ✅ Tratamento de exceções

---

## 🚀 Como Funciona

### Fluxo Completo

1. **Usuário preenche formulário** na landing page
2. **Frontend valida** campos obrigatórios (HTML5)
3. **Frontend envia** dados via POST para `/novidades/server/api/contact`
4. **Backend valida** dados (obrigatórios + formato de e-mail)
5. **Backend salva** no banco de dados SQLite
6. **Backend envia** e-mail para `cleber@swapsoft.com.br`
7. **Backend marca** e-mail como enviado no banco
8. **Backend retorna** resposta de sucesso
9. **Frontend exibe** toast de sucesso
10. **Frontend reseta** formulário

### Em caso de erro:
- Backend retorna erro detalhado
- Frontend exibe toast de erro
- Usuário pode tentar novamente ou usar WhatsApp direto

---

## 🧪 Testando a Integração

### Teste Local (Desenvolvimento)

1. **Iniciar servidor PHP:**
   ```bash
   cd /Users/soares/Desktop/Projetos/g4vallues/server
   php -S localhost:8080
   ```

2. **Iniciar frontend:**
   ```bash
   cd /Users/soares/Desktop/Projetos/g4vallues
   npm run dev
   ```

3. **Preencher formulário** na página
4. **Verificar console** do navegador
5. **Verificar banco de dados:**
   ```bash
   sqlite3 server/analytics.db "SELECT * FROM contacts;"
   ```

### Teste em Produção

1. **Fazer build:**
   ```bash
   npm run build
   ```

2. **Copiar para novidades:**
   ```bash
   rm -rf novidades
   mkdir -p novidades
   cp -r dist/* novidades/
   cp -r server novidades/
   cp public/.htaccess novidades/.htaccess
   ```

3. **Fazer upload** para servidor
4. **Acessar:** `https://swapsoft.com.br/novidades/`
5. **Preencher formulário**
6. **Verificar e-mail** em `cleber@swapsoft.com.br`

---

## 📊 Monitoramento

### Verificar Contatos Salvos

**Via SQLite:**
```bash
sqlite3 server/analytics.db "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;"
```

**Via SQL:**
```sql
-- Todos os contatos
SELECT * FROM contacts ORDER BY created_at DESC;

-- Contatos de hoje
SELECT * FROM contacts WHERE DATE(created_at) = DATE('now');

-- Contatos por serviço
SELECT service, COUNT(*) as total FROM contacts GROUP BY service;

-- E-mails não enviados
SELECT * FROM contacts WHERE email_sent = 0;
```

---

## 🔧 Configurações

### Alterar E-mail de Destino

Editar `server/contact.php` linha 50:
```php
$to = 'cleber@swapsoft.com.br'; // Alterar aqui
```

### Alterar Remetente

Editar `server/contact.php` linha 137:
```php
$headers .= "From: Landing Page G4 Valley <noreply@swapsoft.com.br>\r\n";
```

### URLs da API

**Desenvolvimento:**
```
http://localhost:8080/server/api/contact
```

**Produção:**
```
https://swapsoft.com.br/novidades/server/api/contact
```

---

## ⚠️ Observações Importantes

1. **Função mail() do PHP:**
   - Requer configuração SMTP no servidor
   - Alguns servidores bloqueiam a função `mail()`
   - Se não funcionar, considerar usar PHPMailer ou API de terceiros

2. **Banco de Dados:**
   - SQLite é adequado para volume moderado
   - Para alto volume, considerar MySQL/PostgreSQL

3. **CORS:**
   - Configurado para permitir qualquer origem (*)
   - Em produção, considerar restringir para domínio específico

4. **Logs:**
   - Erros são registrados no log do PHP
   - Verificar `error_log` do servidor

---

## 🎉 Resultado Final

Sistema completo e funcional que:
- ✅ Captura dados do formulário
- ✅ Salva no banco de dados SQLite
- ✅ Envia e-mail formatado automaticamente
- ✅ Fornece feedback visual ao usuário
- ✅ Trata erros adequadamente
- ✅ Registra IP e user agent
- ✅ Controla envio de e-mail

**Status:** ✅ PRONTO PARA USO


