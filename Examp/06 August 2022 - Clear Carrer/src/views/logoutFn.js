import { logout } from "../api/user.js";

export async function logoutFn(ctx) {
    const data = await logout();
    ctx.page.redirect('/catalog');
    return data;
}