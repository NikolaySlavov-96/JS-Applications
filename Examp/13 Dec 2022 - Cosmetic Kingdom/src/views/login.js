import { html } from "../../node_modules/lit-html/lit-html.js";
import { submitHandlerForm } from '../until.js';
import * as user from '../api/user.js';

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`;


export function loginView(ctx) {
    ctx.renderSection(loginTemplate(submitHandlerForm(onSubmit)));

    async function onSubmit({email, password}) {
        if(email == '' || password == '') {
            return alert('all field is required')
        }
        
        const data = await user.login(email, password);
        ctx.page.redirect('/catalog');
    }
}