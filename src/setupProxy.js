const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/state',
        {
            "target": "https://state.88zh.com",
            "changeOrigin": true,
        }))
    app.use(createProxyMiddleware('/area',
        {
            "target": "https://state.88zh.com",
            "changeOrigin": true,
        }))
    app.use(createProxyMiddleware('/map',
        {
            "target": "https://state.88zh.com",
            "changeOrigin": true,
        }))
}
