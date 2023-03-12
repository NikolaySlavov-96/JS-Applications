import { html } from "../lib.js";

export const navigationTemplate = (hasUser) => html`
<h1><a href="/">Orphelp</a></h1>
<nav>
    <a href="/">Dashboard</a>
    ${hasUser ? html`
    <div id="user">
        <a href="/myPost">My Posts</a>
        <a href="/create">Create Post</a>
        <a href="/logout">Logout</a>
    </div>` :
            html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;