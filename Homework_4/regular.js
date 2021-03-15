function btnHandler() {
    let $textarea = document.querySelector("#text-box");
    let text = $textarea.textContent;
    $textarea.textContent = text.replace(/\B'|'\B/g, '"');
};