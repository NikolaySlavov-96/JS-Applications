export function setUser(session) {
    return function(ctx, next) {
        const userSessiont = session();

        if(userSessiont) {
            ctx.user = userSessiont;
        }
        next();
    }
}