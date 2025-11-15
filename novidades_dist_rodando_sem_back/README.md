# G4Vallues - Versão de Produção (Subdiretório)

Esta pasta contém a versão otimizada e pronta para publicação da Landing Page G4Vallues, **configurada para rodar no subdiretório `/novidades/`**.

## 📦 Conteúdo da Pasta

- **index.html** - Arquivo HTML principal (0.46 kB)
- **assets/** - Pasta com recursos otimizados:
  - `index-4nZRx9ZV.js` - JavaScript bundle (334.72 kB / 104.42 kB gzipped)
  - `index-CMewUhvl.css` - Estilos otimizados (59.55 kB / 9.51 kB gzipped)
  - `8a571c4c186a45dd4a865f0b057c6a16f2aebabc-D_QKezvF.png` - Imagem (100.10 kB)

## ⚙️ Configuração Importante

✅ **Este build foi configurado para rodar em:**

```
https://swapsoft.com.br/novidades/
```

Todos os assets estão referenciados com o caminho base `/novidades/`, garantindo que funcionem corretamente no subdiretório.

## 🚀 Como Publicar no Servidor

### Estrutura no Servidor:

```
/var/www/html/                    (ou public_html/)
└── novidades/
    ├── index.html
    └── assets/
        ├── index-4nZRx9ZV.js
        ├── index-CMewUhvl.css
        └── [imagem].png
```

### Opção 1: Upload via FTP/SFTP

1. Conecte-se ao servidor via FTP (FileZilla, WinSCP, etc.)
2. Navegue até a pasta `public_html` (ou `www`, `html`)
3. Crie a pasta `novidades` (se não existir)
4. Faça upload de **TODO** o conteúdo desta pasta `dist` para dentro de `novidades/`

### Opção 2: Upload via cPanel

1. Acesse o cPanel
2. Vá em "Gerenciador de Arquivos"
3. Entre na pasta `public_html`
4. Crie a pasta `novidades` (se não existir)
5. Entre na pasta `novidades`
6. Faça upload de todos os arquivos desta pasta `dist`

### Opção 3: Upload via SSH/SCP

```bash
# Do seu computador, execute:
scp -r /Users/soares/Desktop/Projetos/g4vallues/dist/* usuario@swapsoft.com.br:/caminho/para/public_html/novidades/

# Ou use rsync:
rsync -avz /Users/soares/Desktop/Projetos/g4vallues/dist/* usuario@swapsoft.com.br:/caminho/para/public_html/novidades/
```

### Opção 4: Servidor VPS com Nginx

```nginx
server {
    listen 80;
    server_name swapsoft.com.br;
    root /var/www/html;
    index index.html;

    # Configuração para o subdiretório /novidades/
    location /novidades/ {
        alias /var/www/html/novidades/;
        try_files $uri $uri/ /novidades/index.html;
    }
}
```

### Opção 5: Servidor VPS com Apache

Crie ou edite `.htaccess` dentro da pasta `novidades`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /novidades/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /novidades/index.html [L]
</IfModule>
```

## 🧪 Como Testar Localmente (Simulando Subdiretório)

### Opção 1: Python

```bash
cd /Users/soares/Desktop/Projetos/g4vallues
python3 -m http.server 8080

# Acesse: http://localhost:8080/dist/
```

**IMPORTANTE:** Acesse `http://localhost:8080/dist/` (com /dist/ no final) para simular o subdiretório.

### Opção 2: Node.js com http-server

```bash
cd /Users/soares/Desktop/Projetos/g4vallues
npx http-server -p 8080

# Acesse: http://localhost:8080/dist/
```

### Opção 3: PHP

```bash
cd /Users/soares/Desktop/Projetos/g4vallues
php -S localhost:8080

# Acesse: http://localhost:8080/dist/
```

## ✅ Verificação Após Upload

Após fazer upload, acesse:

```
https://swapsoft.com.br/novidades/
```

Se tudo estiver correto, você verá:

- ✅ Página carregando completamente
- ✅ Sem erros 404 no console do navegador (F12)
- ✅ CSS e JavaScript carregados corretamente
- ✅ Imagens aparecendo

## 🔍 Solução de Problemas

### Problema: Erro 404 nos assets

**Sintomas:** CSS não carrega, página sem estilo

**Possíveis causas:**

1. Arquivos não foram colocados na pasta correta
2. Pasta `novidades` não existe no servidor
3. Permissões incorretas

**Solução:**

```bash
# Verificar estrutura no servidor via SSH:
ls -la /var/www/html/novidades/
ls -la /var/www/html/novidades/assets/

# Corrigir permissões:
chmod 755 /var/www/html/novidades
chmod 644 /var/www/html/novidades/index.html
chmod 755 /var/www/html/novidades/assets
chmod 644 /var/www/html/novidades/assets/*
```

### Problema: Página em branco

**Solução:**

1. Abra o console do navegador (F12 → Console)
2. Verifique se há erros de carregamento
3. Confirme que todos os arquivos foram enviados
4. Verifique se o caminho no servidor está correto

### Problema: Redireciona para 404 ao recarregar

**Causa:** Servidor não configurado para SPA

**Solução:** Configure o servidor conforme as instruções de Nginx ou Apache acima.

## 📊 Informações Técnicas

- **Build Tool:** Vite 6.3.5
- **Base Path:** `/novidades/`
- **Tamanho Total:** ~495 kB (não comprimido) / ~114 kB (gzipped)
- **Target:** ESNext (JavaScript moderno)
- **Otimizações:** Minificação, tree-shaking, code splitting

## 🔐 Segurança

- ✅ Todos os arquivos são estáticos (HTML, CSS, JS)
- ✅ Não há processamento server-side
- ⚠️ Certifique-se de usar HTTPS em produção
- ⚠️ Configure cabeçalhos de segurança (CSP, HSTS)

## 📝 Mudança de Subdiretório

Se precisar mudar de `/novidades/` para outro caminho:

1. Edite `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/novo-caminho/", // Altere aqui
  // ... resto da configuração
});
```

2. Reconstrua:

```bash
npm run build
```

3. Faça upload para o novo subdiretório no servidor

## 🆘 Suporte

Para mais informações sobre publicação com Vite:
https://vitejs.dev/guide/static-deploy.html#building-the-app

Para problemas específicos do Vite e base path:
https://vitejs.dev/config/shared-options.html#base
