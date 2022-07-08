const input = document.querySelector('.switcher-toggle');

input.addEventListener('change', function toggleTheme() {
  document.body.classList.toggle('theme-dark');
  // (function () {
  //   if (document.body.classList.toggle('theme-dark')) {
  //     document.getElementById('slider').checked = false;
  //   } else {
  //     document.getElementById('slider').checked = true;
  //   }
  // });
});
