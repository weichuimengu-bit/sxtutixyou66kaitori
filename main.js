(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('siteNav');
  if (toggle && nav) {
    const toggleText = toggle.querySelector('.nav-toggle__text');

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      if (toggleText) toggleText.textContent = open ? '閉じる' : 'メニュー';
      nav.classList.toggle('open', open);
    };

    // initial state
    setOpen(false);

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    // Close nav when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      const target = e.target;
      if (target instanceof Element) {
        if (!nav.contains(target) && !toggle.contains(target)) {
          setOpen(false);
        }
      }
    });

    // Close with ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Optional contact form handler (requires endpoint)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = (form.getAttribute("action") || ""); // contact.html の action にFormspreeエンドポイントを入れる
      if (!endpoint) {
        alert('送信できませんでした。LINEまたは電話をご利用ください。');
        return;
      }
      const fd = new FormData(form);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: fd,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          alert('送信しました。折り返しご連絡します。');
          form.reset();
        } else {
          alert('送信に失敗しました。LINEまたは電話をご利用ください。');
        }
      } catch (err) {
        alert('通信エラーが発生しました。LINEまたは電話をご利用ください。');
      }
    });
  }
})();
