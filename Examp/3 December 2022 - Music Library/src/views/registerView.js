import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/users.js";
import { submitHangler } from "../until.js";

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
    ctx.render(registerTemplate(submitHangler(onSubmit)));

    async function onSubmit(input) {
        //TO DO Valivation
        const dataIn = {
            email: input.email,
            password: input.password,
            rePass: input['re-password']
        }

        if(dataIn.email == '' || dataIn.password == '') {
            return alert('all field is required');
        }

        if(dataIn.password !== dataIn.rePass) {
            return alert('password is doesn\'t match');
        }
        
        const data = await register(dataIn.email, dataIn.password);
        ctx.page.redirect('/catalog');
    }
}