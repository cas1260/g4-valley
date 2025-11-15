#!/bin/bash

echo "=========================================="
echo "📦 Copiando Build Existente para Novidades"
echo "=========================================="
echo ""

# 1. Verificar se dist existe
if [ ! -d "dist" ]; then
  echo "❌ Erro: Pasta 'dist' não encontrada!"
  echo "Execute manualmente: npm run build"
  exit 1
fi

echo "✅ Pasta 'dist' encontrada!"
echo ""

# 2. Remover a pasta 'novidades' existente (se houver)
if [ -d "novidades" ]; then
  echo "🗑️  Removendo pasta 'novidades' existente..."
  rm -rf novidades
  echo "✅ Pasta antiga removida!"
fi
echo ""

# 3. Criar pasta novidades
echo "📁 Criando pasta 'novidades'..."
mkdir -p novidades
echo ""

# 4. Copiar arquivos de dist para novidades
echo "📋 Copiando frontend (dist/) para 'novidades/'..."
cp -r dist/* novidades/

if [ $? -ne 0 ]; then
  echo "❌ Erro: A cópia falhou."
  exit 1
fi

echo "✅ Frontend copiado!"
echo ""

# 5. Copiar a pasta 'server/' para 'novidades/server/'
echo "🐘 Copiando backend PHP para 'novidades/server/'..."
cp -r server novidades/server

if [ $? -ne 0 ]; then
  echo "❌ Erro: A cópia do servidor falhou."
  exit 1
fi

echo "✅ Backend PHP copiado!"
echo ""

echo "=========================================="
echo "✅ CÓPIA CONCLUÍDA COM SUCESSO!"
echo "=========================================="
echo ""
echo "📊 Estrutura criada:"
echo "  novidades/"
echo "  ├── index.html"
echo "  ├── assets/"
echo "  ├── fundo.svg"
echo "  └── server/"
echo "      ├── config.php"
echo "      ├── database.php"
echo "      ├── visitor.php"
echo "      ├── pageview.php"
echo "      ├── event.php"
echo "      ├── form.php"
echo "      ├── stats.php"
echo "      ├── export.php"
echo "      └── .htaccess"
echo ""
echo "📤 Próximos passos:"
echo "  1. Envie todo o conteúdo de 'novidades/' via FTP/SFTP"
echo "  2. Para: /public_html/novidades/"
echo "  3. Configure permissões: chmod 666 server/analytics.db"
echo "  4. Acesse: https://swapsoft.com.br/novidades/"
echo ""
echo "🎯 URLs:"
echo "  Site: https://swapsoft.com.br/novidades/"
echo "  Dashboard: https://swapsoft.com.br/novidades/statics"
echo "  API Stats: https://swapsoft.com.br/novidades/server/api/analytics/stats"
echo ""

