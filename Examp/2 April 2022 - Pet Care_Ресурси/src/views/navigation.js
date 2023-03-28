import { html } from "../lib.js";

export const navigationTemplate = (hasUser) => html`
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <!--Users and Guest-->
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Dashboard</a></li>
        ${hasUser ? html`
        <!--Only Users-->
        <li><a href="/create">Create Postcard</a></li>
        <li><a href="/logout">Logout</a></li>
        ` : html`
        <!--Only Guest-->
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        `}
    </ul>
</nav>`;