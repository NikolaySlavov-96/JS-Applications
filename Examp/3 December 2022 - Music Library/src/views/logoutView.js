import { logout } from "../api/users.js";


export async function logoutFunction(ctx) {
    const data = await logout();
    ctx.page.redirect('/catalog')
    return data;
}