# Configuração SMTP para Envio de E-mails

## 📋 Resumo

Sistema de envio de e-mails usando PHPMailer com autenticação SMTP, substituindo a função `mail()` do PHP.

**Data:** Novembro 2025  
**Status:** ✅ 100% Implementado

---

## 🎯 O Que Foi Implementado

### 1. PHPMailer
- ✅ Biblioteca PHPMailer baixada (3 arquivos)
- ✅ Suporte a SMTP autenticado
- ✅ Suporte a TLS/SSL
- ✅ E-mails HTML + texto alternativo

### 2. Configuração SMTP
- ✅ Arquivo `smtp-config.php` criado
- ✅ Arquivo exemplo `smtp-config.example.php`
- ✅ Credenciais protegidas via `.gitignore`
- ✅ Suporte a múltiplos provedores

### 3. Integração
- ✅ `contact.php` atualizado para usar PHPMailer
- ✅ Tratamento de erros SMTP
- ✅ Logs de erro detalhados
- ✅ Versão texto alternativa do e-mail

---

## 📂 Arquivos Criados/Modificados

### Novos Arquivos
1. **`server/PHPMailer.php`** - Biblioteca principal
2. **`server/SMTP.php`** - Classe SMTP
3. **`server/PHPMailerException.php`** - Exceções
4. **`server/smtp-config.php`** - Configurações SMTP (NÃO COMMITAR)
5. **`server/smtp-config.example.php`** - Exemplo de configuração
6. **`SMTP-SETUP.md`** - Esta documentação

### Arquivos Modificados
7. **`server/contact.php`** - Atualizado para usar PHPMailer
8. **`.gitignore`** - Proteger smtp-config.php

---

## ⚙️ Configuração Passo a Passo

### Passo 1: Copiar Arquivo de Configuração

```bash
cd /Users/soares/Desktop/Projetos/g4vallues/server
cp smtp-config.example.php smtp-config.php
```

### Passo 2: Editar Credenciais SMTP

Abra `server/smtp-config.php` e configure:

```php
// Servidor SMTP
define('SMTP_HOST', 'smtp.gmail.com'); // Seu servidor SMTP
define('SMTP_PORT', 587); // Porta (587 TLS ou 465 SSL)
define('SMTP_SECURE', 'tls'); // 'tls' ou 'ssl'
define('SMTP_AUTH', true);
define('SMTP_USERNAME', 'seu-email@gmail.com'); // Seu e-mail
define('SMTP_PASSWORD', 'sua-senha-de-app'); // Senha de app

// Remetente
define('MAIL_FROM_EMAIL', 'noreply@swapsoft.com.br');
define('MAIL_FROM_NAME', 'Landing Page G4 Valley');

// Destinatário
define('MAIL_TO_EMAIL', 'cleber@swapsoft.com.br');
define('MAIL_TO_NAME', 'Cleber');
```

---

## 🔐 Configuração por Provedor

### Gmail (Recomendado para Testes)

**1. Ativar Verificação em 2 Etapas:**
- Acesse: https://myaccount.google.com/security
- Ative a verificação em 2 etapas

**2. Gerar Senha de App:**
- Acesse: https://myaccount.google.com/apppasswords
- Selecione "App: E-mail" e "Dispositivo: Outro"
- Copie a senha gerada (16 caracteres)

**3. Configurar:**
```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', 'seu-email@gmail.com');
define('SMTP_PASSWORD', 'xxxx xxxx xxxx xxxx'); // Senha de app
```

---

### SendGrid (Recomendado para Produção)

**1. Criar Conta:**
- Acesse: https://sendgrid.com/
- Plano gratuito: 100 e-mails/dia

**2. Gerar API Key:**
- Dashboard → Settings → API Keys
- Create API Key → Full Access
- Copie a chave gerada

**3. Configurar:**
```php
define('SMTP_HOST', 'smtp.sendgrid.net');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', 'apikey'); // Literal "apikey"
define('SMTP_PASSWORD', 'SG.xxxxxxxxxxxxxxxxx'); // Sua API key
```

---

### Mailgun (Recomendado para Produção)

**1. Criar Conta:**
- Acesse: https://www.mailgun.com/
- Plano gratuito: 5.000 e-mails/mês

**2. Obter Credenciais:**
- Dashboard → Sending → Domain Settings
- Copie SMTP Credentials

**3. Configurar:**
```php
define('SMTP_HOST', 'smtp.mailgun.org');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', 'postmaster@seu-dominio.mailgun.org');
define('SMTP_PASSWORD', 'sua-senha-mailgun');
```

---

### Servidor Próprio / cPanel

**1. Obter Configurações:**
- Acesse cPanel → E-mail → Contas de E-mail
- Clique em "Configurar Cliente de E-mail"
- Copie configurações SMTP

**2. Configurar:**
```php
define('SMTP_HOST', 'mail.seudominio.com.br');
define('SMTP_PORT', 587); // Ou 465
define('SMTP_SECURE', 'tls'); // Ou 'ssl'
define('SMTP_USERNAME', 'seu-email@seudominio.com.br');
define('SMTP_PASSWORD', 'senha-do-email');
```

---

## 🧪 Testando o Envio

### Teste Local

**1. Iniciar servidor PHP:**
```bash
cd /Users/soares/Desktop/Projetos/g4vallues/server
php -S localhost:8080
```

