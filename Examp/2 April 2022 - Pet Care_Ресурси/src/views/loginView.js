import { html } from "../lib.js";
import { submitHandler } from "../utility.js";
import { login } from "../data/users.js";

const loginTemplete = (onSubmit) => html`
<section id="loginPage">
    <form @submit=${onSubmit} class="loginForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`;

export function loginView(ctx) {
    ctx.renderMain(loginTemplete(submitHandler(onSubmit)));

    async function onSubmit({ email, password }) {
        if (email == '' || password == '') {
            return alert('all field is required');
        }

        await login(email, password);
        ctx.page.redirect('/');
    }
}