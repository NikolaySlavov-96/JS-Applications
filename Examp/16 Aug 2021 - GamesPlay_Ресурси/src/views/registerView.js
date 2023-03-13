import { register } from '../api/users.js';
import { html } from '../lib.js';
import { submitHandler } from '../utility/utility.js';

const registerlTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
    <form @submit=${onSubmit} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function registerlView(ctx) {

    ctx.renderMain(registerlTemplate(submitHandler(onSubmit)));

    async function onSubmit(data) {
        const { email, password } = data;
        const rePass = data['confirm-password'];

        if(email == '' || password == '') {
            return alert('all Fields is required');
        }

        if(password !== rePass) {
            return alert('masword dont match');
        }

        await register(email, password);
        ctx.page.redirect('/');
    }
}