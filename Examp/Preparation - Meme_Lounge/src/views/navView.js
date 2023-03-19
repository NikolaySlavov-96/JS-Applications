import { html } from '../lib.js';

export const navTemplate = (hasUser, email) => html`
<a href="/catalog">All Memes</a>
${hasUser ? 
    html`
        <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${email}</span>
            <a href="/myProfile">My Profile</a>
            <a href="/logout">Logout</a>
        </div>
    </div>` : 
    html`
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
</div>`}`;