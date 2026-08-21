document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (!form.dataset.txtMock) return;
  const action = (form.getAttribute('action') || '').trim();
  if (action) return;
  event.preventDefault();
  const box = document.createElement('p');
  box.className = 'txt-mock-success';
  box.setAttribute('role', 'status');
  box.textContent = 'Thanks — we received your message. We will get back to you shortly.';
  form.replaceWith(box);
});
