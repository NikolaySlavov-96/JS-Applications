import { logout } from '../api/user.js'

export async function logoutView(ctx) {
    const data = await logout();
    ctx.page.redirect('/catalog');
}