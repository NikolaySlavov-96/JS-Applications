import { html } from '../lib.js';
import { login } from '../api/users.js';
import { submitHandler } from '../utility/utility.js';

const loginlate = (onSubmit) => html`
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function loginView(ctx) {
    ctx.renderMain(loginlate(submitHandler(onSubmit)));

    async function onSubmit({ email, password }) {
        if(email == '' || password == '') {
            return alert('all field is required');
        }

        await login(email, password);
        ctx.page.redirect('/');
    }
}