// Funções gerais do site
document.addEventListener('DOMContentLoaded', function() {
    // Ativar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Animar estatísticas
    if (document.querySelector('.estatisticas')) {
        const estatisticas = document.querySelectorAll('.estatisticas h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = parseInt(entry.target.textContent.replace(/\D/g, ''));
                    const duration = 2000;
                    const increment = end / (duration / 16);
                    
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            clearInterval(timer);
                            entry.target.textContent = end.toLocaleString() + (entry.target.textContent.match(/\D+$/) ? entry.target.textContent.match(/\D+$/)[0] : '');
                        } else {
                            entry.target.textContent = Math.floor(start).toLocaleString() + (entry.target.textContent.match(/\D+$/) ? entry.target.textContent.match(/\D+$/)[0] : '');
                        }
                    }, 16);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        estatisticas.forEach(estatistica => {
            observer.observe(estatistica);
        });
    }
});