# 🚨 Corrigir Erro 404 na Rota /statics

## 🔍 Problema Identificado

Ao acessar `https://swapsoft.com.br/novidades/statics` está retornando **404 Not Found**.

### Por que isso acontece?

O React Router funciona no **lado do cliente** (navegador). Quando você acessa diretamente uma rota como `/statics`, o servidor Apache tenta encontrar um arquivo físico `statics.html` ou uma pasta `statics/`, que não existem.

O servidor precisa ser configurado para **sempre retornar o `index.html`** e deixar o React Router gerenciar as rotas.

---

## ✅ SOLUÇÃO

### 1️⃣ Arquivo .htaccess Criado

Criei o arquivo **`public/.htaccess`** que será copiado automaticamente no build.

Este arquivo instrui o Apache a:
- Redirecionar todas as rotas para `index.html`
- Deixar o React Router gerenciar as rotas
- Configurar cache e compressão

### 2️⃣ Fazer Novo Build

Execute no terminal:

```bash
cd /Users/soares/Desktop/Projetos/g4vallues

# Limpar pastas antigas (precisa de sudo)
sudo rm -rf dist novidades

# Fazer novo build (agora com .htaccess incluído)
npm run build

# Criar pasta novidades
mkdir novidades
cp -r dist/* novidades/
cp -r server novidades/server

# Verificar se .htaccess foi copiado
ls -la novidades/.htaccess
```

**Importante:** O arquivo `.htaccess` deve estar na **raiz da pasta novidades/**

### 3️⃣ Fazer Upload Novamente

Via FTP/SFTP, faça upload de:

```
novidades/
├── .htaccess          ← IMPORTANTE! Arquivo novo
├── index.html
├── assets/
└── server/
```

**Atenção:** Certifique-se que o arquivo `.htaccess` foi enviado para:
```
/public_html/novidades/.htaccess
```

### 4️⃣ Testar

Acesse as URLs:

- ✅ https://swapsoft.com.br/novidades/
- ✅ https://swapsoft.com.br/novidades/statics
- ✅ https://swapsoft.com.br/novidades/server/api/analytics/stats

---

## 📋 Conteúdo do .htaccess

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /novidades/
  
  # Se o arquivo ou diretório existe, servir diretamente
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Caso contrário, redirecionar para index.html
  RewriteRule . /novidades/index.html [L]
</IfModule>
```

**O que isso faz:**
1. Habilita rewrite do Apache
2. Define base como `/novidades/`
3. Se o arquivo existe (CSS, JS, imagens), serve normalmente
4. Se NÃO existe (rotas do React), redireciona para `index.html`
5. O React Router assume e mostra a página correta

---

## 🐛 Troubleshooting

### Problema 1: Ainda dá 404

**Causa:** Arquivo .htaccess não foi enviado ou servidor não permite `.htaccess`

**Solução:**
1. Verificar se `.htaccess` está na raiz de `/novidades/`
2. Verificar se o servidor tem `AllowOverride All` configurado
3. Contatar suporte da hospedagem

### Problema 2: 500 Internal Server Error

**Causa:** Sintaxe incorreta no .htaccess ou mod_rewrite desabilitado

**Solução:**
1. Verificar se `mod_rewrite` está habilitado no servidor
2. Contatar suporte da hospedagem

### Problema 3: .htaccess não aparece no FTP

**Causa:** Arquivos começando com `.` são ocultos

**Solução:**
1. No FileZilla: Server → Force showing hidden files
2. No Finder (Mac): Cmd + Shift + . (ponto)
3. No Windows Explorer: View → Show hidden files

---

## 🎯 Checklist de Deploy

- [ ] Build feito com `npm run build`
- [ ] Arquivo `.htaccess` existe em `dist/`
- [ ] Pasta `novidades/` criada com todo conteúdo de `dist/`
- [ ] Pasta `server/` copiada para `novidades/server/`
- [ ] `.htaccess` na raiz de `novidades/`
- [ ] Upload feito para `/public_html/novidades/`
- [ ] `.htaccess` visível no servidor (ativar "mostrar arquivos ocultos")
- [ ] Testar: `https://swapsoft.com.br/novidades/`
- [ ] Testar: `https://swapsoft.com.br/novidades/statics`
- [ ] Testar: `https://swapsoft.com.br/novidades/server/api/analytics/stats`

---

## 📚 Estrutura Final no Servidor

```
/public_html/novidades/
├── .htaccess          ← Arquivo CRUCIAL para React Router funcionar
├── index.html
├── assets/
│   ├── index-xxx.css
│   ├── index-xxx.js
│   └── fundo-xxx.svg
└── server/
    ├── .htaccess      ← Já existe (para API)
    ├── config.php
    ├── database.php
    ├── visitor.php
    ├── pageview.php
    ├── event.php
    ├── form.php
    ├── stats.php
    └── export.php
```

---

## 💡 Resumo

**Problema:** Servidor não sabe lidar com rotas do React Router  
**Solução:** `.htaccess` redireciona tudo para `index.html`  
**Resultado:** Todas as rotas funcionam (`/`, `/statics`, etc)  

---

## 🚀 Comandos Rápidos

```bash
cd /Users/soares/Desktop/Projetos/g4vallues
sudo rm -rf dist novidades
npm run build
mkdir novidades
cp -r dist/* novidades/
cp -r server novidades/server
ls -la novidades/.htaccess  # Verificar se existe
```

Depois faça upload da pasta `novidades/` completa!

---

**Após seguir estes passos, a rota /statics vai funcionar! ✅**

