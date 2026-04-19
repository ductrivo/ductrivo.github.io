// assets/js/progress.js
(function() {
  const btn = document.getElementById('btn-complete');
  if (!btn) return;

  const slug = btn.dataset.slug;
  const KEY = 'lesson_done_' + slug;

  function setDone() {
    btn.textContent = '✓ Completed';
    btn.classList.remove('btn-success');
    btn.classList.add('btn-outline-success');
    btn.disabled = true;
  }

  // Restore state on load
  if (localStorage.getItem(KEY) === '1') {
    setDone();
  }

  btn.addEventListener('click', function() {
    localStorage.setItem(KEY, '1');
    setDone();
    // Optional: auto-advance to next lesson after 1.2s
    const nextBtn = document.querySelector('a.btn-success[href]');
    if (nextBtn) {
      setTimeout(function() {
        nextBtn.style.animation = 'pulse 0.4s ease';
      }, 800);
    }
  });
})();