function attachEvents() {
    console.log('TODO...');

    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onRefresh);

    const textArea = document.getElementById('messages');
    const nameIntput = document.querySelector("input[name='author']");
    const contentInput = document.querySelector("input[name='content']");

    async function onSubmit(ev) {
        ev.preventDefault();

        try {
            const request = await fetch(`http://localhost:3030/jsonstore/messenger`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({author: nameIntput.value, content: contentInput.value})
            });
        } catch(err) {
            // alert(err.message);
        }
    }

    async function onRefresh(ev) {
        ev.preventDefault();

        try {
            const resposne = await fetch('http://localhost:3030/jsonstore/messenger');
    
            if(resposne.ok == false) {
                const error = await resposne.json();
                throw new Error(error.message);
            }
    
            const dataResponse = await resposne.json();
    
            const postsArr = Object.values(dataResponse);
            const currentPosts = [];
    
            for (const post of postsArr) {
                currentPosts.push(`${post.author}: ${post.content}`)
            }
    
            textArea.textContent = currentPosts.join(`\n`)
        } catch(err) {
            // alert(err.message);
        }
    }
}

attachEvents();