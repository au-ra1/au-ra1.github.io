
 import { marked } from 'https://cdn.jsdelivr.net/npm/marked/+esm';








function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const postPath = getQueryParam("post");

if (postPath) {
  fetch(postPath)
    .then(res => res.text())
    .then(md => {
      const lines = md.split('\n');
      const startIndex = 0; 
      const endIndex = lines.indexOf('---', startIndex + 1); 
      const contentLines = lines.slice(endIndex + 1);
      const markdownContent = contentLines.join('\n');

      const splitTitle = lines[1].split("title: ").slice(1).join();
      const title = splitTitle;

      const splitDate = lines[3].split("date: ").slice(1).join();
      const date = splitDate;
     


      
      const contentDiv = document.getElementById("content");
      if (contentDiv) {
        contentDiv.innerHTML = "";

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        contentDiv.appendChild(titleElement);

        const dateElement = document.createElement("p")
        dateElement.textContent = date;
        contentDiv.appendChild(dateElement);


      async function renderMarkdown() {
        const htmlContent = await marked(markdownContent);
        const mdDiv = document.createElement("div");
        mdDiv.innerHTML = htmlContent;
        contentDiv.append(mdDiv);
        document.dispatchEvent(new Event('markdownParsed'));
        }
     renderMarkdown()   
      
      }
      
    });
}





