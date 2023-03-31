import { html } from "../../node_modules/lit-html/lit-html.js";
import { registerRequest } from "../data/users.js";
import { submitHandler } from "../until.js";

const registerTemplate = (onSubmit) => html`<section id="register">
    <section id="registerPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`;

export function registerView(ctx) {
    ctx.renderSection(registerTemplate(submitHandler(onSubmit)));

    async function onSubmit(dataIn) {
        const rePass = dataIn['conf-pass']
        // TO DO Validation

        const inputData = {
            email: dataIn.email,
            password: dataIn.password,
            rePass: dataIn['re-password']
        }

        if (inputData.email == '' || inputData.password == '') {
            return alert('all field is required');
        }

        if (inputData.password !== rePass) {
            return alert('password don\'t match');
        }

        const data = await registerRequest(inputData.email, inputData.password)
        ctx.page.redirect('/');
    }
}