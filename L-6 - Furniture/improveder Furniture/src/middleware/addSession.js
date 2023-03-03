
export function addSession(userData) {
    return function (ctx, next) {
        const users = userData()
        if(users) {
            ctx.user = users;
        }
        next()
    }
}