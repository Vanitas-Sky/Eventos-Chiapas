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

    // ==============================
    // APLICACIÓN WEB PROGRESIVA
    // ==============================

    const pwaStatus = document.getElementById('pwaStatus');
    const installButton = document.getElementById('installApp');
    let deferredInstallPrompt = null;
    let serviceWorkerReady = false;

    function updatePwaStatus() {
        if (!pwaStatus) return;

        if (!navigator.onLine) {
            pwaStatus.textContent = 'Sin conexión: puedes consultar las páginas y recursos guardados en este dispositivo.';
        } else if (!window.isSecureContext) {
            pwaStatus.textContent = 'Para instalar la aplicación y usar el modo sin conexión, abre el sitio desde HTTPS o localhost.';
        } else if (!('serviceWorker' in navigator)) {
            pwaStatus.textContent = 'Este navegador no admite el modo sin conexión de la aplicación.';
        } else if (serviceWorkerReady) {
            pwaStatus.textContent = 'Aplicación lista. Las páginas y recursos locales están disponibles sin conexión.';
        } else {
            pwaStatus.textContent = 'Conectado. Preparando la aplicación para su uso sin conexión...';
        }
    }

    updatePwaStatus();
    window.addEventListener('online', updatePwaStatus);
    window.addEventListener('offline', updatePwaStatus);

    window.addEventListener('beforeinstallprompt', function (event) {
        event.preventDefault();
        deferredInstallPrompt = event;
        if (installButton) installButton.hidden = false;
    });

    window.addEventListener('appinstalled', function () {
        deferredInstallPrompt = null;
        if (installButton) installButton.hidden = true;
        if (pwaStatus) pwaStatus.textContent = 'Eventos Chiapas está instalada en este dispositivo.';
    });

    if (installButton) {
        installButton.addEventListener('click', async function () {
            if (!deferredInstallPrompt) return;

            try {
                deferredInstallPrompt.prompt();
                await deferredInstallPrompt.userChoice;
            } catch (error) {
                if (pwaStatus) {
                    pwaStatus.textContent = 'No se pudo iniciar la instalación. Inténtalo desde el menú del navegador.';
                }
                console.error('No se pudo iniciar la instalación de la aplicación:', error);
            } finally {
                deferredInstallPrompt = null;
                installButton.hidden = true;
            }
        });
    }

    if ('serviceWorker' in navigator && window.isSecureContext) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function () {
                return navigator.serviceWorker.ready;
            })
            .then(function () {
                serviceWorkerReady = true;
                updatePwaStatus();
            })
            .catch(function (error) {
                if (pwaStatus) {
                    pwaStatus.textContent = 'No se pudo preparar el modo sin conexión. Revisa la consola del navegador.';
                }
                console.error('No se pudo registrar el service worker:', error);
            });
    } else {
        updatePwaStatus();
    }

    console.log('Eventos Chiapas cargado correctamente');

});