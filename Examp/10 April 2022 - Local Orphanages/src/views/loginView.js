import { html } from "../lib.js";
import { submitHandler } from "../utility.js";
import { login } from "../data/users.js";

const loginTemplete = (onSubmit) => html`
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>`;

export function loginView(ctx) {
    ctx.renderMain(loginTemplete(submitHandler(onSubmit)));

    async function onSubmit({ email, password }) {
        if(email == '' || password == '') {
            return alert('all field is required');
        }

        await login(email, password);
        ctx.page.redirect('/catalog');
    }
}