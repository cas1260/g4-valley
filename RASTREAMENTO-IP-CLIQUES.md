# 🎯 Sistema de Rastreamento de IP e Cliques

## ✅ Implementações Realizadas

### 1. Registro de IP Real

**Backend (database.php):**
- ✅ Função `getRealIpAddress()` que captura o IP real mesmo atrás de proxies
- ✅ Verifica headers: `HTTP_CLIENT_IP`, `HTTP_X_FORWARDED_FOR`, `HTTP_X_REAL_IP`
- ✅ IP salvo automaticamente em todas as requisições

### 2. Rastreamento Detalhado de Cliques

**Novas informações capturadas:**
- ✅ **Posição X, Y** do clique na tela
- ✅ **Tag do elemento** clicado (`<button>`, `<a>`, etc)
- ✅ **ID do elemento**
- ✅ **Classes CSS do elemento**
- ✅ **URL da página** onde ocorreu o clique

### 3. Banco de Dados Atualizado

**Tabela `events` expandida com:**
```sql
- click_x INTEGER       ← Posição X do clique
- click_y INTEGER       ← Posição Y do clique  
- element_tag TEXT      ← Tag HTML (button, a, etc)
- element_id TEXT       ← ID do elemento
- element_class TEXT    ← Classes CSS
- page_url TEXT         ← URL da página
```

### 4. Dashboard /statics Atualizado

**Novas seções:**

#### 📍 IPs Únicos
- Lista todos os IPs que acessaram o site
- Total de sessões por IP
- Dispositivo e navegador
- Último acesso

#### 🖱️ Elementos Mais Clicados
- Ranking de elementos por número de cliques
- Tag HTML, ID e classes
- Total de cliques em cada

#### 🔥 Mapa de Calor de Cliques
- Posições X, Y onde mais clicam
- Página onde ocorreu
- Total de cliques em cada posição

#### 📋 Eventos Detalhados
- Lista de todos os cliques
- Elemento clicado completo
- Posição exata (X, Y)
- Página e horário

---

## 📊 O Que o Dashboard Agora Mostra

### Seção 1: IPs Únicos
```
┌─────────────────────────────────────────────────┐
│ Endereço IP        │ Sessões │ Device  │ Browser │
├─────────────────────────────────────────────────┤
│ 177.123.45.67     │    5    │ Desktop │ Chrome  │
│ 189.234.56.78     │    3    │ Mobile  │ Safari  │
│ 201.45.67.89      │    2    │ Tablet  │ Firefox │
└─────────────────────────────────────────────────┘
```

### Seção 2: Elementos Mais Clicados
```
┌──────────────────────────────────────────────────┐
│ Elemento      │ ID          │ Classes   │ Cliques │
├──────────────────────────────────────────────────┤
│ <button>     │ cta-button  │ btn-primary│   45   │
│ <a>          │ whatsapp    │ btn-green  │   32   │
│ <button>     │ ver-mais    │ btn-second │   28   │
└──────────────────────────────────────────────────┘
```

### Seção 3: Mapa de Calor
```
┌─────────────────────────────────────────────┐
│ Posição X │ Posição Y │ Página    │ Cliques │
├─────────────────────────────────────────────┤
│   850px  │   450px   │ /         │   23    │
│   920px  │   520px   │ /         │   18    │
│  1100px  │   380px   │ /servicos │   15    │
└─────────────────────────────────────────────┘
```

### Seção 4: Eventos Detalhados
```
┌────────────────────────────────────────────────────────┐
│ Elemento          │ Posição  │ Página    │ Data/Hora  │
├────────────────────────────────────────────────────────┤
│ <button id="cta"> │ 850, 450 │ /         │ 20:45:23   │
│ <a id="whatsapp"> │ 920, 520 │ /         │ 20:44:12   │
│ <button>          │ 1100,380 │ /servicos │ 20:43:05   │
└────────────────────────────────────────────────────────┘
```

---

## 🔧 Como Funciona

### No Frontend (useAnalytics.ts):

