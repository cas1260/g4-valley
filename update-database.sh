#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║              📦 ATUALIZAR DATABASE.PHP 📦                                    ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""

echo "🔄 Copiando database.php atualizado..."
echo ""

# Ler o arquivo e escrever no destino
cat server/database.php > novidades/server/database.php.tmp && mv novidades/server/database.php.tmp novidades/server/database.php

if [ $? -eq 0 ]; then
    echo "✅ database.php atualizado com sucesso!"
    echo ""
    echo "📊 Verificação:"
    ls -lh novidades/server/database.php
    echo ""
    echo "╔══════════════════════════════════════════════════════════════════════════════╗"
    echo "║                   ✅ ATUALIZAÇÃO CONCLUÍDA ✅                                ║"
    echo "╚══════════════════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🔗 Acesse o dashboard:"
    echo "   https://swapsoft.com.br/novidades/statics"
    echo ""
    echo "✅ O dashboard agora deve exibir todos os dados corretamente!"
    echo ""
else
    echo "❌ Erro ao atualizar database.php"
    exit 1
fi



