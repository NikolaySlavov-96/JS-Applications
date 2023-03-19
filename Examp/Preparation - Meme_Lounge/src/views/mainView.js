import { getMyMeme } from '../api/games.js';
import { html, repeat } from '../lib.js';

const cardMeme = (content) => html`
<div class="user-meme">
    <p class="user-meme-title">${content.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${content.imageUrl}">
    <a class="button" href="/catalog/${content._id}">Details</a>
</div>`;

const myMemeTemplate = (userData, isMeme, dataMeme) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${dataMeme.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

        ${isMeme ? repeat(dataMeme, id => id._id, cardMeme) : html`
        <p class="no-memes">No memes in database.</p>`}

    </div>
</section>`;

export async function myMemeView(ctx) {

    const userData = ctx.user
    let isMeme = true;
    const dataMeme = await getMyMeme(userData.id);

    if (dataMeme.length == 0) {
        isMeme = false;
    }

    ctx.renderMain(myMemeTemplate(userData, isMeme, dataMeme))
}