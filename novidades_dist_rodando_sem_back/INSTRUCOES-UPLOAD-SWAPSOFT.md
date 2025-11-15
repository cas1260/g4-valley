# 📤 Instruções de Upload para SwapSoft

## 🎯 Destino Final

```
https://swapsoft.com.br/novidades/
```

## ✅ Problema Corrigido

### ❌ Antes (Erro):
```
https://swapsoft.com.br/assets/index-xxx.js  → 404 Not Found
https://swapsoft.com.br/assets/index-xxx.css → 404 Not Found
```

### ✅ Agora (Correto):
```
https://swapsoft.com.br/novidades/assets/index-4nZRx9ZV.js  → ✓ OK
https://swapsoft.com.br/novidades/assets/index-CMewUhvl.css → ✓ OK
```

---

## 📂 Estrutura Correta no Servidor

O conteúdo desta pasta `dist` deve ser colocado dentro da pasta `novidades` no servidor:

```
swapsoft.com.br/
└── novidades/              ← Subdiretório
    ├── index.html
    └── assets/
        ├── index-4nZRx9ZV.js
        ├── index-CMewUhvl.css
        └── 8a571c4c186a45dd4a865f0b057c6a16f2aebabc-D_QKezvF.png
```

---

## 🚀 Passo a Passo para Upload

### Opção 1: Via cPanel (Mais Comum)

#### 1️⃣ Acesse o cPanel
```
https://swapsoft.com.br/cpanel
```
Ou através do painel de hospedagem

#### 2️⃣ Abra o Gerenciador de Arquivos
- Clique em "Gerenciador de Arquivos" ou "File Manager"

#### 3️⃣ Navegue até o diretório público
- Geralmente é `public_html` ou `www` ou `httpdocs`

#### 4️⃣ Localize ou crie a pasta "novidades"
- Se já existe uma pasta `novidades`, **FAÇA BACKUP** dela primeiro
- Se não existe, clique em "+ Pasta" ou "Create Folder" e crie `novidades`

#### 5️⃣ Entre na pasta novidades
- Dê dois cliques na pasta `novidades`

#### 6️⃣ Limpe o conteúdo antigo (se houver)
- Se houver arquivos antigos, selecione todos e delete
- **OU** faça backup movendo para outra pasta

#### 7️⃣ Faça upload dos arquivos
- Clique em "Upload" ou "Enviar"
- Selecione **TODOS** os arquivos desta pasta `dist`:
  - `index.html`
  - Pasta `assets` completa

#### 8️⃣ Aguarde o upload completar
- Verifique que todos os arquivos foram enviados com sucesso

#### 9️⃣ Teste no navegador
```
https://swapsoft.com.br/novidades/
```

---

### Opção 2: Via FTP (FileZilla, WinSCP, etc.)

#### 1️⃣ Conecte-se via FTP
```
Host: ftp.swapsoft.com.br (ou swapsoft.com.br)
Usuário: [seu usuário FTP]
Senha: [sua senha FTP]
Porta: 21 (FTP) ou 22 (SFTP)
```

#### 2️⃣ No lado direito (servidor remoto)
- Navegue até `public_html` (ou pasta pública)
- Localize ou crie a pasta `novidades`
- Entre na pasta `novidades`

#### 3️⃣ No lado esquerdo (seu computador)
- Navegue até:
```
/Users/soares/Desktop/Projetos/g4vallues/dist
```

#### 4️⃣ Faça upload
- Selecione **TODOS** os arquivos do lado esquerdo
- Arraste para o lado direito (dentro da pasta `novidades`)
- Aguarde a transferência completar

#### 5️⃣ Teste
```
https://swapsoft.com.br/novidades/
```

---

### Opção 3: Via SSH/Terminal (Se tiver acesso)

#### 1️⃣ Conecte-se ao servidor
```bash
ssh usuario@swapsoft.com.br
```

#### 2️⃣ Navegue até a pasta pública
```bash
cd ~/public_html
# ou
cd /var/www/html
```

#### 3️⃣ Crie/limpe a pasta novidades
```bash
# Se não existir:
mkdir -p novidades

# Se existir e quiser limpar:
rm -rf novidades/*
```

