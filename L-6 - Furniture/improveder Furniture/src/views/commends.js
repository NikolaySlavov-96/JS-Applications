import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { submitHandler } from '../until.js';
import { createCommentForProduct, getCommentsById } from '../data/comments.js';

const commentsTemplate = (comments, commentsForm) => html`
<div id="comments">
    ${commentsForm}
    <ul id="comment-list">
        ${repeat(comments, el => el._id, commentCard)}
    </ul>
</div>`;

const commentCard = (comment) => html`
<li>${comment.content}</li>`;

const formTemplate = (onSubmit) => html`
<form @submit=${onSubmit}>
    <textarea name="content"></textarea>
    <input type="submit" value="Post comment">
</form>`;

export function commentTemplate(ctx) {
    return until(commentsWraper(ctx), 'Loading comments ...');
}

async function commentsWraper(ctx) {
    const productId = ctx.params.id;

    const comments = await getCommentsById(productId);
    console.log(comments)
    return commentsTemplate(
        comments,
        ctx.user ? formTemplate(submitHandler(onSubmit)) : nothing,
    );

    async function onSubmit(dataIn, form) {
        await createCommentForProduct(productId, dataIn.content);
        form.reset();
        ctx.page.redirect('/details/' + productId);
    }
}