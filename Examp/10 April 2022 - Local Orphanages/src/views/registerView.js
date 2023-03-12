import { html } from "../lib.js";
import { submitHandler } from "../utility.js"
import { register } from "../data/users.js";

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="auth">
    <form @submit=${onSubmit} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>`;

export function registerView(ctx) {
    ctx.renderMain(registerTemplate(submitHandler(onSubmit)));

    async function onSubmit({ email, password, repeatPassword }) {

        if(email == '' || password == '') {
            return alert('all field is required');
        }

        if(password !== repeatPassword) {
            return alert('pasword not match');
        }

        await register(email, password);
        ctx.page.redirect('/catalog')
    }
}