// Retrieve the necessary elements
var textarea = document.getElementById("textarea");
var darkModeToggle = document.getElementById("dark-mode-toggle");
var viewModeToggle = document.getElementById("view-mode-toggle");
var previewContainer = document.getElementById("preview-container");

// Load any previously saved settings from local storage
var savedSettings = JSON.parse(localStorage.getItem("notepadSettings"));
if (savedSettings) {
    textarea.style.fontSize = savedSettings.fontSize;
    if (savedSettings.darkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }
}

// Listen for changes in the textarea and save the text to local storage
textarea.addEventListener("input", function() {
    localStorage.setItem("notepadText", textarea.value);
    renderPreview();
});

window.addEventListener('DOMContentLoaded', function() {
// Dark Mode toggle
var darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// View Mode toggle
var viewModeToggle = document.getElementById("view-mode-toggle");
viewModeToggle.addEventListener("click", function() {
    var textarea = document.getElementById("textarea");
    var previewContainer = document.getElementById("preview-container");

    if (textarea.style.display === "none") {
        textarea.style.display = "block";
        previewContainer.style.display = "none";
        viewModeToggle.innerText = "View Mode";
    } else {
        var markdown = textarea.value;
        var html = markdownToHtml(markdown);
        previewContainer.innerHTML = html;
        textarea.style.display = "none";
        previewContainer.style.display = "block";
        viewModeToggle.innerText = "Edit Mode";
    }
});

// Convert Markdown to HTML
function markdownToHtml(markdown) {
    var html = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");
    html = html.replace(/^(#+)(.*)$/gm, function(match, p1, p2) {
        var level = p1.length;
        return "<h" + level + ">" + p2.trim() + "</h" + level + ">";
    });
    html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
    html = html.replace(/^\s*1\.\s+(.*)$/gm, "<li>$1</li>");
    html = html.replace(/\n(<\/?ul>|<\/?ol>)/g, "$1");
    html = html.replace(/<li>(.*?)<\/li>/g, function(match, p1) {
        return "<li>" + p1.replace(/^(.*)$/gm, "<p>$1</p>") + "</li>";
    });
    html = html.replace(/\n{2,}/g, "<br><br>");
    return html;
}

  });
  
  // Cut
var cutOption = document.getElementById("cut-option");
cutOption.addEventListener("click", function() {
    var textarea = document.getElementById("textarea");
    textarea.focus();
    document.execCommand("cut");
});

// Copy
var copyOption = document.getElementById("copy-option");
copyOption.addEventListener("click", function() {
    var textarea = document.getElementById("textarea");
    textarea.focus();
    document.execCommand("copy");
});

// Paste
var pasteOption = document.getElementById("paste-option");
pasteOption.addEventListener("click", function() {
    var textarea = document.getElementById("textarea");
    textarea.focus();
    document.execCommand("paste");
});

// New
var newBtn = document.getElementById("new-btn");
newBtn.addEventListener("click", function() {
    var textarea = document.getElementById("textarea");
    textarea.value = "";
});

// Open
var openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", function() {
    var textarea = document.getElementById("textarea");
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            textarea.value = e.target.result;
        };
        reader.readAsText(file);
    });
    fileInput.click();
});

// Save
var saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function() {
    var textarea = document.getElementById("textarea");
    var content = textarea.value;
    var blob = new Blob([content], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "notepad.txt";
    link.click();
});
