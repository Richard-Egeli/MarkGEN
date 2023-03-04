const button = document.getElementById('buttonId');

if (button) {
  button.addEventListener('click', () => {
    const el = document.getElementById('sidebar-id');

    if (el) {
      el.style.backgroundColor = '#000';
    }
  });
}
