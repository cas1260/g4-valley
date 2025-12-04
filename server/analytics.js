const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Criar/conectar banco de dados
const dbPath = path.join(__dirname, 'analytics.db');
const db = new sqlite3.Database(dbPath);

// Criar tabelas
db.serialize(() => {
  // Tabela de visitantes
  db.run(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE,
      first_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_visit DATETIME DEFAULT CURRENT_TIMESTAMP,
      total_visits INTEGER DEFAULT 1,
      user_agent TEXT,
      browser TEXT,
      os TEXT,
      device_type TEXT,
      screen_width INTEGER,
      screen_height INTEGER,
      language TEXT,
      timezone TEXT,
      referrer TEXT,
      ip_address TEXT,
      country TEXT,
      city TEXT
    )
  `);

  // Tabela de page views
  db.run(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      page_url TEXT,
      page_title TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      time_spent INTEGER,
      FOREIGN KEY (session_id) REFERENCES visitors(session_id)
    )
  `);

  // Tabela de eventos/cliques
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      event_type TEXT,
      event_name TEXT,
      event_data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES visitors(session_id)
    )
  `);

  // Tabela de formulários
  db.run(`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      form_name TEXT,
      form_data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES visitors(session_id)
    )
  `);
});

// Endpoint para registrar/atualizar visitante
app.post('/api/analytics/visitor', (req, res) => {
  const {
    sessionId,
    userAgent,
    browser,
    os,
    deviceType,
    screenWidth,
    screenHeight,
    language,
    timezone,
    referrer,
    ipAddress,
    country,
    city
  } = req.body;

  // Verificar se o visitante já existe
  db.get('SELECT * FROM visitors WHERE session_id = ?', [sessionId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      // Atualizar visitante existente
      db.run(
        `UPDATE visitors SET 
          last_visit = CURRENT_TIMESTAMP,
          total_visits = total_visits + 1,
          user_agent = ?,
          browser = ?,
          os = ?,
          device_type = ?,
          screen_width = ?,
          screen_height = ?,
          language = ?,
          timezone = ?,
          referrer = ?,
          ip_address = ?,
          country = ?,
          city = ?
        WHERE session_id = ?`,
        [userAgent, browser, os, deviceType, screenWidth, screenHeight, language, timezone, referrer, ipAddress, country, city, sessionId],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Visitor updated', sessionId });
        }
      );
    } else {
      // Inserir novo visitante
      db.run(
        `INSERT INTO visitors (
          session_id, user_agent, browser, os, device_type,
          screen_width, screen_height, language, timezone,
          referrer, ip_address, country, city
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [sessionId, userAgent, browser, os, deviceType, screenWidth, screenHeight, language, timezone, referrer, ipAddress, country, city],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Visitor created', sessionId });
        }
      );
    }
  });
});

// Endpoint para registrar page view
app.post('/api/analytics/pageview', (req, res) => {
  const { sessionId, pageUrl, pageTitle, timeSpent } = req.body;

  db.run(
    'INSERT INTO page_views (session_id, page_url, page_title, time_spent) VALUES (?, ?, ?, ?)',
    [sessionId, pageUrl, pageTitle, timeSpent],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Page view recorded' });
    }
  );
});

// Endpoint para registrar evento
app.post('/api/analytics/event', (req, res) => {
  const { sessionId, eventType, eventName, eventData } = req.body;

  db.run(
    'INSERT INTO events (session_id, event_type, event_name, event_data) VALUES (?, ?, ?, ?)',
    [sessionId, eventType, eventName, JSON.stringify(eventData)],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Event recorded' });
    }
  );
});

// Endpoint para registrar submissão de formulário
app.post('/api/analytics/form', (req, res) => {
  const { sessionId, formName, formData } = req.body;

  db.run(
    'INSERT INTO form_submissions (session_id, form_name, form_data) VALUES (?, ?, ?)',
    [sessionId, formName, JSON.stringify(formData)],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Form submission recorded' });
    }
  );
});

