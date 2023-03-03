import { html } from '../../node_modules/lit-html/lit-html.js'

export const navTemplate = (hasUser) => html`
<h1><a href="/">Furniture Store</a></h1>
<nav>
    <a id="catalogLink" href="/" class="active">Dashboard</a>
    ${hasUser ? html`
    <div id="user">
        <a id="createLink" href="/create">Create Furniture</a>
        <a id="profileLink" href="/my-furniture">My Publications</a>
        <a id="logoutBtn" href="/logout">Logout</a>
    </div>
    `: html`
    <div id="guest">
        <a id="loginLink" href="/login">Login</a>
        <a id="registerLink" href="/register">Register</a>
    </div>
    `}
</nav>`;