export function getUser(getSession) {
    return function(ctx, next) {
        const user = getSession();
        if(user) {
            ctx.user = user;
        }

        next();
    }
}