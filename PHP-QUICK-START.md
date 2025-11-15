# 🚀 PHP Analytics - Início Rápido

## ⚡ 3 Passos para Funcionar

### 1️⃣ Instalar Servidor PHP Local

**XAMPP (Recomendado - Windows/Mac/Linux):**
- Download: https://www.apachefriends.org/
- Instalar e iniciar Apache

**MAMP (Mac):**
- Download: https://www.mamp.info/
- Instalar e iniciar servidores

### 2️⃣ Copiar Pasta Server

```bash
# XAMPP
cp -r server /Applications/XAMPP/htdocs/g4vallues/

# MAMP
cp -r server /Applications/MAMP/htdocs/g4vallues/

# Windows XAMPP
Copiar pasta "server" para: C:\xampp\htdocs\g4vallues\
```

### 3️⃣ Testar

Abra no navegador:

```
http://localhost/g4vallues/server/api/analytics/stats
```

Se retornar JSON, está funcionando! ✅

---

## 🌐 Upload para Produção

### 1. Fazer Upload

Envie toda a pasta `server/` via FTP/SFTP para:

```
/public_html/novidades/server/
```

### 2. Configurar Permissões

```bash
chmod 755 server/
chmod 644 server/*.php
chmod 666 server/analytics.db
```

### 3. Testar

```
https://swapsoft.com.br/novidades/server/api/analytics/stats
```

---

## ✅ Frontend Já Configurado

O frontend React detecta automaticamente:
- **localhost** → usa `http://localhost/g4vallues/server/`
- **produção** → usa `https://swapsoft.com.br/novidades/server/`

---

## 📋 Arquivos Criados

```
server/
├── config.php          ← Configurações
├── database.php        ← SQLite
├── visitor.php         ← API
├── pageview.php        ← API
├── event.php           ← API  
├── form.php            ← API
├── stats.php           ← API
├── export.php          ← API
└── .htaccess           ← Rewrite rules
```

---

## 🎯 Pronto!

Agora é só fazer build do frontend e upload:

```bash
npm run build
```

Upload da pasta `dist/` para `/novidades/`

**Sistema 100% em PHP!** 🐘✅

