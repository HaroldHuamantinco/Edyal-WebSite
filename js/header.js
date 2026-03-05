// =====================
// CARRUSEL
// =====================
const track = document.querySelector('.productos-track');

if (track) {
    const cards = Array.from(track.children);
    const gap = 24;
    let index = 0;
    const isMobile = window.innerWidth <= 768;

    cards.forEach(card => track.appendChild(card.cloneNode(true)));

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

// =====================
// FORMULARIO
// =====================
const form = document.getElementById('comunidad-form');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const datos = {
            nombre:    form.nombre.value,
            apellidos: form.apellidos.value,
            celular:   form.celular.value,
            distrito:  form.distrito.value,
            correo:    form.correo.value,
        };

        // Enviar a Google Sheets
        const SHEET_URL = 'TU_URL_APPS_SCRIPT_AQUI';
        try {
            await fetch(SHEET_URL, {
                method: 'POST',
                body: JSON.stringify(datos),
            });
        } catch (err) {
            console.error('Error al enviar a Sheets:', err);
        }

        // Enviar a WhatsApp
        const mensaje =
            `Nuevo registro Comunidad Edyal:%0A` +
            `Nombre: ${datos.nombre} ${datos.apellidos}%0A` +
            `Celular: ${datos.celular}%0A` +
            `Distrito: ${datos.distrito}%0A` +
            `Correo: ${datos.correo}`;
        window.open(`https://wa.me/51997575885?text=${mensaje}`, '_blank');

        form.reset();
    });
}