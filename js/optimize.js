// Скрипт для проверки оптимизации
function checkOptimization() {
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((sheet) => {
    if (sheet.href.includes(".min.css")) {
      console.log("✅ CSS минифицирован");
    }
  });

  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.src.includes(".webp")) {
      console.log("✅ WebP изображения подключены");
    }
  });
}

document.addEventListener("DOMContentLoaded", checkOptimization);