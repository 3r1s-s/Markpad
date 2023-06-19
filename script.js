var previewContainer = document.getElementById('previewContainer');
var editor = document.getElementById('editor');
var preview = document.getElementById('preview');
var editMode = true;

function convertMarkdownToHtml(markdownText) {
  var html = markdownText.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");
  html = html.replace(/^(#{1,6})\s(.+)$/gm, function(match, p1, p2) {
    var level = p1.length;
    return "<h" + level + ">" + p2.trim() + "</h" + level + ">";
  });
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/^1\. (.+)$/gm, "<li>$1</li>");
  html = html.replace(/<\/li>\n<li>/g, "\n");
  html = html.replace(/<li>(.+)<\/li>/g, "<li><p>$1</p></li>");
  html = html.replace(/\n{2,}/g, "<br><br>");
  return html;
}

function updatePreview() {
  var markdownText = editor.value;
  var htmlText = convertMarkdownToHtml(markdownText);
  preview.innerHTML = htmlText;
}

function toggleMode() {
  editMode = !editMode;
  
  if (editMode) {
    editorContainer.style.display = 'block';
    previewContainer.style.display = 'none';
    toggleBtn.textContent = 'View';
  } else {
    editorContainer.style.display = 'none';
    previewContainer.style.display = 'block';
    toggleBtn.textContent = 'Edit';
    updatePreview();
  }
}

function saveAs() {
    var markdownText = editor.value;
    var filenameInput = document.getElementById('filenameInput');
    var filename = filenameInput.value || "note.md";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdownText));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  

editor.addEventListener('input', updatePreview);

function loadFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
  
    reader.onload = function(e) {
      var contents = e.target.result;
      editor.value = contents;
      updatePreview();
  
      var filenameInput = document.getElementById('filenameInput');
      filenameInput.value = file.name;
    };
  
    reader.readAsText(file);
  }
      
  