const isJSON = require('is-json');
const zlib = require('zlib');

module.exports = options => {
    return async function gzip(ctx, next) {
        await next();
        let { body } = ctx;
        if (!body) return;
        if(options.threshold && ctx.length < options.threshold) return; 
        if (isJSON(body)) {
            body = JSON.parse(body);
        }
        const stream = zlib.createGzip();
        stream.end(body);
        ctx.body = stream;
        ctx.set('Content-Type', 'gzip');
    }
};