#### 4️⃣ Do seu Mac, faça upload via SCP
```bash
# Em um NOVO terminal no seu Mac:
scp -r /Users/soares/Desktop/Projetos/g4vallues/dist/* usuario@swapsoft.com.br:~/public_html/novidades/
```

#### 5️⃣ Configure permissões (no servidor via SSH)
```bash
cd ~/public_html/novidades
chmod 755 .
chmod 644 index.html
chmod 755 assets
chmod 644 assets/*
```

#### 6️⃣ Teste
```
https://swapsoft.com.br/novidades/
```

---

## ✅ Checklist de Verificação

Após fazer upload, verifique:

- [ ] Pasta `novidades` existe no servidor
- [ ] `index.html` está dentro de `novidades/`
- [ ] Pasta `assets/` está dentro de `novidades/`
- [ ] Todos os 3 arquivos estão dentro de `assets/`
- [ ] Acesso a `https://swapsoft.com.br/novidades/` funciona
- [ ] Console do navegador (F12) não mostra erros 404
- [ ] CSS está sendo aplicado (página tem estilo)
- [ ] JavaScript está funcionando (interações funcionam)
- [ ] Imagens aparecem corretamente

---

## 🔍 Verificação Manual dos Arquivos

Abra o navegador e teste cada arquivo individualmente:

### 1. HTML Principal:
```
https://swapsoft.com.br/novidades/
```
**Deve:** Carregar a página

### 2. JavaScript:
```
https://swapsoft.com.br/novidades/assets/index-4nZRx9ZV.js
```
**Deve:** Baixar o arquivo JS (não dar 404)

### 3. CSS:
```
https://swapsoft.com.br/novidades/assets/index-CMewUhvl.css
```
**Deve:** Baixar o arquivo CSS (não dar 404)

### 4. Imagem:
```
https://swapsoft.com.br/novidades/assets/8a571c4c186a45dd4a865f0b057c6a16f2aebabc-D_QKezvF.png
```
**Deve:** Mostrar a imagem (não dar 404)

Se TODOS retornarem corretamente (não 404), então está tudo OK! ✅

---

## 🆘 Solução de Problemas

### Erro: "404 Not Found" na página principal

**Causa:** Arquivos não estão na pasta correta

**Solução:**
1. Verifique que os arquivos estão em `public_html/novidades/`
2. NÃO em `public_html/novidades/dist/`
3. NÃO em `public_html/dist/`

### Erro: "404" nos assets (CSS/JS)

**Causa:** Pasta `assets` não foi enviada ou está no lugar errado

**Solução:**
1. Verifique que existe: `public_html/novidades/assets/`
2. Verifique que os 3 arquivos estão dentro de `assets/`

### Erro: Página carrega mas sem estilo

**Causa:** CSS não está carregando

**Solução:**
1. Abra o Console (F12)
2. Veja se há erro 404 para o arquivo CSS
3. Verifique permissões dos arquivos (devem ser 644)
4. Confirme que o arquivo CSS existe no servidor

### Erro: "Forbidden" ou "403"

**Causa:** Permissões incorretas

**Solução via SSH:**
```bash
cd ~/public_html/novidades
chmod 755 .
chmod 644 index.html
chmod 755 assets
chmod 644 assets/*
```

**Solução via cPanel:**
1. Gerenciador de Arquivos
2. Clique com botão direito no arquivo
3. "Change Permissions" ou "Alterar Permissões"
4. Pastas: 755
5. Arquivos: 644

---

## 📊 Estrutura Final Esperada

```
swapsoft.com.br/
├── (outros arquivos do site principal)
│
└── novidades/
    ├── index.html                          (0.46 kB)
    └── assets/
        ├── index-4nZRx9ZV.js               (334.72 kB)
        ├── index-CMewUhvl.css              (59.55 kB)
        └── [imagem].png                    (100.10 kB)
```

---

## 🎉 Pronto!

Depois de fazer o upload corretamente, acesse:

```
https://swapsoft.com.br/novidades/
```

E sua Landing Page estará funcionando perfeitamente! 🚀

