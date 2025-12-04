<?php
/**
 * Configuração SMTP para envio de e-mails - ARQUIVO DE EXEMPLO
 * 
 * INSTRUÇÕES:
 * 1. Copie este arquivo para smtp-config.php
 * 2. Preencha as credenciais SMTP reais
 * 3. NÃO commite o arquivo smtp-config.php no Git
 */

// Configurações SMTP
define('SMTP_HOST', 'smtp.gmail.com'); // Alterar para seu servidor SMTP
define('SMTP_PORT', 587); // 587 para TLS, 465 para SSL
define('SMTP_SECURE', 'tls'); // 'tls' ou 'ssl'
define('SMTP_AUTH', true);
define('SMTP_USERNAME', 'seu-email@gmail.com'); // Alterar para seu e-mail
define('SMTP_PASSWORD', 'sua-senha-de-app'); // Alterar para sua senha de app

// Configurações do remetente
define('MAIL_FROM_EMAIL', 'noreply@swapsoft.com.br');
define('MAIL_FROM_NAME', 'Landing Page G4 Valley');

// Destinatário padrão
define('MAIL_TO_EMAIL', 'cleber@swapsoft.com.br');
define('MAIL_TO_NAME', 'Cleber');

// Configurações gerais
define('MAIL_CHARSET', 'UTF-8');
define('MAIL_DEBUG', 0); // 0 = desabilitado, 1 = client, 2 = client e server

/**
 * PROVEDORES SMTP POPULARES:
 * 
 * 1. GMAIL:
 *    Host: smtp.gmail.com
 *    Port: 587 (TLS) ou 465 (SSL)
 *    Secure: tls ou ssl
 *    - Ativar verificação em 2 etapas
 *    - Gerar senha de app: https://myaccount.google.com/apppasswords
 * 
 * 2. OUTLOOK/HOTMAIL:
 *    Host: smtp-mail.outlook.com
 *    Port: 587
 *    Secure: tls
 * 
 * 3. YAHOO:
 *    Host: smtp.mail.yahoo.com
 *    Port: 587
 *    Secure: tls
 * 
 * 4. SENDGRID (Recomendado para produção):
 *    Host: smtp.sendgrid.net
 *    Port: 587
 *    Username: apikey
 *    Password: sua-api-key-do-sendgrid
 *    - Criar conta: https://sendgrid.com/
 *    - 100 e-mails/dia grátis
 * 
 * 5. MAILGUN (Recomendado para produção):
 *    Host: smtp.mailgun.org
 *    Port: 587
 *    Username: postmaster@seu-dominio.mailgun.org
 *    Password: sua-senha-mailgun
 *    - Criar conta: https://www.mailgun.com/
 *    - 5.000 e-mails/mês grátis
 * 
 * 6. SERVIDOR PRÓPRIO/CPANEL:
 *    Host: mail.seudominio.com.br
 *    Port: 587 ou 465
 *    Secure: tls ou ssl
 *    Username: seu-email@seudominio.com.br
 *    Password: senha-do-email
 *    - Verificar configurações no painel do provedor
 */