```typescript
// Captura clique com posição
const handleClick = (e: MouseEvent) => {
  const clickX = e.clientX;
  const clickY = e.clientY + window.scrollY;
  
  trackEvent('click', 'button_click', {
    clickX,
    clickY,
    elementTag: target.tagName,
    id: target.id,
    className: target.className,
    pageUrl: window.location.pathname
  });
};
```

### No Backend (database.php):

```php
// Captura IP real
private function getRealIpAddress() {
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    }
    return $_SERVER['REMOTE_ADDR'];
}

// Salva evento com detalhes
public function saveEvent($data) {
    INSERT INTO events (
        click_x, click_y, element_tag, 
        element_id, element_class, page_url
    ) VALUES (...)
}
```

---

## 🧪 Próximos Passos

### 1. Fazer Novo Build

```bash
cd /Users/soares/Desktop/Projetos/g4vallues
sudo rm -rf dist novidades
npm run build
mkdir novidades
cp -r dist/* novidades/
cp -r server novidades/server
cp public/.htaccess novidades/.htaccess
```

### 2. Upload Completo

Envie toda a pasta `novidades/` via FTP

### 3. Deletar Banco Antigo (Opcional)

Se quiser começar do zero com a nova estrutura:

```bash
# Via SSH no servidor
rm /public_html/novidades/server/analytics.db
```

O banco será recriado automaticamente com a nova estrutura.

### 4. Testar

- Acessar: `https://swapsoft.com.br/novidades/`
- Clicar em vários botões
- Acessar dashboard: `https://swapsoft.com.br/novidades/statics`
- Verificar dados de IP e cliques

---

## 📊 Análises Possíveis

Com esses dados você pode:

### 1. Identificar Visitantes Recorrentes
- Ver IPs que retornam múltiplas vezes
- Analisar padrão de comportamento

### 2. Mapa de Calor Visual
- Descobrir onde as pessoas mais clicam
- Otimizar posicionamento de CTAs

### 3. Elementos com Problema
- Se um botão tem poucos cliques, pode estar mal posicionado
- Testar diferentes posições

### 4. Jornada do Usuário
- Ver sequência de cliques
- Entender fluxo de navegação

### 5. A/B Testing
- Comparar cliques em diferentes versões
- Validar mudanças de layout

---

## 🔍 Queries SQL Úteis

### Cliques por hora do dia:
```sql
SELECT 
    strftime('%H', timestamp) as hour,
    COUNT(*) as clicks
FROM events 
WHERE event_type = 'click'
GROUP BY hour
ORDER BY hour;
```

### Sessões por IP:
```sql
SELECT 
    ip_address,
    COUNT(DISTINCT session_id) as sessions,
    AVG(total_visits) as avg_visits
FROM visitors
GROUP BY ip_address
ORDER BY sessions DESC;
```

### Elementos clicados em uma área específica:
```sql
SELECT 
    element_tag,
    element_id,
    COUNT(*) as clicks
FROM events
WHERE click_x BETWEEN 800 AND 1000
  AND click_y BETWEEN 400 AND 600
GROUP BY element_tag, element_id;
```

---

## 🛡️ Privacidade

### Dados Coletados:
- ✅ IP (identificação de acesso)
- ✅ Posição de cliques (comportamento)
- ✅ Elementos clicados (interações)

### Não Coletamos:
- ❌ Informações pessoais sensíveis
- ❌ Senhas ou dados de pagamento
- ❌ Conteúdo de formulários (apenas que foi enviado)

### LGPD:
- Dados armazenados localmente
- Sem compartilhamento com terceiros
- Usar apenas para análise interna

---

## ✅ Resumo

| Recurso | Status |
|---------|--------|
| Captura de IP Real | ✅ Implementado |
| Posição X, Y dos Cliques | ✅ Implementado |
| Detalhes do Elemento | ✅ Implementado |
| Dashboard IPs | ✅ Implementado |
| Dashboard Elementos | ✅ Implementado |
| Dashboard Mapa de Calor | ✅ Implementado |
| Dashboard Eventos Detalhados | ✅ Implementado |
| Banco de Dados Atualizado | ✅ Implementado |

---

**Sistema completo de rastreamento implementado! 🎯**

Faça novo build e upload para ver tudo funcionando!

