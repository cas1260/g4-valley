# 🚀 Como Gerar o Build - G4Vallues

## ⚡ Método 1: Script Automático (MAIS FÁCIL)

### Abra o Terminal e execute:

```bash
cd /Users/soares/Desktop/Projetos/g4vallues
chmod +x gerar-build.sh
./gerar-build.sh
```

---

## 🔧 Método 2: Comando Direto

### Abra o Terminal e execute:

```bash
cd /Users/soares/Desktop/Projetos/g4vallues
npm run build
```

---

## ✅ O Que Será Gerado

Após executar o build, os arquivos serão criados em:

```
dist/
├── index.html
└── assets/
    ├── index-xxx.js      (JavaScript com textos responsivos)
    ├── index-xxx.css     (Estilos otimizados)
    └── [imagem].png      (Imagens)
```

---

## 📊 Alterações Incluídas Neste Build

### ✅ Textos Justificados
Todos os textos estão com `text-justify` aplicado.

### ✅ Textos Responsivos

| Dispositivo | Comportamento |
|-------------|---------------|
| 📱 **Mobile** (até 767px) | Textos **resumidos** (leitura rápida) |
| 💻 **Desktop/Tablet** (768px+) | Textos **expandidos** com detalhes técnicos |

### ✅ Componentes Atualizados

1. **HeroSection**
   - Parágrafo principal com 2 versões
   - Subtítulo "20 anos" com 2 versões

2. **ProblemsSection**
   - Seção "A boa notícia" com 2 versões

3. **ServicesSection**
   - Título da seção com 2 versões
   - Todos os 4 serviços (IA, ERP, CRM, E-commerce) com 2 versões cada

4. **CredibilitySection**
   - 3 cards principais com 2 versões cada
   - 6 competências com 2 versões cada

**Total:** 21 textos diferentes para mobile e desktop!

---

## 🌐 Após o Build

### 1️⃣ Os arquivos estarão em:
```
/Users/soares/Desktop/Projetos/g4vallues/dist/
```

### 2️⃣ Copie TODO o conteúdo de `dist/` para:
```
swapsoft.com.br/novidades/
```

### 3️⃣ Acesse e teste:
```
https://swapsoft.com.br/novidades/
```

---

## 🧪 Como Testar os Textos Responsivos

### Teste Mobile (textos resumidos):
1. Abra o site
2. Abra as Ferramentas de Desenvolvedor (F12)
3. Clique no ícone de dispositivo móvel (Toggle Device Toolbar)
4. Escolha um dispositivo mobile (iPhone, Galaxy, etc.)
5. Veja os textos resumidos

### Teste Desktop (textos expandidos):
1. Abra o site
2. Maximize a janela do navegador
3. Veja os textos expandidos com mais detalhes

### Teste Ao Vivo:
- Redimensione a janela do navegador
- Ao passar de 768px, os textos mudarão automaticamente!

---

## 🆘 Se Houver Erros

### Erro: "npm: command not found"
```bash
# Instale o Node.js:
# https://nodejs.org/
```

### Erro: "Cannot find module"
```bash
# Reinstale as dependências:
cd /Users/soares/Desktop/Projetos/g4vallues
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro: "Permission denied"
```bash
# Dê permissão ao script:
chmod +x gerar-build.sh
./gerar-build.sh
```

---

## 📝 Verificação Rápida

Após o build, verifique se os arquivos foram criados:

```bash
ls -lh dist/
```

Você deve ver:
```
index.html
assets/
```

---

## 🎉 Pronto!

Depois de gerar o build:
1. ✅ Copie os arquivos de `dist/` para o servidor
2. ✅ Acesse https://swapsoft.com.br/novidades/
3. ✅ Teste em mobile e desktop
4. ✅ Veja os textos mudando automaticamente!

---

**Configuração atual:**
- ✅ Base path: `/novidades/`
- ✅ Output: `dist/`
- ✅ Otimizações: minificação, tree-shaking
- ✅ Textos responsivos: mobile (resumido) / desktop (expandido)

