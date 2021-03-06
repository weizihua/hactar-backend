const env = process.env;

/**
 * Stores all env configurations and their default values.
 */
const config = Object.freeze({
    db: {
        database: process.env.DB_NAME || "nodefactory",
        define: {
            underscored: true,
        },
        ssl: !!process.env.DB_SSL,
        dialect: process.env.DB_DIALECT || "postgres",
        host: process.env.DB_HOST || "db",
        password: process.env.DB_PASSWORD || "nodefactory",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || "nodefactory",
    },
    origin: process.env.ORIGIN || "https://analytics.hactar.app",
    env: process.env.NODE_ENV || "dev",
    port: env.SERVER_PORT || 3000,
    jwtKey: process.env.JWT_KEY || "nodefactory",
    jwtExpiry: process.env.JWT_EXPIRY || '24h',
    sendinblue: {
        apiKey: process.env.EMAIL_API_KEY,
        apiUrl: process.env.EMAIL_API_URL || "https://api.sendinblue.com/v3/smtp/email",
        nodeUptimeNotifEmailTemplateId: Number(process.env.EMAIL_UPTIME_NOTIF_TEMPLATE_ID) || 2,
        retryCount: process.env.EMAIL_RETRY_COUNT || 3
    },
    // cron like definition (every hour by default)
    uptimeNotificationsRecurrenceRule: process.env.UPTIME_NOTIF_RECURRENCE || "0 * * * *",
    elasticsearch: {
        url: process.env.ELASTIC_LOG_URL || "http://localhost",
        port: process.env.ELASTIC_LOG_PORT || 9200,
        level: process.env.ELASTIC_LOG_LEVEL || "info"
    },
    logging: {
        es: process.env.ELASTIC_LOGGING || "disabled"
    }
});

export default config;
