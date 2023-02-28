export function userTemplate(navTemplate) {
    let isLoged = null;

    return function(ctx, next) {
        if(Boolean(ctx.user) !== isLoged) {
            isLoged = Boolean(ctx.user);
            ctx.renderNav(navTemplate(isLoged));
        }
        next();
    }
}