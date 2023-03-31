import { html } from "../../node_modules/lit-html/lit-html.js";
import { loginRequest } from "../data/users.js";
import { submitHandler } from "../until.js";

const loginTemplate = (onSubmit) => html`
<section id="loginPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export function loginView(ctx) {
    ctx.renderSection(loginTemplate(submitHandler(onSubmit)));

    async function onSubmit({ email, password }) {
        
        if (email == '' || password == '') {
            return alert('all field is required');
        }

        const data = await loginRequest(email, password)
        ctx.page.redirect('/')
    }
}