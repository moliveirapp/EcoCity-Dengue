// Configuração do VLibras
document.addEventListener('DOMContentLoaded', function() {
    new window.VLibras.Widget({
        rootPah: '/app',
        personalization: 'https://vlibras.gov.br/config/default_logo.json',
        opacity: 0.5,
        position: 'R',
        avatar: 'random',
    });
});