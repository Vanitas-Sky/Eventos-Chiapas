/* ============================================
   EVENTOS CHIAPAS — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. MENÚ HAMBURGUESA (responsive)
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 2. FILTRO DE EVENTOS
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const noResults  = document.getElementById('noResults');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Actualizar botón activo
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        let visibleCount = 0;

        eventCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'todos' || category === filter) {
            card.style.display = '';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Mostrar mensaje si no hay resultados
        if (noResults) {
          noResults.classList.toggle('hidden', visibleCount > 0);
        }
      });
    });
  }

  // ==========================================
  // 3. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Limpiar errores previos
      clearErrors();

      const nombre     = document.getElementById('nombre');
      const email      = document.getElementById('email');
      const tipoEvento = document.getElementById('tipoEvento');
      const mensaje    = document.getElementById('mensaje');

      let isValid = true;

      // Validar nombre
      if (!nombre.value.trim()) {
        showError('errorNombre', nombre, 'El nombre es obligatorio.');
        isValid = false;
      } else if (nombre.value.trim().length < 3) {
        showError('errorNombre', nombre, 'Ingresa al menos 3 caracteres.');
        isValid = false;
      }

      // Validar email
      if (!email.value.trim()) {
        showError('errorEmail', email, 'El correo electrónico es obligatorio.');
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError('errorEmail', email, 'Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Validar tipo de evento
      if (!tipoEvento.value) {
        showError('errorTipoEvento', tipoEvento, 'Selecciona el tipo de evento.');
        isValid = false;
      }

      // Validar mensaje
      if (!mensaje.value.trim()) {
        showError('errorMensaje', mensaje, 'El mensaje es obligatorio.');
        isValid = false;
      } else if (mensaje.value.trim().length < 10) {
        showError('errorMensaje', mensaje, 'El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
      }

      if (isValid) {
        // Simular envío exitoso (sin backend)
        contactForm.classList.add('hidden');
        if (formSuccess) {
          formSuccess.classList.remove('hidden');
        }

        // Scroll al mensaje de éxito
        if (formSuccess) {
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  // ==========================================
  // UTILIDADES
  // ==========================================

  /**
   * Muestra un mensaje de error en un campo.
   * @param {string} errorId  - ID del elemento <span> de error
   * @param {HTMLElement} field - Campo del formulario
   * @param {string} message  - Texto del error
   */
  function showError(errorId, field, message) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
      errorSpan.textContent = message;
    }
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
  }

  /**
   * Limpia todos los mensajes de error del formulario.
   */
  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(function (span) {
      span.textContent = '';
    });
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea')
      .forEach(function (field) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
      });
  }

  /**
   * Valida formato básico de email.
   * @param {string} value
   * @returns {boolean}
   */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Limpiar error individual al escribir en un campo
  if (contactForm) {
    contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        const errorSpan = document.getElementById('error' + capitalize(field.id));
        if (errorSpan) {
          errorSpan.textContent = '';
        }
      });
    });
  }

  /**
   * Capitaliza la primera letra de una cadena.
   * @param {string} str
   * @returns {string}
   */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

});
