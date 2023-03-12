const element = document.getElementById('search-bar-input');

if (element) {
  element.addEventListener('change', (event) => {
    console.log(event.target.value);
  });
}
