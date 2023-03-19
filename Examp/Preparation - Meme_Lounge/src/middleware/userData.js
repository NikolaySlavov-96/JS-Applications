export function setUser(session) {
    return function(ctx, next) {
        const user = session();
        if(user) {
            ctx.user = user;
        }
        next();
    }
}