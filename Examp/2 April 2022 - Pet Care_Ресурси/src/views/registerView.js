import { html } from "../lib.js";
import { submitHandler } from "../utility.js"
import { register } from "../data/users.js";

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
    <form @submit=${onSubmit} class="registerForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>`;

export function registerView(ctx) {
    ctx.renderMain(registerTemplate(submitHandler(onSubmit)));

    async function onSubmit({ email, password, repeatPassword }) {

        if (email == '' || password == '') {
            return alert('all field is required');
        }

        if (password !== repeatPassword) {
            return alert('pasword not match');
        }

        await register(email, password);
        ctx.page.redirect('/')
    }
}