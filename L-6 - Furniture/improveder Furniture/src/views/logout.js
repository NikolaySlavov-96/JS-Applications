import { removeUserData } from '../until.js';
import { logout as logoutData } from '../data/users.js'

export async function logout(ctx) {
    await logoutData();
    removeUserData();
    ctx.page.redirect('/');
}