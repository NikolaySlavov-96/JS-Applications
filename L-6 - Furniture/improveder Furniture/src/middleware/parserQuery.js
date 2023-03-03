
export function parseQuery(ctx, next) {
    // return function (ctx, next) {
        ctx.query = {};
        if (ctx.querystring) {
            const query = Object.fromEntries(ctx.querystring
                .split('&')
                .map(e => e.split('=')));
            Object.assign(ctx.query, query);
        }
        next();
    // }
}

export function parseQueryString(ctx, next) {
    ctx.query = {};
    if (ctx.querystring) {
        const query = Object.fromEntries(ctx.querystring
            .split('&')
            .map(p => p.split('=')));
        Object.assign(ctx.query, query);
    }

    next();
}