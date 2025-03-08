document.addEventListener("mouseup", function () {
    let selection = window.getSelection().toString();
    if (selection.length > 0) {
        console.log("User selected text:", selection);
    }
});
