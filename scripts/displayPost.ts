import { marked } from 'marked';

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}




const postPath = getQueryParam('post');

if (postPath) {
  fetch(postPath)
    .then(md => {
      const contentDiv = document.getElementById("content");
      if (contentDiv) {
        contentDiv.innerHTML = marked(md);
      }
    })


} else {
    document.getElementById('content').innerHTML = "<p>it's broken :(</p>";
}

