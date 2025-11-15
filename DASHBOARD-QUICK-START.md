# 🚀 Dashboard Analytics - Quick Start

## ⚡ Início Rápido

### 1️⃣ Iniciar Servidor Analytics

```bash
cd server
npm install
npm start
```

✅ Servidor rodando em: **http://localhost:3001**

### 2️⃣ Iniciar Frontend

```bash
# Voltar para raiz do projeto
cd ..

# Iniciar frontend
npm run dev
```

✅ Site rodando em: **http://localhost:3000**

### 3️⃣ Acessar Dashboard

Abra o navegador:

```
http://localhost:3000/statics
```

---

## 📊 O Que Você Verá

✅ Total de visitantes únicos  
✅ Total de visualizações de páginas  
✅ Total de eventos/cliques  
✅ Total de formulários enviados  
✅ Visitantes por dispositivo (Desktop/Mobile/Tablet)  
✅ Navegadores mais usados  
✅ Páginas mais visitadas  
✅ Tempo médio no site  
✅ Taxa de conversão  
✅ Visitantes recentes (detalhes completos)  
✅ Eventos/cliques recentes  
✅ Formulários submetidos  

---

## 🔄 Filtros

- **Todos** - Todo o histórico
- **Hoje** - Apenas hoje
- **Esta Semana** - Últimos 7 dias
- **Este Mês** - Últimos 30 dias

---

## 💾 Exportar Dados

Clique no botão **"Exportar Dados"** para baixar um JSON completo com todos os dados.

---

## 🛡️ Segurança

⚠️ **IMPORTANTE:** Antes de colocar em produção, proteja a rota `/statics` com senha!

Veja detalhes em: `DASHBOARD-ACESSO.md`

---

## 📝 Comandos Úteis

### Ver dados no banco:
```bash
cd server
sqlite3 analytics.db
.tables
SELECT * FROM visitors;
.quit
```

### Reiniciar servidor:
```bash
cd server
npm start
```

### Ver estatísticas via API:
```
http://localhost:3001/api/analytics/stats
```

---

## 🎯 URLs Importantes

| Descrição | URL |
|-----------|-----|
| Site Principal | http://localhost:3000 |
| Dashboard | http://localhost:3000/statics |
| API Stats | http://localhost:3001/api/analytics/stats |
| Banco de Dados | server/analytics.db |

---

## ✅ Checklist

- [ ] Servidor rodando (porta 3001)
- [ ] Frontend rodando (porta 3000)
- [ ] Dashboard acessível em /statics
- [ ] Dados sendo coletados
- [ ] Banco de dados criado (server/analytics.db)

---

**Dashboard pronto para uso! 🎉**

