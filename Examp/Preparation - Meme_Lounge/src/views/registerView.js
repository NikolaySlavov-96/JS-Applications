import { html } from '../lib.js';
import { register } from '../api/users.js';
import { submitHandler } from '../utility/utility.js';
import { notification } from './notificationView.js';

const registerlTemplate = (onSubmit) => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function registerlView(ctx) {

    ctx.renderMain(registerlTemplate(submitHandler(onSubmit)));

    async function onSubmit({username, email, password, repeatPass, gender }) {

        if (email == '' || password == '') {
            notification('all Fields is required');
            return
        }

        if (password !== repeatPass) {
            notification('all Fields is required');
            return
        }

        await register(username, email, password, gender);
        ctx.page.redirect('/catalog');
    }
}