import { marked } from 'https://cdn.jsdelivr.net/npm/marked/+esm';

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const postPath = getQueryParam('post');
if (postPath) {
    fetch(postPath)
        .then(res => {
        if (!res.ok)
            throw new Error('Network response was not ok');
        return res.text();
    })
        .then(md => {
        const contentDiv = document.getElementById('content');
        if (contentDiv) {
            contentDiv.innerHTML = marked(md);
        }
    });
}
else {
    document.getElementById('content').innerHTML = "<p>it's broken :(</p>";
}
