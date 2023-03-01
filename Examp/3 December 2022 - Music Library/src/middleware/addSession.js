export function addSesion(getSession) {
    return function (ctx, next) {
        const userIn = getSession()
        if(userIn) {
            ctx.user = userIn;
        } 
        next()
    }
}