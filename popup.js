document.getElementById("applyFont").addEventListener("click", function () {
    let selectedFont = document.getElementById("fontSelect").value;
    let fontSize = document.getElementById("fontSize").value + "px";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: applyFontToSelection,
                args: [selectedFont, fontSize]
            });
        }
    });
});

function applyFontToSelection(font, size) {
    let selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let selectedContent = range.cloneContents();

    let span = document.createElement("span");
    span.style.fontFamily = `"${font}", sans-serif`;
    span.style.fontSize = size;

    // Apply the font and size to all child elements recursively
    function applyStylesToChildren(element) {
        element.style.fontFamily = `"${font}", sans-serif`;
        element.style.fontSize = size;
        for (let child of element.children) {
            applyStylesToChildren(child);
        }
    }

    span.appendChild(selectedContent);
    applyStylesToChildren(span); // Apply font & size to all nested elements

    range.deleteContents();
    range.insertNode(span);
}
