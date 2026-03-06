
(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const label = document.querySelector(".nav-toggle__label");

  if (toggle && nav && label) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "閉じる" : "メニュー";
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    const name = document.getElementById("name");
    const tel = document.getElementById("tel");
    const message = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const telError = document.getElementById("telError");
    const messageError = document.getElementById("messageError");
    const success = document.getElementById("formSuccess");
    const validateTel = (value) => /^[0-9\-\+\s]{8,}$/.test(value);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let ok = true;
      nameError.textContent = "";
      telError.textContent = "";
      messageError.textContent = "";
      success.hidden = true;

      if (!name.value.trim()) {
        nameError.textContent = "お名前を入力してください。";
        ok = false;
      }
      if (!tel.value.trim()) {
        telError.textContent = "電話番号を入力してください。";
        ok = false;
      } else if (!validateTel(tel.value.trim())) {
        telError.textContent = "電話番号の形式を確認してください。";
        ok = false;
      }
      if (!message.value.trim()) {
        messageError.textContent = "お問い合わせ内容を入力してください。";
        ok = false;
      }
      if (!ok) return;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        });
        if (response.ok) {
          form.reset();
          success.hidden = false;
        } else {
          alert("送信に失敗しました。LINEまたは電話をご利用ください。");
        }
      } catch {
        alert("送信に失敗しました。LINEまたは電話をご利用ください。");
      }
    });
  }
})();
