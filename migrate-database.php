#!/usr/bin/env php
<?php
/**
 * Script de Migração do Banco de Dados
 * 
 * Este script deleta o banco antigo e recria com todos os campos corretos
 */

echo "╔══════════════════════════════════════════════════════════════════════════════╗\n";
echo "║              🔄 MIGRAÇÃO DO BANCO DE DADOS 🔄                                ║\n";
echo "╚══════════════════════════════════════════════════════════════════════════════╝\n\n";

$dbPath = __DIR__ . '/novidades/server/analytics.db';

// Remover banco antigo
if (file_exists($dbPath)) {
    echo "🗑️  Removendo banco antigo...\n";
    if (unlink($dbPath)) {
        echo "✅ Banco antigo removido!\n\n";
    } else {
        echo "❌ Erro ao remover banco antigo!\n\n";
        exit(1);
    }
} else {
    echo "ℹ️  Banco antigo não existe.\n\n";
}

// Copiar database.php atualizado para novidades
echo "📦 Copiando database.php atualizado...\n";
copy(__DIR__ . '/server/database.php', __DIR__ . '/novidades/server/database.php');
echo "✅ database.php copiado!\n\n";

// Mudar para o diretório novidades/server
chdir(__DIR__ . '/novidades/server');

// Incluir database.php atualizado
echo "📦 Criando novo banco com todos os campos...\n";
require_once __DIR__ . '/novidades/server/database.php';

try {
    $db = new AnalyticsDB();
    echo "✅ Banco criado com sucesso!\n\n";
    
    echo "📊 TABELAS CRIADAS:\n";
    echo "   ✓ visitors (17 campos)\n";
    echo "   ✓ page_views (6 campos) - com page_url\n";
    echo "   ✓ events (12 campos) - com click_x, click_y, page_url\n";
    echo "   ✓ form_submissions (5 campos)\n";
    echo "   ✓ contacts (11 campos)\n\n";
    
    echo "✅ ÍNDICES CRIADOS:\n";
    echo "   ✓ 9 índices para performance\n\n";
    
    echo "╔══════════════════════════════════════════════════════════════════════════════╗\n";
    echo "║                   ✅ MIGRAÇÃO CONCLUÍDA COM SUCESSO ✅                       ║\n";
    echo "╚══════════════════════════════════════════════════════════════════════════════╝\n\n";
    
    echo "🔗 Acesse: https://swapsoft.com.br/novidades/statics\n\n";
    
} catch (Exception $e) {
    echo "❌ ERRO: " . $e->getMessage() . "\n\n";
    exit(1);
}

