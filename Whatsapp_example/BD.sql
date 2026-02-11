CREATE TABLE users_whatsapp (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    status ENUM('active', 'inactive', 'blocked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_notification DATETIME
);

CREATE TABLE whatsapp_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(20),
    message TEXT,
    direction ENUM('outgoing', 'incoming'),
    status ENUM('sent', 'delivered', 'read', 'failed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_type VARCHAR(50),
    user_id INT,
    message_sent TEXT,
    status VARCHAR(20),
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
);