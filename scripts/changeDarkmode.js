"use strict";
const button = document.querySelector("[theme-toggle]");
const localTheme = getLocalStorageTheme("theme", "dark");
updateHTML(localTheme);
button.addEventListener("click", () => {
    const current = getTheme();
    const newTheme = current === "dark" ? "light" : "dark";
    const buttonText = newTheme === "dark" ? "☼" : "☾";
    const newTitle = newTheme === "dark" ? "Praise the sun!" : "Praise the moon!";
    button.setAttribute("title", newTitle);
    button.innerHTML = buttonText;
    updateLocalStorage(newTheme);
    updateHTML(newTheme);
});
function getTheme() {
    const a = document.querySelector("html")?.getAttribute("data-theme");
    return a;
}
function updateLocalStorage(theme) {
    localStorage.setItem("theme", theme);
}
function updateHTML(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
}
function getLocalStorageTheme(theme, defaultV) {
    const localStorageTheme = localStorage.getItem(theme);
    return localStorageTheme !== null ? localStorageTheme : defaultV;
}
