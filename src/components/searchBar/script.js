const element = document.getElementById('search-bar-input');

element.addEventListener('change', (event) => {
  console.log(event.target.value);
});
