#!/bin/bash

# Script para gerar build com textos responsivos
# G4Vallues - Build para pasta novidades

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🚀 G4Vallues - Gerando Build"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Ir para o diretório do projeto
cd /Users/soares/Desktop/Projetos/g4vallues

echo "📂 Diretório: $(pwd)"
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules não encontrado"
    echo "📦 Instalando dependências..."
    npm install
    echo ""
fi

echo "🔨 Executando build..."
echo ""

# Executar build
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "   ✅ Build Concluído com Sucesso!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📁 Arquivos gerados em:"
    echo "   /Users/soares/Desktop/Projetos/g4vallues/dist/"
    echo ""
    echo "📊 Conteúdo:"
    ls -lh dist/
    echo ""
    echo "🌐 Pronto para publicar em:"
    echo "   https://swapsoft.com.br/novidades/"
    echo ""
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "   ❌ Erro ao Gerar Build"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    exit 1
fi

