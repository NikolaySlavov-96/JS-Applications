import { logout } from "../data/users.js";

export async function logoutFn(ctx) {
    await logout();
    ctx.page.redirect('/');
}