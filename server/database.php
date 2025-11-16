<?php
require_once 'config.php';

class AnalyticsDB {
    private $db;

    public function __construct() {
        try {
            $this->db = new PDO('sqlite:' . DB_PATH);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->createTables();
        } catch (PDOException $e) {
            error_log('Database connection error: ' . $e->getMessage());
            throw $e;
        }
    }

    private function createTables() {
        // Tabela de visitantes
        $this->db->exec("
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
        ");

        // Tabela de page views
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS page_views (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                page_url TEXT,
                page_title TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                time_spent INTEGER,
                FOREIGN KEY (session_id) REFERENCES visitors(session_id)
            )
        ");

        // Tabela de eventos
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                event_type TEXT,
                event_name TEXT,
                event_data TEXT,
                click_x INTEGER,
                click_y INTEGER,
                element_tag TEXT,
                element_id TEXT,
                element_class TEXT,
                page_url TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES visitors(session_id)
            )
        ");

        // Tabela de formulários
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS form_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                form_name TEXT,
                form_data TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES visitors(session_id)
            )
        ");
    }

    public function saveVisitor($data) {
        // Capturar IP real (considerando proxies)
        $ip = $this->getRealIpAddress();
        
        // Verificar se visitante já existe
        $stmt = $this->db->prepare('SELECT id FROM visitors WHERE session_id = :session_id');
        $stmt->execute([':session_id' => $data['sessionId']]);
        $existing = $stmt->fetch();

        if ($existing) {
            // Atualizar visitante existente
            $sql = "UPDATE visitors SET 
                last_visit = CURRENT_TIMESTAMP,
                total_visits = total_visits + 1,
                user_agent = :user_agent,
                browser = :browser,
                os = :os,
                device_type = :device_type,
                screen_width = :screen_width,
                screen_height = :screen_height,
                language = :language,
                timezone = :timezone,
                referrer = :referrer,
                ip_address = :ip_address,
                country = :country,
                city = :city
                WHERE session_id = :session_id";
        } else {
            // Inserir novo visitante
            $sql = "INSERT INTO visitors (
                session_id, user_agent, browser, os, device_type,
                screen_width, screen_height, language, timezone,
                referrer, ip_address, country, city
            ) VALUES (
                :session_id, :user_agent, :browser, :os, :device_type,
                :screen_width, :screen_height, :language, :timezone,
                :referrer, :ip_address, :country, :city
            )";
        }

        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':session_id' => $data['sessionId'],
            ':user_agent' => $data['userAgent'] ?? null,
            ':browser' => $data['browser'] ?? null,
            ':os' => $data['os'] ?? null,
            ':device_type' => $data['deviceType'] ?? null,
            ':screen_width' => $data['screenWidth'] ?? null,
            ':screen_height' => $data['screenHeight'] ?? null,
            ':language' => $data['language'] ?? null,
            ':timezone' => $data['timezone'] ?? null,
            ':referrer' => $data['referrer'] ?? null,
            ':ip_address' => $ip,
            ':country' => $data['country'] ?? null,
            ':city' => $data['city'] ?? null,
        ]);
    }
    
    private function getRealIpAddress() {
        // Tentar obter IP real considerando proxies
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // Pode conter múltiplos IPs separados por vírgula
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            return trim($ips[0]);
        } elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
            return $_SERVER['HTTP_X_REAL_IP'];
        } else {
            return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        }
    }

    public function savePageView($data) {
        $stmt = $this->db->prepare("
            INSERT INTO page_views (session_id, page_url, page_title, time_spent)
            VALUES (:session_id, :page_url, :page_title, :time_spent)
        ");
        
        return $stmt->execute([
            ':session_id' => $data['sessionId'],
            ':page_url' => $data['pageUrl'],
            ':page_title' => $data['pageTitle'],
            ':time_spent' => $data['timeSpent'] ?? 0,
        ]);
    }

    public function saveEvent($data) {
        $stmt = $this->db->prepare("
            INSERT INTO events (
                session_id, event_type, event_name, event_data,
                click_x, click_y, element_tag, element_id, element_class, page_url
            ) VALUES (
                :session_id, :event_type, :event_name, :event_data,
                :click_x, :click_y, :element_tag, :element_id, :element_class, :page_url
            )
        ");
        
        return $stmt->execute([
            ':session_id' => $data['sessionId'],
            ':event_type' => $data['eventType'],
            ':event_name' => $data['eventName'],
            ':event_data' => json_encode($data['eventData'] ?? []),
            ':click_x' => $data['clickX'] ?? null,
            ':click_y' => $data['clickY'] ?? null,
            ':element_tag' => $data['elementTag'] ?? null,
            ':element_id' => $data['elementId'] ?? null,
            ':element_class' => $data['elementClass'] ?? null,
            ':page_url' => $data['pageUrl'] ?? null,
        ]);
    }

    public function saveFormSubmission($data) {
        $stmt = $this->db->prepare("
            INSERT INTO form_submissions (session_id, form_name, form_data)
            VALUES (:session_id, :form_name, :form_data)
        ");
        
        return $stmt->execute([
            ':session_id' => $data['sessionId'],
            ':form_name' => $data['formName'],
            ':form_data' => json_encode($data['formData']),
        ]);
    }

    public function getStats($filter = 'all') {
        $dateFilter = '';
        
        switch ($filter) {
            case 'today':
                $dateFilter = "AND DATE(first_visit) = DATE('now')";
                break;
            case 'week':
                $dateFilter = "AND first_visit >= DATE('now', '-7 days')";
                break;
            case 'month':
                $dateFilter = "AND first_visit >= DATE('now', '-30 days')";
                break;
        }

        $stats = [];

        // Total de visitantes
        $stmt = $this->db->query("SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE 1=1 $dateFilter");
        $stats['totalVisitors'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Total de page views
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM page_views");
        $stats['totalPageViews'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Total de eventos
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM events");
        $stats['totalEvents'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Total de formulários
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM form_submissions");
        $stats['totalForms'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Visitantes por dispositivo
        $stmt = $this->db->query("SELECT device_type, COUNT(*) as count FROM visitors WHERE 1=1 $dateFilter GROUP BY device_type");
        $stats['deviceTypes'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Páginas mais visitadas
        $stmt = $this->db->query("SELECT page_url, COUNT(*) as count FROM page_views GROUP BY page_url ORDER BY count DESC LIMIT 10");
        $stats['topPages'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Navegadores mais usados
        $stmt = $this->db->query("SELECT browser, COUNT(*) as count FROM visitors WHERE 1=1 $dateFilter GROUP BY browser ORDER BY count DESC");
        $stats['browsers'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Visitantes recentes
        $stmt = $this->db->query("SELECT * FROM visitors ORDER BY first_visit DESC LIMIT 20");
        $stats['recentVisitors'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Page views recentes
        $stmt = $this->db->query("SELECT * FROM page_views ORDER BY timestamp DESC LIMIT 20");
        $stats['recentPageViews'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Eventos recentes com detalhes de clique
        $stmt = $this->db->query("SELECT * FROM events ORDER BY timestamp DESC LIMIT 50");
        $stats['recentEvents'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Mapa de calor de cliques
        $stmt = $this->db->query("
            SELECT click_x, click_y, COUNT(*) as count, page_url
            FROM events 
            WHERE click_x IS NOT NULL AND click_y IS NOT NULL
            GROUP BY click_x, click_y, page_url
            ORDER BY count DESC
            LIMIT 100
        ");
        $stats['clickHeatmap'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Elementos mais clicados
        $stmt = $this->db->query("
            SELECT 
                element_tag, 
                element_id, 
                element_class, 
                event_name,
                COUNT(*) as clicks
            FROM events 
            WHERE event_type = 'click' AND element_tag IS NOT NULL
            GROUP BY element_tag, element_id, element_class, event_name
            ORDER BY clicks DESC
            LIMIT 20
        ");
        $stats['topClickedElements'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // IPs únicos com total de acessos
        $stmt = $this->db->query("
            SELECT 
                ip_address, 
                COUNT(DISTINCT session_id) as sessions,
                MAX(last_visit) as last_visit,
                device_type,
                browser
            FROM visitors 
            WHERE ip_address IS NOT NULL AND ip_address != 'unknown'
            GROUP BY ip_address
            ORDER BY sessions DESC, last_visit DESC
            LIMIT 50
        ");
        $stats['uniqueIPs'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Formulários recentes
        $stmt = $this->db->query("SELECT * FROM form_submissions ORDER BY timestamp DESC LIMIT 10");
        $stats['recentForms'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Visitantes hoje
        $stmt = $this->db->query("SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE DATE(first_visit) = DATE('now')");
        $stats['visitorsToday'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Visitantes esta semana
        $stmt = $this->db->query("SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE first_visit >= DATE('now', '-7 days')");
        $stats['visitorsThisWeek'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Visitantes este mês
        $stmt = $this->db->query("SELECT COUNT(DISTINCT session_id) as total FROM visitors WHERE first_visit >= DATE('now', '-30 days')");
        $stats['visitorsThisMonth'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        // Tempo médio no site
        $stmt = $this->db->query("SELECT AVG(time_spent) as avg FROM page_views WHERE time_spent > 0");
        $stats['avgTimeOnSite'] = round($stmt->fetch(PDO::FETCH_ASSOC)['avg'] ?? 0);

        // Taxa de conversão
        $stats['conversionRate'] = $stats['totalVisitors'] > 0 
            ? ($stats['totalForms'] / $stats['totalVisitors']) * 100 
            : 0;

        return $stats;
    }

    public function exportAllData() {
        $data = [];

        $data['visitors'] = $this->db->query("SELECT * FROM visitors")->fetchAll(PDO::FETCH_ASSOC);
        $data['pageViews'] = $this->db->query("SELECT * FROM page_views")->fetchAll(PDO::FETCH_ASSOC);
        $data['events'] = $this->db->query("SELECT * FROM events")->fetchAll(PDO::FETCH_ASSOC);
        $data['formSubmissions'] = $this->db->query("SELECT * FROM form_submissions")->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
}

