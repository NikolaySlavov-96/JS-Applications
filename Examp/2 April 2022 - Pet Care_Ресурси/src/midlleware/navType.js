export function navView(template) {
    let isUser = null;

    return function(ctx, next) {
        if(Boolean(ctx.user) !== isUser) {
            isUser = Boolean(ctx.user);
            ctx.renderNav(template(isUser));
        }
        next();
    }
}