<?php
// Habilitar exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 0); // Não mostrar erros no output
ini_set('log_errors', 1);

// Incluir arquivos necessários
$baseDir = __DIR__;

if (!file_exists($baseDir . '/config.php')) {
    http_response_code(500);
    echo json_encode(['error' => 'Arquivo config.php não encontrado']);
    exit;
}

require_once $baseDir . '/config.php';
require_once $baseDir . '/database.php';
require_once $baseDir . '/smtp-config.php';
require_once $baseDir . '/PHPMailer.php';
require_once $baseDir . '/SMTP.php';
require_once $baseDir . '/PHPMailerException.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Permitir requisições de qualquer origem (CORS)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Tratar requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Apenas aceitar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

try {
    // Obter dados do POST
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Validar dados obrigatórios
    if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['service'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados obrigatórios faltando']);
        exit;
    }
    
    // Validar formato de e-mail
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'E-mail inválido']);
        exit;
    }
    
    // Salvar no banco de dados
    $db = new AnalyticsDB();
    $contactId = $db->saveContact($data);
    
    // Enviar e-mail via SMTP
    $emailSent = false;
    $emailError = '';
    
    try {
        // Criar instância do PHPMailer
        $mail = new PHPMailer(true);
        
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = SMTP_AUTH;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = MAIL_CHARSET;
        
        // Debug (desabilitar em produção)
        $mail->SMTPDebug = MAIL_DEBUG;
        
        // Remetente
        $mail->setFrom(MAIL_FROM_EMAIL, MAIL_FROM_NAME);
        $mail->addReplyTo($data['email'], $data['name']);
        
        // Destinatário
        $mail->addAddress(MAIL_TO_EMAIL, MAIL_TO_NAME);
        
        // Assunto
        $subject = '🎯 Novo Contato G4 Valley - ' . $data['name'];
        $mail->Subject = $subject;
        
        // Mapear serviços
        $services = [
            'ia' => 'Agentes de IA',
            'erp' => 'Sistema ERP',
            'crm' => 'CRM',
            'ecommerce' => 'E-commerce',
            'integracao' => 'APIs e Integrações',
            'consultoria' => 'Consultoria TI',
            'outro' => 'Outro / Não sei ainda'
        ];
        
        $serviceName = $services[$data['service']] ?? $data['service'];
        
        // Corpo do e-mail em HTML
        $message = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #374151; margin-bottom: 5px; }
                .value { color: #1f2937; padding: 10px; background: white; border-left: 3px solid #f59e0b; }
                .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
                .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 5px 10px; border-radius: 5px; font-size: 12px; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1 style='margin: 0; font-size: 24px;'>🎯 Novo Contato G4 Valley</h1>
                    <p style='margin: 10px 0 0 0; opacity: 0.9;'>Landing Page - Agendamento de Conversa</p>
                </div>
                
                <div class='content'>
                    <div class='field'>
                        <div class='label'>👤 Nome Completo:</div>
                        <div class='value'>{$data['name']}</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>📧 E-mail:</div>
                        <div class='value'><a href='mailto:{$data['email']}'>{$data['email']}</a></div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>📱 Telefone/WhatsApp:</div>
                        <div class='value'><a href='https://wa.me/55{$data['phone']}'>{$data['phone']}</a></div>
                    </div>
                    
                    " . (!empty($data['company']) ? "
                    <div class='field'>
                        <div class='label'>🏢 Empresa:</div>
                        <div class='value'>{$data['company']}</div>
                    </div>
                    " : "") . "
                    
                    <div class='field'>
                        <div class='label'>💼 Solução de Interesse:</div>
                        <div class='value'><span class='badge'>{$serviceName}</span></div>
                    </div>
                    
                    " . (!empty($data['message']) ? "
                    <div class='field'>
                        <div class='label'>💬 Mensagem:</div>
                        <div class='value'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
                    </div>
                    " : "") . "
                    
                    <div class='field'>
                        <div class='label'>📅 Data/Hora:</div>
                        <div class='value'>" . date('d/m/Y H:i:s') . "</div>
                    </div>
                    
                    <div class='field'>
                        <div class='label'>🌐 IP:</div>
                        <div class='value'>" . ($db->getRealIpAddress() ?? 'N/A') . "</div>
                    </div>
                </div>
                
                <div class='footer'>
                    <p style='margin: 0;'>📊 ID do Contato: #{$contactId}</p>
                    <p style='margin: 5px 0 0 0;'>Este e-mail foi gerado automaticamente pela Landing Page G4 Valley</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Configurar corpo do e-mail
        $mail->isHTML(true);
        $mail->Body = $message;
        
        // Versão texto alternativa (para clientes que não suportam HTML)
        $mail->AltBody = "Novo Contato G4 Valley\n\n" .
                         "Nome: {$data['name']}\n" .
                         "E-mail: {$data['email']}\n" .
                         "Telefone: {$data['phone']}\n" .
                         (!empty($data['company']) ? "Empresa: {$data['company']}\n" : "") .
                         "Serviço: {$serviceName}\n" .
                         (!empty($data['message']) ? "Mensagem: {$data['message']}\n" : "") .
                         "Data/Hora: " . date('d/m/Y H:i:s') . "\n" .
                         "ID do Contato: #{$contactId}";
        
        // Enviar e-mail
        $mail->send();
        $emailSent = true;
        
        // Marcar e-mail como enviado no banco
        $db->markEmailSent($contactId);
        
    } catch (Exception $e) {
        $emailError = $e->getMessage();
        error_log('Erro ao enviar e-mail via SMTP: ' . $e->getMessage());
    }
    
    // Resposta de sucesso
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'contactId' => $contactId,
        'emailSent' => $emailSent,
        'emailError' => $emailError ?: null,
        'message' => 'Contato salvo com sucesso' . ($emailSent ? ' e e-mail enviado' : '')
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro ao processar contato',
        'details' => $e->getMessage()
    ]);
    error_log('Erro em contact.php: ' . $e->getMessage());
}

