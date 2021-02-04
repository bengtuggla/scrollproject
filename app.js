// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function () {
  // linksContainer.classList.toggle('show-links'); finns bättre lösning mer dynamiskt. Kommer här:
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});
const navbar = document.getElementById('nav');
const toplink = document.querySelector('.top-link');
// ********** fixed navbar ************
window.addEventListener('scroll', function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  } else {
    navbar.classList.remove('fixed-nav');
  }
  if (scrollHeight > 300) {
    toplink.classList.add('show-link');
  } else {
    toplink.classList.remove('show-link');
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    //Prevent default (smoothscroll eftersom målet "missas")
    e.preventDefault();
    //Navigate to id dynamiskt
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    //Calculate the height
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    //Returns true IF navbar is fixed(depends on viewport size)
    const fixedNav = navbar.classList.contains('fixed-nav');
    //Minus navbarens höjd eftersom den annars täcker den rubrik vi ska komma till
    let position = element.offsetTop - navHeight;
    //Om INTE menyn är fixed så måste vi ta bort ytterligare navHeight
    if (!fixedNav) {
      position = position - navHeight;
    }
    //OM vi redan har klickat på en länk i mobilvy och menyn är stängd
    if (navHeight > 82) {
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });

    //STäng topmenyn när vi klickat på en länk
    linksContainer.style.height = 0;
  });
});