**2. Testar endpoint:**
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Local",
    "email": "teste@exemplo.com",
    "phone": "(31) 99999-9999",
    "service": "erp",
    "message": "Teste de envio SMTP"
  }'
```

**3. Verificar resposta:**
```json
{
  "success": true,
  "contactId": 1,
  "emailSent": true,
  "emailError": null,
  "message": "Contato salvo com sucesso e e-mail enviado"
}
```

### Teste em Produção

**1. Fazer build:**
```bash
cd /Users/soares/Desktop/Projetos/g4vallues
npm run build
```

**2. Copiar arquivos:**
```bash
rm -rf novidades
mkdir -p novidades
cp -r dist/* novidades/
cp -r server novidades/
cp public/.htaccess novidades/.htaccess
```

**3. Fazer upload** para servidor

**4. Preencher formulário** em: `https://swapsoft.com.br/novidades/`

**5. Verificar e-mail** em: `cleber@swapsoft.com.br`

---

## 🔍 Debug e Solução de Problemas

### Ativar Debug SMTP

Edite `server/smtp-config.php`:
```php
define('MAIL_DEBUG', 2); // 0=off, 1=client, 2=client+server
```

### Erros Comuns

**1. "SMTP connect() failed"**
- Verificar firewall/porta bloqueada
- Testar com telnet: `telnet smtp.gmail.com 587`
- Verificar se o servidor permite conexões SMTP

**2. "Invalid credentials"**
- Verificar username/password
- Gmail: usar senha de app, não senha da conta
- Verificar se 2FA está ativado (Gmail)

**3. "Could not authenticate"**
- Verificar SMTP_AUTH = true
- Verificar credenciais corretas
- Testar com outro provedor

**4. "Connection timed out"**
- Firewall bloqueando porta
- Provedor bloqueando SMTP
- Usar porta alternativa (465 SSL)

### Verificar Logs

**Logs do PHP:**
```bash
tail -f /var/log/php_errors.log
```

**Logs do servidor:**
```bash
tail -f /var/log/apache2/error.log
# ou
tail -f /var/log/nginx/error.log
```

---

## 🔒 Segurança

### Boas Práticas

1. ✅ **Nunca commitar credenciais**
   - `smtp-config.php` está no `.gitignore`
   - Usar variáveis de ambiente em produção

2. ✅ **Usar senhas de app**
   - Gmail: senha de app, não senha da conta
   - SendGrid/Mailgun: API keys com permissões mínimas

3. ✅ **Limitar taxa de envio**
   - Implementar rate limiting
   - Prevenir spam/abuso

4. ✅ **Validar dados**
   - Validação de e-mail implementada
   - Sanitização de HTML implementada

5. ✅ **Logs seguros**
   - Não logar senhas
   - Logs apenas em ambiente de desenvolvimento

---

## 📊 Monitoramento

### Verificar E-mails Enviados

**Via Banco de Dados:**
```sql
-- E-mails enviados com sucesso
SELECT * FROM contacts WHERE email_sent = 1 ORDER BY email_sent_at DESC;

-- E-mails não enviados
SELECT * FROM contacts WHERE email_sent = 0 ORDER BY created_at DESC;

-- Estatísticas
SELECT 
  COUNT(*) as total,
  SUM(email_sent) as enviados,
  COUNT(*) - SUM(email_sent) as falhas
FROM contacts;
```

### Logs de Envio

Os erros são registrados automaticamente:
```php
error_log('Erro ao enviar e-mail via SMTP: ' . $e->getMessage());
```

---

## 🚀 Recomendações para Produção

### 1. Usar Serviço de E-mail Transacional

**SendGrid** ou **Mailgun** são recomendados porque:
- ✅ Alta taxa de entrega
- ✅ Não bloqueados por spam filters
- ✅ Estatísticas e monitoramento
- ✅ Planos gratuitos generosos
- ✅ APIs robustas

### 2. Configurar SPF, DKIM e DMARC

Se usar domínio próprio:
- Configurar registros DNS SPF
- Configurar DKIM no provedor SMTP
- Configurar política DMARC

### 3. Implementar Fila de E-mails

Para alto volume:
- Usar Redis/RabbitMQ
- Processar e-mails em background
- Retry automático em caso de falha

### 4. Monitorar Taxa de Entrega

- Verificar bounces
- Monitorar spam complaints
- Acompanhar open/click rates

---

## 📝 Checklist de Deploy

Antes de fazer deploy:

- [ ] Copiar `smtp-config.example.php` para `smtp-config.php`
- [ ] Configurar credenciais SMTP reais
- [ ] Testar envio localmente
- [ ] Desabilitar debug (`MAIL_DEBUG = 0`)
- [ ] Verificar `.gitignore` protegendo credenciais
- [ ] Fazer backup do banco de dados
- [ ] Testar em produção
- [ ] Verificar recebimento do e-mail
- [ ] Monitorar logs por 24h

---

## 🎉 Resultado Final

Sistema completo de envio de e-mails:
- ✅ PHPMailer integrado
- ✅ SMTP autenticado
- ✅ Suporte a múltiplos provedores
- ✅ E-mails HTML profissionais
- ✅ Tratamento de erros robusto
- ✅ Credenciais protegidas
- ✅ Debug configurável
- ✅ Logs detalhados

**Status:** ✅ PRONTO PARA CONFIGURAÇÃO E USO


