(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open', !isOpen);
    });

    // Close nav when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      const target = e.target;
      if (target instanceof Element) {
        if (!nav.contains(target) && !toggle.contains(target)) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Optional contact form handler (requires endpoint)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const endpoint = (form.getAttribute("action") || ""); // contact.html の action にFormspreeエンドポイントを入れる
      if (!endpoint || endpoint.includes("FORM_ENDPOINT_HERE")) {
        alert('フォーム送信先が未設定です。LINEまたは電話をご利用ください。');
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
