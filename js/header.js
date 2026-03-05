// Cargar header
fetch('/components/header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;

        // Scroll
        const header = document.querySelector('.header-container');
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Menú hamburguesa
        const hamburger = document.querySelector('.hamburger-btn');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.menu-overlay');
        const closeBtn = document.querySelector('.close-btn');

        const toggleMenu = (open) => {
            navMenu.classList.toggle('open', open);
            overlay.classList.toggle('active', open);
        };

        hamburger.addEventListener('click', () => toggleMenu(!navMenu.classList.contains('open')));
        closeBtn.addEventListener('click', () => toggleMenu(false));
        overlay.addEventListener('click', () => toggleMenu(false));
    });

    const track = document.querySelector('.productos-track');

if (track) {
    const cards = Array.from(track.children);
    const gap = 24;
    let index = 0;
    let isMobile = window.innerWidth <= 768;

    // Clona tarjetas para efecto infinito
    cards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    const cardWidth = () => cards[0].offsetWidth + gap;

    const avanzar = () => {
        index++;
        track.style.transition = 'transform 0.6s ease';
        track.style.transform = `translateX(-${index * cardWidth()}px)`;

        if (index >= cards.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                index = 0;
            }, 600);
        }
    };

    setInterval(avanzar, isMobile ? 2000 : 1500);
}

const form = document.getElementById('comunidad-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
        nombre: form.nombre.value,
        apellidos: form.apellidos.value,
        celular: form.celular.value,
        distrito: form.distrito.value,
        correo: form.correo.value,
    };

    // Enviar a WhatsApp
    const mensaje = `Nuevo registro Comunidad Edyal:%0ANombre: ${datos.nombre} ${datos.apellidos}%0ACelular: ${datos.celular}%0ADistrito: ${datos.distrito}%0ACorreo: ${datos.correo}`;
    window.open(`https://wa.me/51XXXXXXXXX?text=${mensaje}`, '_blank');

    // Enviar a Google Sheets (reemplaza la URL cuando tengas tu Apps Script)
    // const SHEET_URL = 'https://script.google.com/macros/s/TU_URL_AQUI/exec';
    // await fetch(SHEET_URL, { method: 'POST', body: JSON.stringify(datos) });

    form.reset();
});