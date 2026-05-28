/* ============================================
   EVENTOS CHIAPAS — JavaScript Básico
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==============================
    // MENÚ RESPONSIVE
    // ==============================

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if(navToggle && navLinks){

        navToggle.addEventListener('click', function(){

            navLinks.classList.toggle('open');

        });

    }

    // ==============================
    // MENSAJE SIMPLE
    // ==============================

    console.log("Eventos Chiapas cargado correctamente");

});