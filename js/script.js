/* ============================================
   EVENTOS CHIAPAS — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==============================
    // MENÚ RESPONSIVE
    // ==============================

    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // ==============================
    // FILTRO DE EVENTOS
    // ==============================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const noResults  = document.getElementById('noResults');

    if (filterBtns.length && eventCards.length) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const filter = btn.dataset.filter;

                filterBtns.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');

                let visible = 0;
                eventCards.forEach(function (card) {
                    if (filter === 'todos' || card.dataset.category === filter) {
                        card.style.display = '';
                        visible++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (noResults) {
                    noResults.classList.toggle('hidden', visible > 0);
                }
            });
        });
    }

    // ==============================
    // VALIDACIÓN DEL FORMULARIO
    // ==============================

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            function showError(fieldId, errorId, msg) {
                const field = document.getElementById(fieldId);
                const error = document.getElementById(errorId);
                if (!field || !error) return;
                if (!field.value.trim()) {
                    error.textContent = msg;
                    field.style.borderColor = '#D32F2F';
                    valid = false;
                } else {
                    error.textContent = '';
                    field.style.borderColor = '';
                }
            }

            showError('nombre',     'errorNombre',     'El nombre es obligatorio.');
            showError('tipoEvento', 'errorTipoEvento', 'Selecciona un tipo de evento.');
            showError('mensaje',    'errorMensaje',    'El mensaje no puede estar vacío.');

            const emailField = document.getElementById('email');
            const emailError = document.getElementById('errorEmail');
            if (emailField && emailError) {
                const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailField.value.trim()) {
                    emailError.textContent = 'El correo es obligatorio.';
                    emailField.style.borderColor = '#D32F2F';
                    valid = false;
                } else if (!emailRe.test(emailField.value.trim())) {
                    emailError.textContent = 'Ingresa un correo válido.';
                    emailField.style.borderColor = '#D32F2F';
                    valid = false;
                } else {
                    emailError.textContent = '';
                    emailField.style.borderColor = '';
                }
            }

            if (valid && formSuccess) {
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            }
        });
    }

    console.log('Eventos Chiapas cargado correctamente');

});