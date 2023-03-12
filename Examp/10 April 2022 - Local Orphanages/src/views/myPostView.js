import { html, repeat } from "../lib.js";
import { getAllMyPosts } from "../data/product.js";

const cardPost = (content) => html`
<div class="post">
    <h2 class="post-title">${content.title}</h2>
    <img class="post-image" src="${content.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/catalog/${content._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

const myPostTemplate = (data, isPost) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    ${isPost ? 
    html`
    <div class="my-posts">
        ${repeat(data, i => i.id, cardPost)}
    </div>` : 
    html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
</section>`;

export async function myPostView(ctx) {
    const userId = ctx.user.id;
    const dataPost = await getAllMyPosts(userId);
    let isPost = true;

    if(dataPost.length == 0) {
        isPost = false;
    }
    
    ctx.renderMain(myPostTemplate(dataPost, isPost))
}