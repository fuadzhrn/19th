// app.js
document.addEventListener('DOMContentLoaded', () => {
  const stick1 = document.querySelector('.color');
  const stick2 = document.querySelector('.color2');
  const stick3 = document.querySelector('.brush3');
  const lines  = document.querySelector('.lines');

  if (!stick1 || !stick2 || !stick3 || !lines) return;

  // ===== generate garis (.line) =====
  const colors = [
    '#133286','#3062af','#FFF','#4a7fcb','#133286','#3062af',
    '#628ace','#949fd9','#821e12','#c34821','red','#d3ad94',
    'yellow','#821e12','#462652','#b16f67','#d3ad94','yellow',
    '#821e12','#821e12','#c34821','#821e12','#c34821','red'
  ];

  colors.forEach((color) => {
    const line = document.createElement('div');
    const randomMargin = Math.floor(Math.random() * 1000);
    line.className = 'line';
    line.style.setProperty('--m', `${randomMargin}px`);
    line.style.setProperty('--c', color);
    lines.appendChild(line);
  });

  // Helper: resolve ketika SEMUA animasi .line (keyframes: margin) selesai
  const waitLinesDone = () => new Promise((resolve) => {
    const items = lines.querySelectorAll('.line');
    if (items.length === 0) return resolve();
    let remaining = items.length;
    items.forEach((el) => {
      el.addEventListener('animationend', (e) => {
        if (e.animationName === 'margin') {
          remaining -= 1;
          if (remaining <= 0) resolve();
        }
      });
    });
  });

  // ===== timeline animasi intro =====
  setTimeout(() => {
    stick2.style.animation = 'movedown 0.5s ease forwards';
  }, 3000);

  setTimeout(() => {
    stick3.style.animation = 'movedown 0.5s ease forwards';
  }, 3500);

  setTimeout(async () => {
    // pastikan container garis tampil & dianimasi
    lines.style.display   = 'flex'; // jaga-jaga kalau sebelumnya none
    lines.style.animation = 'revealLines 0.6s ease forwards';
    // opsional: munculkan stick1
    stick1.style.animation = 'fadeIn 0.5s ease forwards';

    // Tunggu semua garis selesai → redirect
    await waitLinesDone();
    window.location.href = '../netflix/login.html';
  }, 4000);
});
