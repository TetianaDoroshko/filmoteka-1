const lockPadding = document.querySelectorAll('.lock-padding');

export function bodyLock() {
  const bodyRef = document.querySelector('body');
  const bodyStyle = window.getComputedStyle(bodyRef);
  const bodyWidth =
    bodyRef.offsetWidth +
    parseInt(bodyStyle.marginLeft) +
    parseInt(bodyStyle.marginRight); // получаем ширину боди с учетом маржинов

  const widthVerticalScrollBar = window.innerWidth - bodyWidth; // получаем ширину скроллбара

  if (lockPadding.length > 0) {
    lockPadding.forEach(el => {
      el.style.marginRight = widthVerticalScrollBar + 'px';
    });
  }

  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = widthVerticalScrollBar + 'px'; // добавляем ширину скроллбара в виде паддинга
}

export function bodyUnlock(time) {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      lockPadding.forEach(el => {
        el.style.marginRight = '';
      });
    }
    document.body.style.paddingRight = '';
    document.body.style.overflow = 'auto';
  }, time); // ждем пока пройдет анимация закрытия модалки и разблокирываем боди
}
