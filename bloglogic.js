

const contentPath = "/content/";
const posts = ["1.md", "2.md"]; 
const postsListElements = document.getElementById("posts-list");

async function parseMarkdown(file) {
    const response = await fetch(contentPath + file);
    const text = await response.text();

    const lines = text.split('\n');

    const dateLine = lines[3] || "";
    const titleLine = lines[1] || "";
    const date = dateLine.trim().replace("date: ", "");
    const title = titleLine.trim().replace("title: ", "");
    return { date, title, file };
}

async function getPosts() {
    const postsList = [];

    for (const file of posts) {
        const data = await parseMarkdown(file);
        postsList.push(data);
    }

    postsList.sort((a, b) => new Date(b.date) - new Date(a.date));

    postsList.forEach(post => {
         const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = contentPath + post.file;
        link.textContent = `${post.title} - ${post.date}`;
        link.target = "_blank";
        li.appendChild(link);
        postsListElements.appendChild(li);
    });
}

getPosts();
   