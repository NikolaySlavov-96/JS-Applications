import { logout } from "../api/users.js";

export async function logoutFunction(ctx) {
    await logout();
    ctx.page.redirect('/');
}