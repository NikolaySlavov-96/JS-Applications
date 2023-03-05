import { html } from "../../node_modules/lit-html/lit-html.js";
import { registerRequest } from "../data/users.js";
import { submitHandler } from "../until.js";

const registerTemplate = (onSubmit) => html`<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">login</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function registerView(ctx) {
    ctx.renderSection(registerTemplate(submitHandler(onSubmit)));

    async function onSubmit(dataIn) {
        console.log(dataIn)
        // TO DO Validation

        const inputData = {
            email: dataIn.email,
            password: dataIn.password,
            rePass: dataIn['re-password']
        }

        if(inputData.email == '' || inputData.password == '') {
            return alert('all field is required');
        }

        if(inputData.password !== inputData.rePass) {
            return alert('password don\'t match');
        }

        const data = await registerRequest(inputData.email, inputData.password)
        ctx.page.redirect('/dashboard');
    }
}