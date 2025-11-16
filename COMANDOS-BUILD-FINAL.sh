#!/bin/bash

echo "=========================================="
echo "🔧 BUILD FINAL - Com .htaccess para React Router"
echo "=========================================="
echo ""

cd /Users/soares/Desktop/Projetos/g4vallues

# 1. Limpar tudo
echo "🗑️  Removendo pastas antigas..."
sudo rm -rf dist novidades

if [ $? -ne 0 ]; then
  echo "❌ Erro ao remover pastas. Tente deletar manualmente."
  exit 1
fi

echo "✅ Pastas removidas!"
echo ""

# 2. Build
echo "📦 Executando build..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build falhou!"
  exit 1
fi

echo "✅ Build concluído!"
echo ""

# 3. Criar novidades
echo "📁 Criando pasta novidades..."
mkdir -p novidades

# 4. Copiar dist
echo "📋 Copiando frontend..."
cp -r dist/* novidades/

# 5. Copiar server
echo "🐘 Copiando backend PHP..."
cp -r server novidades/server

# 6. Verificar .htaccess
echo ""
echo "🔍 Verificando .htaccess..."
if [ -f "novidades/.htaccess" ]; then
  echo "✅ .htaccess encontrado em novidades/"
else
  echo "⚠️  .htaccess NÃO encontrado!"
  echo "   Copiando manualmente..."
  cp public/.htaccess novidades/.htaccess
fi

echo ""
echo "=========================================="
echo "✅ BUILD COMPLETO!"
echo "=========================================="
echo ""
echo "📊 Estrutura:"
echo "  novidades/"
echo "  ├── .htaccess          ← CRUCIAL para /statics funcionar"
echo "  ├── index.html"
echo "  ├── assets/"
echo "  └── server/"
echo ""
echo "📤 Próximo passo:"
echo "  Faça upload de TUDO em novidades/ para:"
echo "  /public_html/novidades/"
echo ""
echo "⚠️  IMPORTANTE:"
echo "  Certifique-se que .htaccess foi enviado!"
echo "  (Ative 'mostrar arquivos ocultos' no FTP)"
echo ""
echo "🎯 Testar após upload:"
echo "  https://swapsoft.com.br/novidades/"
echo "  https://swapsoft.com.br/novidades/statics"
echo ""

