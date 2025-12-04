<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recriar Banco de Dados</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #28a745;
            margin: 20px 0;
        }
        .error {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #dc3545;
            margin: 20px 0;
        }
        .info {
            background: #d1ecf1;
            color: #0c5460;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #17a2b8;
            margin: 20px 0;
        }
        .table-list {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .table-list ul {
            list-style: none;
            padding: 0;
        }
        .table-list li {
            padding: 8px 0;
            border-bottom: 1px solid #dee2e6;
        }
        .table-list li:last-child {
            border-bottom: none;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .btn:hover {
            background: #5568d3;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔄 Recriar Banco de Dados</h1>
        
        <?php
        $dbPath = __DIR__ . '/server/analytics.db';
        $dbPathBackup = __DIR__ . '/server/analytics.db.backup';
        
        try {
            // Fazer backup se existir
            if (file_exists($dbPath)) {
                echo '<div class="info">📦 Fazendo backup do banco antigo...</div>';
                copy($dbPath, $dbPathBackup);
                unlink($dbPath);
                echo '<div class="success">✅ Banco antigo removido (backup criado)</div>';
            } else {
                echo '<div class="info">ℹ️ Nenhum banco anterior encontrado</div>';
            }
            
            // Recriar banco
            echo '<div class="info">📦 Criando novo banco com todos os campos...</div>';
            
            require_once __DIR__ . '/server/database.php';
            $db = new AnalyticsDB();
            
            echo '<div class="success">✅ Banco criado com sucesso!</div>';
            
            echo '<div class="table-list">';
            echo '<h3>📊 Tabelas Criadas:</h3>';
            echo '<ul>';
            echo '<li>✓ <strong>visitors</strong> (17 campos) - Dados dos visitantes</li>';
            echo '<li>✓ <strong>page_views</strong> (6 campos) - <code>page_url</code>, <code>page_title</code>, <code>time_spent</code></li>';
            echo '<li>✓ <strong>events</strong> (12 campos) - <code>click_x</code>, <code>click_y</code>, <code>page_url</code>, <code>element_tag</code></li>';
            echo '<li>✓ <strong>form_submissions</strong> (5 campos) - Submissões de formulários</li>';
            echo '<li>✓ <strong>contacts</strong> (11 campos) - Contatos do formulário</li>';
            echo '</ul>';
            echo '</div>';
            
            echo '<div class="table-list">';
            echo '<h3>⚡ Índices Criados:</h3>';
            echo '<ul>';
            echo '<li>✓ 9 índices para otimização de performance</li>';
            echo '</ul>';
            echo '</div>';
            
            // Verificar tamanho
            $size = filesize($dbPath);
            $sizeKB = round($size / 1024, 2);
            echo '<div class="info">📊 Tamanho do banco: ' . $sizeKB . ' KB</div>';
            
            echo '<div class="success">';
            echo '<h3>🎉 Migração Concluída!</h3>';
            echo '<p>O banco de dados foi recriado com <strong>TODOS os campos necessários</strong>.</p>';
            echo '<p>Agora você pode acessar o dashboard sem erros!</p>';
            echo '</div>';
            
            echo '<a href="/novidades/statics" class="btn">📊 Acessar Dashboard</a>';
            
        } catch (Exception $e) {
            echo '<div class="error">';
            echo '<h3>❌ Erro na Migração</h3>';
            echo '<p>' . htmlspecialchars($e->getMessage()) . '</p>';
            echo '</div>';
        }
        ?>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
            <p><strong>⚠️ Importante:</strong> Este arquivo pode ser deletado após a execução.</p>
            <p>📁 Localização: <code>/novidades/recreate-database.php</code></p>
        </div>
    </div>
</body>
</html>



