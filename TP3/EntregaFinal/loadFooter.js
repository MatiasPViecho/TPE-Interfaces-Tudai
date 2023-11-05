fetch('Footer/footer.html')
  .then((res) => res.text())
  .then((content) => {
    document.getElementById('footerContent').innerHTML = content;
  });
