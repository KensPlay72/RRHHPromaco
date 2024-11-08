/*===== EXPANDER MENU  =====*/ 
const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId);

  if (toggle && navbar) {
    toggle.addEventListener('click', () => {
      const isExpanded = navbar.classList.toggle('expander');
      bodypadding.classList.toggle('body-pd');
      
      // If the menu is collapsing, close all collapse menus
      if (!isExpanded) {
        closeAllCollapseMenus();
      }
    });
  }
}
showMenu('nav-toggle', 'navbar', 'body-pd');

/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link');
function colorLink() {
  linkColor.forEach(l => l.classList.remove('active'));
  this.classList.add('active');
}
linkColor.forEach(l => l.addEventListener('click', colorLink));

/*===== COLLAPSE MENU  =====*/ 
const linkCollapse = document.getElementsByClassName('collapse__link');
const navbar = document.getElementById('navbar'); // Refs to the navbar
const bodypadding = document.getElementById('body-pd'); // Refs to body padding

function closeAllCollapseMenus() {
  const allCollapseMenus = document.getElementsByClassName('collapse__menu');
  for (let j = 0; j < allCollapseMenus.length; j++) {
    allCollapseMenus[j].classList.remove('showCollapse');
    linkCollapse[j].querySelector('.collapse__icon').classList.remove('rotate');
  }
}

for (let i = 0; i < linkCollapse.length; i++) {
  linkCollapse[i].addEventListener('click', function () {
    const collapseMenu = this.nextElementSibling;
    const isOpen = collapseMenu.classList.contains('showCollapse');
    
    // Close all collapse menus if not currently open
    if (!isOpen) {
      closeAllCollapseMenus();
      
      // Open the clicked collapse menu
      collapseMenu.classList.add('showCollapse');
      this.querySelector('.collapse__icon').classList.add('rotate');
      
      // Ensure the expander menu is open
      navbar.classList.add('expander');
      bodypadding.classList.add('body-pd');
    } else {
      // Close the clicked collapse menu
      collapseMenu.classList.remove('showCollapse');
      this.querySelector('.collapse__icon').classList.remove('rotate');
    }
  });
}

// Monitor navbar state and close collapse menus if navbar is closed
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.attributeName === 'class') {
      if (!navbar.classList.contains('expander')) {
        closeAllCollapseMenus();
      }
    }
  });
});


// observer.observe(navbar, { attributes: true });

function validateNumber(input) {
  input.value = input.value.replace(/[^0-9.+]/g, '');
}

function validateNumbe1(input) {
  input.value = input.value.replace(/[^0-9.]/g, ''); // Permitir números y puntos
  // Solo permitir un punto decimal
  const parts = input.value.split('.');
  if (parts.length > 2) {
      input.value = parts[0] + '.' + parts.slice(1).join('');
  }
}


document.querySelectorAll('.form-control').forEach(input => {
  input.setAttribute('autocomplete', 'off');
});

document.querySelectorAll('.form-control').forEach(input => {
  if (input.tagName === 'INPUT') {
    input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  // Selecciona todos los contenedores con clase 'file-drop-area'
  var fileDropAreas = document.querySelectorAll('.file-drop-area');

  fileDropAreas.forEach(function(fileDropArea) {
      var fileInput = fileDropArea.querySelector('input[type="file"]');
      var fileMessage = fileDropArea.querySelector('.file-message');

      // Asegurarnos de que los eventos se aplican solo una vez
      if (fileInput && fileMessage) {
          // Evitar el comportamiento por defecto para eventos de arrastrar y soltar
          fileDropArea.addEventListener('dragover', function (e) {
              e.preventDefault();
              e.stopPropagation();
              fileDropArea.classList.add('dragover');
          });

          fileDropArea.addEventListener('dragleave', function (e) {
              e.preventDefault();
              e.stopPropagation();
              fileDropArea.classList.remove('dragover');
          });

          fileDropArea.addEventListener('drop', function (e) {
              e.preventDefault();
              e.stopPropagation();
              fileDropArea.classList.remove('dragover');

              var files = e.dataTransfer.files; // Obtener los archivos arrastrados
              if (files.length > 0) {
                  fileInput.files = files; // Asignar archivos al input file
                  fileMessage.textContent = files[0].name; // Mostrar el nombre del archivo
              }
          });

          // Mostrar el nombre del archivo seleccionado manualmente
          fileInput.addEventListener('change', function () {
              if (fileInput.files.length > 0) {
                  fileMessage.textContent = fileInput.files[0].name;
              } else {
                  fileMessage.textContent = "Arrastra tu archivo aquí o haz clic para seleccionar";
              }
          });
      }
  });
});

