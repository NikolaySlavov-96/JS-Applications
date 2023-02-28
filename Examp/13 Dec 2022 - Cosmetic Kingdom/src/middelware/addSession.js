export function addSession(userData) {
    return function(ctx, next) {
        const user = userData();
        if(user) {
            ctx.user = user;
        }
        next();
    }
}