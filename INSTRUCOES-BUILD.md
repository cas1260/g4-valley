# 🚨 Problema de Permissões Detectado

## ⚠️ Situação

Os arquivos nas pastas `dist` e `novidades` pertencem ao usuário `root`, impedindo a cópia automática.

```
drwxr-xr-x@  4 root   staff  128 Nov 15 09:35 dist
drwxr-xr-x@  4 root   staff  128 Nov 15 09:35 novidades
```

---

## ✅ Solução Rápida

### Opção 1: Deletar Manualmente e Fazer Novo Build

Execute no Terminal:

```bash
cd /Users/soares/Desktop/Projetos/g4vallues

# Deletar pastas com permissões de root
sudo rm -rf dist
sudo rm -rf novidades

# Fazer novo build
npm run build

# Copiar tudo para novidades
mkdir novidades
cp -r dist/* novidades/
cp -r server novidades/server
```

### Opção 2: Criar em Pasta Diferente

```bash
cd /Users/soares/Desktop/Projetos/g4vallues

# Criar nova pasta com nome diferente
mkdir -p novidades_deploy

# Copiar conteúdo atual de dist (se funcionar)
cp -r dist/* novidades_deploy/ 2>/dev/null || echo "Precisa deletar dist com sudo"

# Copiar servidor
cp -r server novidades_deploy/server

# Renomear para novidades
mv novidades_deploy novidades_final
```

### Opção 3: Usar o Finder (Mac)

1. Abrir Finder
2. Ir para: `/Users/soares/Desktop/Projetos/g4vallues`
3. Clicar com botão direito em `dist` → Obter Informações
4. Na seção "Compartilhamento e Permissões", clicar no cadeado 🔒
5. Digitar sua senha
6. Mudar o proprietário de `root` para `soares`
7. Repetir para pasta `novidades`
8. Executar o script: `./copiar-para-novidades.sh`

---

## 📋 Comando Completo (Recomendado)

```bash
cd /Users/soares/Desktop/Projetos/g4vallues

# Limpar tudo com sudo
sudo rm -rf dist novidades

# Fazer build limpo
npm run build

# Criar estrutura novidades
mkdir novidades
cp -r dist/* novidades/
cp -r server novidades/server

echo "✅ Pronto! Pasta novidades/ criada com sucesso!"
```

---

## 🎯 Após Resolver

A estrutura ficará assim:

```
novidades/
├── index.html         ← Frontend
├── assets/            ← CSS, JS, imagens
│   ├── index-xxx.css
│   ├── index-xxx.js
│   ├── fundo-xxx.svg
│   └── 8a571c...png
└── server/            ← Backend PHP
    ├── config.php
    ├── database.php
    ├── visitor.php
    ├── pageview.php
    ├── event.php
    ├── form.php
    ├── stats.php
    ├── export.php
    └── .htaccess
```

---

## 📤 Upload para Servidor

Depois de criar a pasta `novidades` com sucesso:

1. **Via FTP/SFTP:**
   - Conectar em `swapsoft.com.br`
   - Navegar até `/public_html/`
   - Fazer upload de toda a pasta `novidades/`

2. **Configurar Permissões no Servidor:**
   ```bash
   chmod 755 novidades/
   chmod 755 novidades/server/
   chmod 644 novidades/server/*.php
   chmod 666 novidades/server/analytics.db  # Quando for criado
   ```

3. **Testar:**
   - Site: https://swapsoft.com.br/novidades/
   - Dashboard: https://swapsoft.com.br/novidades/statics
   - API: https://swapsoft.com.br/novidades/server/api/analytics/stats

---

## 🐛 Se Ainda Tiver Problemas

Abra o Finder e delete manualmente as pastas:
- `/Users/soares/Desktop/Projetos/g4vallues/dist`
- `/Users/soares/Desktop/Projetos/g4vallues/novidades`

Depois execute no Terminal:
```bash
npm run build
mkdir novidades
cp -r dist/* novidades/
cp -r server novidades/server
```

---

**Problema:** Arquivos criados como root  
**Solução:** Deletar com sudo e recriar como usuário normal

