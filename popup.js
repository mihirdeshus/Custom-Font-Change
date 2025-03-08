document.getElementById("applyFont").addEventListener("click", function () {
    let selectedFont = document.getElementById("fontSelect").value;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: applyFontToSelection,
                args: [selectedFont]
            });
        }
    });
});

function applyFontToSelection(font) {
    let selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let selectedContent = range.cloneContents();

    let span = document.createElement("span");
    span.style.fontFamily = `"${font}", sans-serif`;

    // Apply the font to all child elements recursively
    function applyFontToChildren(element) {
        element.style.fontFamily = `"${font}", sans-serif`;
        for (let child of element.children) {
            applyFontToChildren(child);
        }
    }

    span.appendChild(selectedContent);
    applyFontToChildren(span); // Ensure font is applied to all nested elements

    range.deleteContents();
    range.insertNode(span);
}
