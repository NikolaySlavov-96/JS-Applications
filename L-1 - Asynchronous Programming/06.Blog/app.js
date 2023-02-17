function attachEvents() {
    
    document.getElementById(`btnLoadPosts`).addEventListener('click', onGetPosts);
    document.getElementById(`btnViewPost`).addEventListener('click', onViewPost)

    const selecPost = document.getElementById(`posts`);
    const postTitle = document.getElementById(`post-title`);
    const postBody = document.getElementById(`post-body`);
    const commentBody = document.getElementById(`post-comments`);

    async function onGetPosts() {

        postTitle.textContent = '';
        postBody.innerHTML = '';
        commentBody.innerHTML = '';

        try {
            const respons = await fetch('http://localhost:3030/jsonstore/blog/posts');
    
            if(respons.status !== 200) {
                throw new Error('')
            }

            const data = await respons.json();
            const dataArr = Object.values(data)

            selecPost.innerHTML = '';
            for (const dataLine of dataArr) {
                selecPost.appendChild(createOption(dataLine.id, dataLine.title));
            }

        } catch(err) {
            // console.log(err.message)
        }

    }

    async function onViewPost() {
        const idPost = selecPost.selectedOptions[0].value;
    
        try {
            const requestPost = await fetch(`http://localhost:3030/jsonstore/blog/posts/${idPost}`);
            const requestComment = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
    
            if(requestPost.ok == false) {
                const error = await requestPost.json();
                throw new Error(error.message);
            }
    
            if(requestComment.ok == false) {
                const error = await requestComment.json();
                throw new Error(error.message);
            }
    
            const dataPost = await requestPost.json();
    
            postTitle.textContent = dataPost.title;
            postBody.textContent = dataPost.body;
    
            const dataComment = await requestComment.json();
            const postsComment = Object.values(dataComment).filter(com => com.postId === idPost);
            
            commentBody.innerHTML = '';
            for (const post of postsComment) {
                const li = document.createElement('li');
                li.id = post.id;
                li.textContent = post.text;
                commentBody.appendChild(li);
            }
        } catch(err) {
            alert(err.message);
            // console.log(err.message)
        }
    }

    function createOption(inputValut, contentTitle) {
        const el = document.createElement('option');
        el.value = inputValut
        el.textContent = contentTitle;
        return el;
    }
}

attachEvents();