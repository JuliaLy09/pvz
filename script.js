// Распознавание изображения
function recognize(canvas, lang, logger) {
  return Tesseract.recognize(canvas, lang, { logger }).
  then(({ data: { text } }) => {
    return text;
  });
}

// file.setAttribute("photo", "photo");
const log = document.getElementById('log');

// Отслеживание прогресса обработки
function updateProgress(data) {
  log.innerHTML = '';
  const statusText = document.createTextNode(data.status);
  const progress = document.createElement('progress');
  progress.max = 1;
  progress.value = data.progress;
  log.appendChild(statusText);
  log.appendChild(progress);
}

// Выводим результат
function setResult(text) {
  log.innerHTML = '';
  text = text.replace(/\n\s*\n/g, '\n');
  const pre = document.createElement('pre');
  pre.innerHTML = text;
  log.appendChild(pre);
}

document.getElementById('start').addEventListener('click', () => {
   const canvas = document.getElementById('canvas');
//  	const file = document.getElementById('file').files;
//   if (!file) return;

  const lang = document.getElementById('langs').value;

  recognize(canvas, lang, updateProgress).
  then(setResult);
});
