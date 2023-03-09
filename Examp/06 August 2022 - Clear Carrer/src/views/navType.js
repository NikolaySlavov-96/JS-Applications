import { html } from "../lib.js";

export const navViewType = (hasUser) => html`
<!-- Navigation -->
<a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>
<nav>
    <div>
        <a href="/catalog">Dashboard</a>
    </div>
    ${hasUser ? html`
    <div class="user">
        <a href="/create">Create Offer</a>
        <a href="/logout">Logout</a>
    </div>
    ` : html`
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>`;