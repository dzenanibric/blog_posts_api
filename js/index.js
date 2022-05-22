const getPosts = async () => {
    const response = await fetch ('https://jsonplaceholder.typicode.com/posts');
    const json = await response.json();
    
    return new Promise ((resolve, reject) => {
        if(typeof(json) === 'object'){
            resolve(json);
        }
        else{
            reject('Problem with getting posts, try again later...');
        }
    });
}

const addPostContent = (post, article) =>{
    const body = document.createElement('div');
    const p = document.createElement('p');
    body.setAttribute('id', 'content');

    p.innerText = post.body;

    body.appendChild(p);
    article.appendChild(body);
    body.style.display = 'none';

}

const showClickedPost = () => {
    const contents = document.querySelectorAll('#content');
    for(let i = 0; i<contents.length; i++){
        contents[i].setAttribute('class', 'content'+i);
    }

    const articles = document.querySelectorAll('article');
    articles.forEach(article => article.addEventListener('click', ()=>{
        const clicked_content = document.querySelector('.content' + article.getAttribute('id'));
        clicked_content.style.display = 'block';
    }));
}

getPosts().then((posts) =>{
    for(post of posts){
        const posts_div = document.querySelector('.container__posts')
        const article = document.createElement('article');
        const title = document.createElement('h2');
        
        title.innerText = post.title;

        article.appendChild(title);
        posts_div.appendChild(article);
        addPostContent(post, article);
    }
    const articles = document.querySelectorAll('article');
    for(let id = 0; id<articles.length; id++){
        articles[id].setAttribute('id', id);
    }
    showClickedPost();
}).catch(error => console.log(error));

const btn = document.getElementById('post-btn');
const content = document.getElementById('post-input');
const title = document.getElementById('title-input');

const publishPost = () => {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title: title.value, content: content.value}),
        }).then((response) => resolve(response.json())).catch(error => reject('Problem with post request...' + error));
    });
}

btn.addEventListener('click', ()=>{
    publishPost().then(response => {
        localStorage.setItem('title', response.title);
        localStorage.setItem('content', response.content);
        location.reload();
    }).catch(error => console.log(error));
});

const showNewPost = () => {
    const title = document.createElement('h2');
    const content = document.createElement('p');
    const article = document.createElement('article');
    const posts_div = document.querySelector('.container__posts');

    title.innerText = localStorage.getItem('title');
    content.innerText = localStorage.getItem('content');

    article.appendChild(title);
    article.appendChild(content);
    posts_div.appendChild(article);
}

showNewPost();