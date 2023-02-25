import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/users.js';
import { submitHandler } from '../until.js'

const createTempate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
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
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`;

export function loginTemplate(ctx) {
    ctx.render(createTempate(submitHandler(onSubmit)));
    
    async function onSubmit({email, password}) {
        if(email == '' || password == '') {
            return alert('incorrect field');
        }
        await login(email, password)
        ctx.page.redirect('/create')
    }
    
}