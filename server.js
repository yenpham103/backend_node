const app = require('./src/app');

const server = app.listen(3000, () => {
    console.log('Server running on port 3000');
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
})