#!/bin/bash

# Script para gerar build e copiar para pasta novidades
# Projeto: G4 Valley

echo "======================================"
echo "  Gerando Build do Projeto"
echo "======================================"

# Navegar para o diretório do projeto
cd "$(dirname "$0")"

# Executar o build
echo ""
echo "1. Executando npm run build..."
npm run build

# Verificar se o build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Build gerado com sucesso!"
    
    # Criar pasta novidades se não existir
    echo ""
    echo "2. Preparando pasta novidades..."
    
    # Remover pasta novidades antiga se existir
    if [ -d "novidades" ]; then
        echo "   Removendo pasta novidades antiga..."
        rm -rf novidades
    fi
    
    # Copiar conteúdo de dist para novidades
    echo "   Copiando arquivos de dist para novidades..."
    cp -r dist novidades
    
    echo ""
    echo "✓ Arquivos copiados para a pasta novidades!"
    
    echo ""
    echo "======================================"
    echo "  Build Completo!"
    echo "======================================"
    echo ""
    echo "Pasta: novidades/"
    echo "Base Path: /novidades/"
    echo ""
    echo "Para testar localmente:"
    echo "  cd novidades"
    echo "  python3 -m http.server 8080"
    echo ""
    echo "Acesse: http://localhost:8080"
    echo ""
else
    echo ""
    echo "✗ Erro ao gerar build"
    echo "Verifique os erros acima"
    exit 1
fi

