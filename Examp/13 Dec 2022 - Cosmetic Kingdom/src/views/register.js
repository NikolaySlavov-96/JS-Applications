import { html } from "../../node_modules/lit-html/lit-html.js";
import { submitHandlerForm } from '../until.js';
import * as user from '../api/user.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function registerView(ctx) {
    ctx.renderSection(registerTemplate(submitHandlerForm(onSubmit)));

    async function onSubmit(dataIn) {
        const data = {
            email: dataIn.email,
            password: dataIn.password,
            rePass: dataIn["re-password"]
        }
        if(data.email == '' || data.password == '') {
            return alert('all field is required')
        }

        if(data.password !== data.rePass) {
            return alert('pasword is dosn\'t mach')
        }

        const dataResonse = await user.register(data.email, data.password);
        ctx.page.redirect('/catalog');
    }
}