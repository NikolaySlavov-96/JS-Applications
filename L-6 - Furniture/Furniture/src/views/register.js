import { html } from '../../node_modules/lit-html/lit-html.js';
import { submitHandler } from '../until.js'
import { register } from '../data/users.js';

const createTempate = (onSubmit) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;

export function registerTemplate(ctx) {
    ctx.render(createTempate(submitHandler(onSubmit)));
    
    async function onSubmit({email, password, rePass}) {

        if(email == '' || password == '') {
            return alert('incorrect field');
        }

        if(password !== rePass) {
            return alert('password not equals')
        }
        const data = await register(email, password);
        ctx.page.redirect('/');
    }
}