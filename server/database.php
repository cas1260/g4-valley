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
        // ====================================================================
        // TABELA DE VISITANTES
        // ====================================================================
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS visitors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT UNIQUE NOT NULL,
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

        // ====================================================================
        // TABELA DE PAGE VIEWS
        // ====================================================================
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS page_views (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                page_url TEXT NOT NULL,
                page_title TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                time_spent INTEGER DEFAULT 0,
                FOREIGN KEY (session_id) REFERENCES visitors(session_id)
            )
        ");

        // ====================================================================
        // TABELA DE EVENTOS
        // ====================================================================
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                event_type TEXT NOT NULL,
                event_name TEXT NOT NULL,
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

        // ====================================================================
        // TABELA DE FORMULÁRIOS
        // ====================================================================
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS form_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                form_name TEXT NOT NULL,
                form_data TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES visitors(session_id)
            )
        ");

        // ====================================================================
        // TABELA DE CONTATOS (Formulário de Agendamento)
        // ====================================================================
        $this->db->exec("
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                company TEXT,
                service TEXT NOT NULL,
                message TEXT,
                ip_address TEXT,
                user_agent TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                email_sent INTEGER DEFAULT 0,
                email_sent_at DATETIME
            )
        ");

        // ====================================================================
        // ÍNDICES PARA PERFORMANCE
        // ====================================================================
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_visitors_session ON visitors(session_id)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_pageviews_session ON page_views(session_id)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_pageviews_timestamp ON page_views(timestamp)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_forms_session ON form_submissions(session_id)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)");
        $this->db->exec("CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at)");
    }

    // ========================================================================
    // MÉTODOS PARA SALVAR DADOS
    // ========================================================================

    public function saveVisitor($data) {
        $stmt = $this->db->prepare("
            INSERT OR REPLACE INTO visitors (
                session_id, user_agent, browser, os, device_type,
                screen_width, screen_height, language, timezone, referrer, ip_address
            ) VALUES (
                :session_id, :user_agent, :browser, :os, :device_type,
                :screen_width, :screen_height, :language, :timezone, :referrer, :ip_address
            )
        ");

        $stmt->execute([
            ':session_id' => $data['sessionId'] ?? '',
            ':user_agent' => $data['userAgent'] ?? '',
            ':browser' => $data['browser'] ?? '',
            ':os' => $data['os'] ?? '',
            ':device_type' => $data['deviceType'] ?? '',
            ':screen_width' => $data['screenWidth'] ?? 0,
            ':screen_height' => $data['screenHeight'] ?? 0,
            ':language' => $data['language'] ?? '',
            ':timezone' => $data['timezone'] ?? '',
            ':referrer' => $data['referrer'] ?? '',
            ':ip_address' => $this->getRealIpAddress()
        ]);

        return $this->db->lastInsertId();
    }

    public function savePageView($data) {
        $stmt = $this->db->prepare("
            INSERT INTO page_views (
                session_id, page_url, page_title, time_spent
            ) VALUES (
                :session_id, :page_url, :page_title, :time_spent
            )
        ");

        $stmt->execute([
            ':session_id' => $data['sessionId'] ?? '',
            ':page_url' => $data['pageUrl'] ?? '',
            ':page_title' => $data['pageTitle'] ?? '',
            ':time_spent' => $data['timeSpent'] ?? 0
        ]);

        return $this->db->lastInsertId();
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

        $stmt->execute([
            ':session_id' => $data['sessionId'] ?? '',
            ':event_type' => $data['eventType'] ?? '',
            ':event_name' => $data['eventName'] ?? '',
            ':event_data' => json_encode($data['eventData'] ?? []),
            ':click_x' => $data['clickX'] ?? null,
            ':click_y' => $data['clickY'] ?? null,
            ':element_tag' => $data['elementTag'] ?? null,
            ':element_id' => $data['elementId'] ?? null,
            ':element_class' => $data['elementClass'] ?? null,
            ':page_url' => $data['pageUrl'] ?? ''
        ]);

        return $this->db->lastInsertId();
    }

    public function saveFormSubmission($data) {
        $stmt = $this->db->prepare("
            INSERT INTO form_submissions (
                session_id, form_name, form_data
            ) VALUES (
                :session_id, :form_name, :form_data
            )
        ");

        $stmt->execute([
            ':session_id' => $data['sessionId'] ?? '',
            ':form_name' => $data['formName'] ?? '',
            ':form_data' => json_encode($data['formData'] ?? [])
        ]);

        return $this->db->lastInsertId();
    }

    public function saveContact($data) {
        $stmt = $this->db->prepare("
            INSERT INTO contacts (
                name, email, phone, company, service, message, ip_address, user_agent
            ) VALUES (
                :name, :email, :phone, :company, :service, :message, :ip_address, :user_agent
            )
        ");

        $stmt->execute([
            ':name' => $data['name'] ?? '',
            ':email' => $data['email'] ?? '',
            ':phone' => $data['phone'] ?? '',
            ':company' => $data['company'] ?? '',
            ':service' => $data['service'] ?? '',
            ':message' => $data['message'] ?? '',
            ':ip_address' => $this->getRealIpAddress(),
            ':user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
        ]);

        return $this->db->lastInsertId();
    }

    public function markEmailSent($contactId) {
        $stmt = $this->db->prepare("
            UPDATE contacts 
            SET email_sent = 1, email_sent_at = CURRENT_TIMESTAMP 
            WHERE id = :id
        ");
        
        $stmt->execute([':id' => $contactId]);
    }

    // ========================================================================
    // MÉTODOS PARA OBTER ESTATÍSTICAS
    // ========================================================================

    public function getStats($filter = 'all') {
        $whereClause = $this->getFilterWhereClause($filter);
        $visitorStats = $this->getVisitorStats($whereClause);

        return [
            // Campos diretos para o React
            'totalVisitors' => $visitorStats['total'],
            'visitorsToday' => $visitorStats['today'],
            'visitorsThisWeek' => $visitorStats['week'],
            'visitorsThisMonth' => $visitorStats['month'],
            'totalPageViews' => $this->getPageViewStats($whereClause),
            'totalEvents' => $this->getEventStats($whereClause),
            'totalForms' => $this->getFormStats($whereClause),
            'deviceTypes' => $this->getDeviceStats($whereClause),
            'browsers' => $this->getBrowserStats($whereClause),
            'topPages' => $this->getTopPages($whereClause),
            'clickHeatmap' => $this->getClickHeatmap($whereClause),
            'avgTimeOnSite' => $this->getAvgTimeOnSite($whereClause),
            'conversionRate' => $this->getConversionRate(),
            'recentVisitors' => $this->getRecentVisitors(),
            'recentPageViews' => $this->getRecentPageViews(),
            'recentEvents' => $this->getRecentEvents(),
            'recentForms' => $this->getRecentForms(),
            'topClickedElements' => $this->getTopClickedElements($whereClause),
            'uniqueIPs' => $this->getUniqueIPs(),
            
            // Manter estrutura antiga para compatibilidade
            'visitors' => $visitorStats,
            'pageViews' => $this->getPageViewStats($whereClause),
            'events' => $this->getEventStats($whereClause),
            'forms' => $this->getFormStats($whereClause),
            'devices' => $this->getDeviceStats($whereClause)
        ];
    }

    private function getFilterWhereClause($filter) {
        switch ($filter) {
            case 'today':
                return "DATE(timestamp) = DATE('now')";
            case 'week':
                return "DATE(timestamp) >= DATE('now', '-7 days')";
            case 'month':
                return "DATE(timestamp) >= DATE('now', '-30 days')";
            default:
                return "1=1";
        }
    }

    private function getVisitorStats($whereClause) {
        $stmt = $this->db->query("SELECT COUNT(DISTINCT session_id) as total FROM visitors");
        $total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

        $stmt = $this->db->query("
            SELECT COUNT(DISTINCT session_id) as today 
            FROM visitors 
            WHERE DATE(first_visit) = DATE('now')
        ");
        $today = $stmt->fetch(PDO::FETCH_ASSOC)['today'];

        $stmt = $this->db->query("
            SELECT COUNT(DISTINCT session_id) as week 
            FROM visitors 
            WHERE DATE(first_visit) >= DATE('now', '-7 days')
        ");
        $week = $stmt->fetch(PDO::FETCH_ASSOC)['week'];

        $stmt = $this->db->query("
            SELECT COUNT(DISTINCT session_id) as month 
            FROM visitors 
            WHERE DATE(first_visit) >= DATE('now', '-30 days')
        ");
        $month = $stmt->fetch(PDO::FETCH_ASSOC)['month'];

        return [
            'total' => $total,
            'today' => $today,
            'week' => $week,
            'month' => $month
        ];
    }

    private function getPageViewStats($whereClause) {
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM page_views WHERE $whereClause");
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    }

    private function getEventStats($whereClause) {
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM events WHERE $whereClause");
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    }

    private function getFormStats($whereClause) {
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM form_submissions WHERE $whereClause");
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    }

    private function getDeviceStats($whereClause) {
        $stmt = $this->db->query("
            SELECT device_type, COUNT(*) as count 
            FROM visitors 
            GROUP BY device_type
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getBrowserStats($whereClause) {
        $stmt = $this->db->query("
            SELECT browser, COUNT(*) as count 
            FROM visitors 
            GROUP BY browser
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getTopPages($whereClause) {
        $stmt = $this->db->query("
            SELECT page_url, COUNT(*) as views 
            FROM page_views 
            WHERE $whereClause
            GROUP BY page_url 
            ORDER BY views DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getClickHeatmap($whereClause) {
        $stmt = $this->db->query("
            SELECT click_x, click_y, page_url, COUNT(*) as count 
            FROM events 
            WHERE $whereClause AND click_x IS NOT NULL AND click_y IS NOT NULL
            GROUP BY click_x, click_y, page_url
            ORDER BY count DESC
            LIMIT 100
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getAvgTimeOnSite($whereClause) {
        $stmt = $this->db->query("
            SELECT AVG(time_spent) as avg_time 
            FROM page_views 
            WHERE $whereClause AND time_spent > 0
        ");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return round($result['avg_time'] ?? 0);
    }

    private function getConversionRate() {
        $totalVisitors = $this->db->query("SELECT COUNT(DISTINCT session_id) as total FROM visitors")->fetch(PDO::FETCH_ASSOC)['total'];
        $totalForms = $this->db->query("SELECT COUNT(*) as total FROM form_submissions")->fetch(PDO::FETCH_ASSOC)['total'];
        
        if ($totalVisitors == 0) return 0;
        return round(($totalForms / $totalVisitors) * 100, 2);
    }

    private function getRecentVisitors() {
        $stmt = $this->db->query("
            SELECT session_id, device_type, browser, os, first_visit, total_visits, ip_address
            FROM visitors 
            ORDER BY last_visit DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getRecentPageViews() {
        $stmt = $this->db->query("
            SELECT page_url, page_title, timestamp, time_spent
            FROM page_views 
            ORDER BY timestamp DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getRecentEvents() {
        $stmt = $this->db->query("
            SELECT event_type, event_name, event_data, timestamp, page_url, element_tag
            FROM events 
            ORDER BY timestamp DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getRecentForms() {
        $stmt = $this->db->query("
            SELECT form_name, form_data, timestamp
            FROM form_submissions 
            ORDER BY timestamp DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getTopClickedElements($whereClause) {
        $stmt = $this->db->query("
            SELECT element_tag, element_id, element_class, event_name, COUNT(*) as clicks
            FROM events 
            WHERE $whereClause AND element_tag IS NOT NULL
            GROUP BY element_tag, element_id, element_class, event_name
            ORDER BY clicks DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getUniqueIPs() {
        $stmt = $this->db->query("
            SELECT ip_address, COUNT(DISTINCT session_id) as sessions, MAX(last_visit) as last_visit, device_type, browser
            FROM visitors 
            WHERE ip_address IS NOT NULL
            GROUP BY ip_address
            ORDER BY sessions DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // ========================================================================
    // MÉTODOS AUXILIARES
    // ========================================================================

    public function getRealIpAddress() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            return $_SERVER['REMOTE_ADDR'] ?? null;
        }
    }

    public function getDB() {
        return $this->db;
    }
}
