import { register } from "../api/user.js";
import { html } from "../lib.js";
import { submitHandler } from "../utility.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function registerView(ctx) {
    ctx.renderSection(registerTemplate(submitHandler(onSubmit)));

    async function onSubmit(dataIn) {
        const {email, password, } = dataIn;
        const rePass = dataIn['re-password']
        //To Do Validation
        if(email == '' || password == '') {
            return alert('all field is required')
        }

        if(password !== rePass) {
            return alert('pasword don\'t match');
        }

        const registerData = await register(email, password);
        ctx.page.redirect('/catalog')
    }
}