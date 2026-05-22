"use strict";
const URL = "http://localhost:3000";
let globalCar = null;

$(document).ready(function () {
    const carId = localStorage.getItem("idAutoSelezionata");
    if (carId) {
        loadCarDetails(carId);
        $(document).on("click", "#btnRichiediInfo", aperturaModale);
        $(document).on("submit", "#formRichiestaInfo", invioRichiestaAllaConcess);
    } else {
        window.location.href = "auto.html";
    }
});

function loadCarDetails(id) {
    let request = inviaRichiesta("GET", `${URL}/auto/${id}`);
    request.fail(errore);
    request.done(function (car) {
        globalCar = car;

        const imgs = ["frontale.jpg", "laterale.jpg", "posteriore.jpg", "interni.jpg"];
        const carouselId = "carouselVehicle";
        const imagePathBase = `../img/auto/${car.id}`;

        let carouselItems = imgs.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${imagePathBase}/${img}" class="d-block w-100" style="height: 500px; object-fit: cover;">
            </div>`).join('');

        let km = car.dati_storici_commerciali.km.toLocaleString('it-IT', {
            maximumFractionDigits: 0
        });

        let html = `
            <div class="card border-0 shadow-sm overflow-hidden mb-5">
                <div class="row g-0">
                    <div class="col-lg-8">
                        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">${carouselItems}</div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-4 p-4 d-flex flex-column justify-content-center bg-white border-start">
                        <h6 class="text-danger fw-bold text-uppercase small mb-2">Esclusiva Tesio Motors</h6>
                        <h1 class="fw-bold mb-3">${car.modello}</h1>
                        <p class="h2 text-dark fw-light mb-4">${car.dati_storici_commerciali.prezzo_attuale}</p>
                        
                        <div class="bg-light p-3 rounded-3 mb-4">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary small">Anno</span>
                                <span class="fw-bold">${car.dati_storici_commerciali.anno}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary small">Produzione</span>
                                <span class="fw-bold">${car.dati_storici_commerciali.anni_produzione}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-secondary small">Esemplari</span>
                                <span class="fw-bold">${car.dati_storici_commerciali.esemplari_prodotti || 'N/D'}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="text-secondary small">Chilometraggio</span>
                                <span class="fw-bold">${km} km</span>
                            </div>
                        </div>

                        <button id="btnRichiediInfo" class="btn btn-brand btn-lg w-100 py-3 mb-2 shadow-sm">Richiedi Informazioni</button>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                            <h5 class="fw-bold border-bottom pb-2 mb-3"><i class="bi bi-gear-wide-connected me-2 text-danger"></i>Motore & Trasmissione</h5>
                            <table class="table table-borderless table-sm">
                                <tr><td class="text-secondary">Codice</td><td class="text-end fw-bold">${car.motore_trasmissione.codice_motore}</td></tr>
                                <tr><td class="text-secondary">Architettura</td><td class="text-end fw-bold">${car.motore_trasmissione.architettura}</td></tr>
                                <tr><td class="text-secondary">Cilindrata</td><td class="text-end fw-bold">${car.motore_trasmissione.cilindrata_totale}</td></tr>
                                <tr><td class="text-secondary">Sovralimentazione</td><td class="text-end fw-bold">${car.motore_trasmissione.sovralimentazione}</td></tr>
                                <tr><td class="text-secondary">Compressione</td><td class="text-end fw-bold">${car.motore_trasmissione.rapporto_compressione}</td></tr>
                                <tr><td class="text-secondary">Distribuzione</td><td class="text-end fw-bold">${car.motore_trasmissione.distribuzione}</td></tr>
                                <tr><td class="text-secondary">Lubrificazione</td><td class="text-end fw-bold">${car.motore_trasmissione.lubrificazione}</td></tr>
                                <tr><td class="text-secondary">Cambio</td><td class="text-end fw-bold">${car.motore_trasmissione.cambio}</td></tr>
                                <tr><td class="text-secondary">Frizione</td><td class="text-end fw-bold">${car.motore_trasmissione.frizione}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                            <h5 class="fw-bold border-bottom pb-2 mb-3"><i class="bi bi-speedometer2 me-2 text-danger"></i>Prestazioni</h5>
                            <table class="table table-borderless table-sm">
                                <tr><td class="text-secondary">Potenza Max</td><td class="text-end fw-bold">${car.prestazioni.potenza_massima}</td></tr>
                                <tr><td class="text-secondary">Coppia Max</td><td class="text-end fw-bold">${car.prestazioni.coppia_massima}</td></tr>
                                <tr><td class="text-secondary">Velocità Max</td><td class="text-end fw-bold">${car.prestazioni.velocita_max}</td></tr>
                                <tr><td class="text-secondary">0-100 km/h</td><td class="text-end fw-bold">${car.prestazioni.accel_0_100}</td></tr>
                                <tr><td class="text-secondary">0-200 km/h</td><td class="text-end fw-bold">${car.prestazioni.accel_0_200 || 'N/D'}</td></tr>
                                <tr><td class="text-secondary">1 km da fermo</td><td class="text-end fw-bold">${car.prestazioni.chilometro_fermo || 'N/D'}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body">
                            <h5 class="fw-bold border-bottom pb-2 mb-3"><i class="bi bi-bounding-box-circles me-2 text-danger"></i>Ciclistica & Pesi</h5>
                            <table class="table table-borderless table-sm">
                                <tr><td class="text-secondary">Telaio</td><td class="text-end fw-bold">${car.telaio_sospensioni.telaio}</td></tr>
                                <tr><td class="text-secondary">Sospensioni</td><td class="text-end fw-bold">${car.telaio_sospensioni.sospensioni}</td></tr>
                                <tr><td class="text-secondary">Freni</td><td class="text-end fw-bold">${car.telaio_sospensioni.freni}</td></tr>
                                <tr><td class="text-secondary">Pneumatici</td><td class="text-end fw-bold">${car.telaio_sospensioni.pneumatici}</td></tr>
                                <tr><td class="text-secondary">Sterzo</td><td class="text-end fw-bold">${car.telaio_sospensioni.sterzo || 'Standard'}</td></tr>
                                <tr><td class="text-secondary">Peso a secco</td><td class="text-end fw-bold">${car.dimensioni_pesi.peso_a_secco}</td></tr>
                                <tr><td class="text-secondary">L x P x A</td><td class="text-end fw-bold small">${car.dimensioni_pesi.lunghezza} x ${car.dimensioni_pesi.larghezza} x ${car.dimensioni_pesi.altezza}</td></tr>
                                <tr><td class="text-secondary">Passo</td><td class="text-end fw-bold">${car.dimensioni_pesi.passo}</td></tr>
                                <tr><td class="text-secondary">Serbatoio</td><td class="text-end fw-bold">${car.dimensioni_pesi.serbatoio || 'N/D'}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <h5 class="fw-bold border-bottom pb-2 mb-3"><i class="bi bi-palette me-2 text-danger"></i>Design & Aerodinamica</h5>
                            <div class="row">
                                <div class="col-md-3 border-end">
                                    <small class="text-secondary">Cx Aerodinamico</small>
                                    <p class="h4 fw-bold">${car.aerodinamica_design.cx}</p>
                                </div>
                                <div class="col-md-3 border-end">
                                    <small class="text-secondary">Materiali</small>
                                    <p class="fw-bold">${car.aerodinamica_design.materiali_carrozzeria}</p>
                                </div>
                                <div class="col-md-3 border-end">
                                    <small class="text-secondary">Verniciatura</small>
                                    <p class="fw-bold text-truncate">${car.aerodinamica_design.verniciatura || 'Standard'}</p>
                                </div>
                                <div class="col-md-3">
                                    <small class="text-secondary">Interni</small>
                                    <p class="fw-bold">${car.aerodinamica_design.interni.tipo} (${car.aerodinamica_design.interni.colore})</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-5">
                <a href="auto.html" class="btn btn-outline-dark px-5">Torna al Catalogo</a>
            </div>
        `;

        $("#detail-container").html(html);

        // Inizializza il carousel
        const el = document.getElementById(carouselId);
        if (el) {
            new bootstrap.Carousel(el, { interval: 3500, ride: 'carousel' });
        }
    });
}

// Apertura della modale
function aperturaModale() {
    if (!globalCar) return;

    let nomeAuto = globalCar.modello;
    let categoriaAuto = globalCar.categoria;
    let prezzoAuto = globalCar.dati_storici_commerciali.prezzo_attuale;

    // Precompila i campi utilizzando i dati dell'auto
    $("#infoVeicolo").val(nomeAuto);
    $("#infoMessaggio").val(`Salve Tesio Motors, vorrei ricevere maggiori informazioni riguardo alla ${nomeAuto} (${categoriaAuto}), attualmente in vendita a ${prezzoAuto}.`);

    $("#modalInformazioni").modal("show");
}

// Invio asincrono del modulo
function invioRichiestaAllaConcess(e) {
    e.preventDefault();

    let datiForm = {
        idVeicolo: globalCar ? globalCar.id : "N/A",
        veicolo: $("#infoVeicolo").val(),
        nome: $("#infoNome").val(),
        cognome: $("#infoCognome").val(),
        email: $("#infoEmail").val(),
        telefono: $("#infoTelefono").val(),
        messaggio: $("#infoMessaggio").val(),
        dataRichiesta: new Date().toLocaleString('it-IT')
    };

    // salviamo i dati in richieste
    let request = inviaRichiesta("POST", `${URL}/richieste`, datiForm);

    request.fail(errore);
    request.done(function () {
        alert("Richiesta inviata con successo! Il team di Tesio Motors ti ricontatterà al più presto.");
        $("#modalInformazioni").modal("hide");
        $("#formRichiestaInfo")[0].reset();
    });
}