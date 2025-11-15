#!/bin/bash

echo "=========================================="
echo "🚀 Build Completo - Frontend + Backend"
echo "=========================================="
echo ""

# 1. Executar o build do Vite
echo "📦 Passo 1/4: Executando build do frontend..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Erro: O comando 'npm run build' falhou."
  exit 1
fi

echo "✅ Build do frontend concluído!"
echo ""

# 2. Remover a pasta 'novidades' existente (se houver)
if [ -d "novidades" ]; then
  echo "🗑️  Passo 2/4: Removendo pasta 'novidades' existente..."
  rm -rf novidades
  echo "✅ Pasta antiga removida!"
else
  echo "ℹ️  Passo 2/4: Pasta 'novidades' não existe (criando nova)..."
fi
echo ""

# 3. Copiar o conteúdo de 'dist/' para 'novidades/'
echo "📁 Passo 3/4: Copiando frontend (dist/) para 'novidades/'..."
cp -r dist novidades

if [ $? -ne 0 ]; then
  echo "❌ Erro: A cópia da pasta 'dist' para 'novidades' falhou."
  exit 1
fi

echo "✅ Frontend copiado para 'novidades/'!"
echo ""

# 4. Copiar a pasta 'server/' para 'novidades/server/'
echo "🐘 Passo 4/4: Copiando backend PHP para 'novidades/server/'..."
cp -r server novidades/server

if [ $? -ne 0 ]; then
  echo "❌ Erro: A cópia da pasta 'server' para 'novidades/server' falhou."
  exit 1
fi

echo "✅ Backend PHP copiado para 'novidades/server/'!"
echo ""

echo "=========================================="
echo "✅ BUILD COMPLETO CONCLUÍDO COM SUCESSO!"
echo "=========================================="
echo ""
echo "📊 Estrutura criada:"
echo "  novidades/"
echo "  ├── index.html         ← Frontend"
echo "  ├── assets/            ← CSS, JS, imagens"
echo "  ├── fundo.svg          ← Background"
echo "  └── server/            ← Backend PHP + SQLite"
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
echo "🧪 Para testar localmente:"
echo "  1. Copie 'novidades/' para seu servidor PHP local"
echo "  2. Acesse: http://localhost/novidades/"
echo ""
echo "📤 Para fazer upload para produção:"
echo "  1. Envie todo o conteúdo de 'novidades/' via FTP/SFTP"
echo "  2. Para: /public_html/novidades/"
echo "  3. Configure permissões do servidor (chmod 666 analytics.db)"
echo "  4. Acesse: https://swapsoft.com.br/novidades/"
echo ""
echo "🎯 URLs importantes:"
echo "  Site: https://swapsoft.com.br/novidades/"
echo "  Dashboard: https://swapsoft.com.br/novidades/statics"
echo "  API: https://swapsoft.com.br/novidades/server/api/analytics/stats"
echo ""

