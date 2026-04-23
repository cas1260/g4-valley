<?php
use PHPMailer\PHPMailer\PHPMailer;

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

$baseDir = __DIR__;

require_once $baseDir . '/config.php';
require_once $baseDir . '/database.php';
require_once $baseDir . '/smtp-config.php';
require_once $baseDir . '/PHPMailer.php';
require_once $baseDir . '/SMTP.php';
require_once $baseDir . '/PHPMailerException.php';

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metodo nao permitido']);
    exit;
}

function cleanValue($value) {
    return trim((string)($value ?? ''));
}

function firstValue($data, $keys, $fallback = '') {
    foreach ($keys as $key) {
        if (isset($data[$key]) && cleanValue($data[$key]) !== '') {
            return cleanValue($data[$key]);
        }
    }

    return $fallback;
}

function htmlValue($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

try {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Dados invalidos']);
        exit;
    }

    $name = firstValue($data, ['name', 'nome'], 'Nao informado');
    $company = firstValue($data, ['company', 'empresa'], 'Nao informada');
    $phone = firstValue($data, ['phone', 'contato', 'telefone', 'whatsapp'], 'Nao informado');
    $email = firstValue($data, ['email']);
    $service = firstValue($data, ['service', 'prioridade'], 'Quero organizar a empresa toda');
    $message = firstValue($data, ['message', 'necessidade'], 'Nao informado');
    $briefing = firstValue($data, ['briefing', 'resumo']);

    if ($name === 'Nao informado' && $phone === 'Nao informado' && $message === 'Nao informado') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Informe ao menos nome, contato ou mensagem']);
        exit;
    }

    $replyEmail = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null;
    $storedEmail = $replyEmail ?: MAIL_FROM_EMAIL;
    $contactId = null;
    $databaseError = null;

    try {
        $db = new AnalyticsDB();
        $contactId = $db->saveContact([
            'name' => $name,
            'email' => $storedEmail,
            'phone' => $phone,
            'company' => $company,
            'service' => $service,
            'message' => $message,
        ]);
    } catch (Throwable $e) {
        $databaseError = $e->getMessage();
        error_log('Erro ao salvar contato no banco: ' . $databaseError);
    }

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = SMTP_AUTH;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = MAIL_CHARSET;
    $mail->SMTPDebug = MAIL_DEBUG;

    $mail->setFrom(MAIL_FROM_EMAIL, MAIL_FROM_NAME);
    if ($replyEmail !== null) {
        $mail->addReplyTo($replyEmail, $name);
    }
    $mail->addAddress(MAIL_TO_EMAIL, MAIL_TO_NAME);

    $mail->Subject = 'Novo pedido de demonstracao WebFinan - ' . $name;

    $safeName = htmlValue($name);
    $safeCompany = htmlValue($company);
    $safePhone = htmlValue($phone);
    $safeEmail = htmlValue($email !== '' ? $email : 'Nao informado');
    $safeService = htmlValue($service);
    $safeMessage = nl2br(htmlValue($message));
    $safeBriefing = $briefing !== '' ? nl2br(htmlValue($briefing)) : '';
    $safeDate = date('d/m/Y H:i:s');
    $safeContactId = $contactId !== null ? '#' . htmlValue($contactId) : 'Nao gravado';

    $mail->isHTML(true);
    $mail->Body = "
<!DOCTYPE html>
<html lang='pt-BR'>
<head>
  <meta charset='UTF-8'>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937; background: #f3f4f6; }
    .container { max-width: 640px; margin: 0 auto; padding: 24px; }
    .header { background: #0a0d0b; color: #f4f0e7; padding: 24px; border-top: 4px solid #22f2a6; }
    .content { background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 700; color: #111827; margin-bottom: 4px; }
    .value { padding: 10px 12px; background: #f9fafb; border-left: 3px solid #22f2a6; }
    .footer { color: #6b7280; font-size: 12px; padding: 16px 0 0; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1 style='margin:0'>Novo pedido de demonstracao WebFinan</h1>
      <p style='margin:8px 0 0'>Formulario enviado pelo site webfinan.com.br</p>
    </div>
    <div class='content'>
      <div class='field'><div class='label'>Nome</div><div class='value'>{$safeName}</div></div>
      <div class='field'><div class='label'>Empresa</div><div class='value'>{$safeCompany}</div></div>
      <div class='field'><div class='label'>Contato</div><div class='value'>{$safePhone}</div></div>
      <div class='field'><div class='label'>E-mail</div><div class='value'>{$safeEmail}</div></div>
      <div class='field'><div class='label'>Principal problema</div><div class='value'>{$safeService}</div></div>
      <div class='field'><div class='label'>Mensagem</div><div class='value'>{$safeMessage}</div></div>
      " . ($safeBriefing !== '' ? "<div class='field'><div class='label'>Resumo gerado</div><div class='value'>{$safeBriefing}</div></div>" : "") . "
      <div class='field'><div class='label'>Data/Hora</div><div class='value'>{$safeDate}</div></div>
      <div class='footer'>ID do contato: {$safeContactId}</div>
    </div>
  </div>
</body>
</html>";

    $mail->AltBody =
        "Novo pedido de demonstracao WebFinan\n\n" .
        "Nome: {$name}\n" .
        "Empresa: {$company}\n" .
        "Contato: {$phone}\n" .
        "E-mail: " . ($email !== '' ? $email : 'Nao informado') . "\n" .
        "Principal problema: {$service}\n" .
        "Mensagem: {$message}\n" .
        ($briefing !== '' ? "\nResumo gerado:\n{$briefing}\n" : '') .
        "\nData/Hora: " . date('d/m/Y H:i:s') . "\n" .
        "ID do contato: " . ($contactId !== null ? "#{$contactId}" : 'Nao gravado');

    $mail->send();

    if ($contactId !== null) {
        try {
            $db->markEmailSent($contactId);
        } catch (Throwable $e) {
            error_log('Erro ao marcar e-mail enviado: ' . $e->getMessage());
        }
    }

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'contactId' => $contactId,
        'databaseError' => $databaseError,
        'message' => 'Formulario enviado com sucesso',
    ]);
} catch (Throwable $e) {
    error_log('Erro em contact.php: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao enviar formulario',
    ]);
}
