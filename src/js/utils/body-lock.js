export function bodyLock() {
  const bodyRef = document.querySelector('body');
  const bodyStyle = window.getComputedStyle(bodyRef);
  const bodyWidth =
    bodyRef.offsetWidth +
    parseInt(bodyStyle.marginLeft) +
    parseInt(bodyStyle.marginRight); // получаем ширину боди с учетом маржинов

  const widthVerticalScrollBar = window.innerWidth - bodyWidth; // получаем ширину скроллбара

  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = widthVerticalScrollBar + 'px'; // добавляем ширину скроллбара в виде паддинга
}

export function bodyUnlock(time) {
  setTimeout(() => {
    document.body.style.paddingRight = '';
    document.body.style.overflow = 'auto';
  }, time); // ждем пока пройдет анимация закрытия модалки и разблокирываем боди
}
