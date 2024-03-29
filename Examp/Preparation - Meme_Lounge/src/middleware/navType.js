export function navView(template) {
    let hasUser = null;

    return function(ctx, next) {
        if(Boolean(ctx.user) !== hasUser) {
            hasUser = Boolean(ctx.user);
            ctx.renderNav(template(hasUser, ctx?.user?.email));
        }
        next();
    }
}