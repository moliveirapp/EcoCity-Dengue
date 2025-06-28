// Inicialização do mapa
function inicializarMapa() {
    // Coordenadas de Presidente Prudente
    const prudente = [-22.1256, -51.3889];
    
    // Criar mapa
    const mapa = L.map('mapa-dengue').setView(prudente, 13);
    
    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    
    // Adicionar marcadores de exemplo (simulando focos de dengue)
    const focos = [
        { lat: -22.1256, lng: -51.3889, status: 'ativo', bairro: 'Centro', descricao: 'Água parada em vaso' },
        { lat: -22.1300, lng: -51.3800, status: 'verificacao', bairro: 'Vila Marcondes', descricao: 'Pneus abandonados' },
        { lat: -22.1200, lng: -51.4000, status: 'tratado', bairro: 'Jardim Paulista', descricao: 'Lixo acumulado' },
        { lat: -22.1150, lng: -51.3850, status: 'eliminado', bairro: 'Residencial Parque do Lago', descricao: 'Calha entupida' }
    ];
    
    focos.forEach(foco => {
        let cor;
        let icone;
        
        switch(foco.status) {
            case 'ativo':
                cor = 'red';
                icone = 'exclamation-triangle';
                break;
            case 'verificacao':
                cor = 'orange';
                icone = 'hourglass-half';
                break;
            case 'tratado':
                cor = 'green';
                icone = 'check-circle';
                break;
            case 'eliminado':
                cor = 'gray';
                icone = 'times-circle';
                break;
        }
        
        const marcador = L.marker([foco.lat, foco.lng], {
            icon: L.divIcon({
                html: `<i class="fas fa-${icone}" style="color: ${cor}; font-size: 20px;"></i>`,
                iconSize: [20, 20],
                className: 'my-div-icon'
            })
        }).addTo(mapa);
        
        marcador.bindPopup(`
            <strong>Status:</strong> ${foco.status}<br>
            <strong>Bairro:</strong> ${foco.bairro}<br>
            <strong>Descrição:</strong> ${foco.descricao}
        `);
    });
    
    // Adicionar controle de localização
    mapa.locate({setView: true, maxZoom: 16});
    
    function onLocationFound(e) {
        const raio = e.accuracy / 2;
        
        L.marker(e.latlng).addTo(mapa)
            .bindPopup("Você está aqui").openPopup();
        
        L.circle(e.latlng, raio).addTo(mapa);
    }
    
    mapa.on('locationfound', onLocationFound);
    
    function onLocationError(e) {
        alert(e.message);
    }
    
    mapa.on('locationerror', onLocationError);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarMapa();
    
    // Formulário de reportar foco
    document.getElementById('form-reportar').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Relatório enviado com sucesso! A equipe de combate à dengue será notificada.');
        this.reset();
    });
});