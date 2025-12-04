# Como Gerar Build para Pasta Novidades

## Método 1: Script Automático (Recomendado)

### Mac/Linux:
```bash
chmod +x gerar-build-novidades.sh
./gerar-build-novidades.sh
```

### Windows:
```bash
bash gerar-build-novidades.sh
```

---

## Método 2: Comandos Manuais

### Passo 1: Gerar o build
```bash
npm run build
```

### Passo 2: Copiar para pasta novidades

**Mac/Linux:**
```bash
rm -rf novidades
cp -r dist novidades
```

**Windows (CMD):**
```cmd
rmdir /s /q novidades
xcopy /E /I /Y dist novidades
```

**Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force novidades -ErrorAction SilentlyContinue
Copy-Item -Recurse -Force dist novidades
```

---

## O Que Foi Gerado

Após executar, você terá:

```
📁 g4vallues/
  📁 novidades/           ← Pasta para upload
    📄 index.html
    📁 assets/
      📄 *.js
      📄 *.css
      🖼️ *.svg, *.png
```

---

## Testar Localmente

### Opção 1: Python
```bash
cd novidades
python3 -m http.server 8080
```

### Opção 2: PHP
```bash
cd novidades
php -S localhost:8080
```

### Opção 3: npx
```bash
cd novidades
npx http-server -p 8080
```

Acesse: **http://localhost:8080**

---

## Upload para Servidor

1. Acesse seu servidor via FTP/SFTP
2. Navegue até a pasta raiz do site
3. Crie ou acesse a pasta `novidades/`
4. Envie **todo o conteúdo** da pasta `novidades/` local
5. Acesse: `https://swapsoft.com.br/novidades/`

---

## Estrutura Final no Servidor

```
swapsoft.com.br/
  novidades/              ← Criar esta pasta
    index.html
    assets/
      *.js
      *.css
      *.svg, *.png
```

---

## Configuração

- **Base Path:** `/novidades/`
- **Configurado em:** `vite.config.ts`
- **Output:** `dist/` → `novidades/`

---

## Dicas

✓ **Sempre gere um novo build** antes de fazer upload
✓ **Teste localmente** antes de enviar para produção
✓ **Substitua todos os arquivos** no servidor (não mescle)
✓ **Limpe o cache do navegador** após upload

---

## Problemas Comuns

### Página em branco
- Verifique se o base path está correto: `/novidades/`
- Limpe o cache do navegador (Ctrl+Shift+R)

### Imagens não carregam
- Certifique-se que a pasta `assets/` foi enviada completa
- Verifique permissões no servidor (644 para arquivos, 755 para pastas)

### CSS/JS não funciona
- Confirme que todos os arquivos `.js` e `.css` estão na pasta `assets/`
- Verifique se o servidor suporta os tipos de arquivo

---

**Build gerado com sucesso!** 🚀

