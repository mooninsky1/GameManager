var app = {
    user: 'sa',
    password: '123456',
    server: '192.168.31.118',
    database: 'nodetest',
    port: 1028,
    options: {
    encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

module.exports = app;