// Endpoint para obter estatísticas
app.get('/api/analytics/stats', (req, res) => {
  const filter = req.query.filter || 'all';
  let dateFilter = '';
  
  if (filter === 'today') {
    dateFilter = "AND DATE(first_visit) = DATE('now')";
  } else if (filter === 'week') {
    dateFilter = "AND first_visit >= DATE('now', '-7 days')";
  } else if (filter === 'month') {
    dateFilter = "AND first_visit >= DATE('now', '-30 days')";
  }

  const stats = {};

  // Total de visitantes
  db.get(`SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE 1=1 ${dateFilter}`, (err, row) => {
    stats.totalVisitors = row.total;

    // Total de page views
    db.get('SELECT COUNT(*) as total FROM page_views', (err, row) => {
      stats.totalPageViews = row.total;

      // Total de eventos
      db.get('SELECT COUNT(*) as total FROM events', (err, row) => {
        stats.totalEvents = row.total;

        // Total de formulários
        db.get('SELECT COUNT(*) as total FROM form_submissions', (err, row) => {
          stats.totalForms = row.total;

          // Visitantes por dispositivo
          db.all(`SELECT device_type, COUNT(*) as count FROM visitors WHERE 1=1 ${dateFilter} GROUP BY device_type`, (err, rows) => {
            stats.deviceTypes = rows;

            // Páginas mais visitadas
            db.all('SELECT page_url, COUNT(*) as count FROM page_views GROUP BY page_url ORDER BY count DESC LIMIT 10', (err, rows) => {
              stats.topPages = rows;

              // Navegadores mais usados
              db.all(`SELECT browser, COUNT(*) as count FROM visitors WHERE 1=1 ${dateFilter} GROUP BY browser ORDER BY count DESC`, (err, rows) => {
                stats.browsers = rows;

                // Visitantes recentes
                db.all('SELECT * FROM visitors ORDER BY first_visit DESC LIMIT 20', (err, rows) => {
                  stats.recentVisitors = rows;

                  // Page views recentes
                  db.all('SELECT * FROM page_views ORDER BY timestamp DESC LIMIT 20', (err, rows) => {
                    stats.recentPageViews = rows;

                    // Eventos recentes
                    db.all('SELECT * FROM events ORDER BY timestamp DESC LIMIT 30', (err, rows) => {
                      stats.recentEvents = rows;

                      // Formulários recentes
                      db.all('SELECT * FROM form_submissions ORDER BY timestamp DESC LIMIT 10', (err, rows) => {
                        stats.recentForms = rows;

                        // Visitantes hoje
                        db.get("SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE DATE(first_visit) = DATE('now')", (err, row) => {
                          stats.visitorsToday = row.total;

                          // Visitantes esta semana
                          db.get("SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE first_visit >= DATE('now', '-7 days')", (err, row) => {
                            stats.visitorsThisWeek = row.total;

                            // Visitantes este mês
                            db.get("SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE first_visit >= DATE('now', '-30 days')", (err, row) => {
                              stats.visitorsThisMonth = row.total;

                              // Tempo médio no site
                              db.get('SELECT AVG(time_spent) as avg FROM page_views WHERE time_spent > 0', (err, row) => {
                                stats.avgTimeOnSite = Math.round(row.avg || 0);

                                // Taxa de conversão
                                if (stats.totalVisitors > 0) {
                                  stats.conversionRate = (stats.totalForms / stats.totalVisitors) * 100;
                                } else {
                                  stats.conversionRate = 0;
                                }

                                res.json(stats);
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// Endpoint para exportar todos os dados
app.get('/api/analytics/export', (req, res) => {
  const exportData = {};

  db.all('SELECT * FROM visitors', (err, rows) => {
    exportData.visitors = rows;

    db.all('SELECT * FROM page_views', (err, rows) => {
      exportData.pageViews = rows;

      db.all('SELECT * FROM events', (err, rows) => {
        exportData.events = rows;

        db.all('SELECT * FROM form_submissions', (err, rows) => {
          exportData.formSubmissions = rows;

          res.json(exportData);
        });
      });
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Analytics server running on http://localhost:${PORT}`);
  console.log(`Database: ${dbPath}`);
});

// Fechar banco ao encerrar
process.on('SIGINT', () => {
  db.close();
  process.exit();
});

