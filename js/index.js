"use strict";

const URL = "http://localhost:3000"

$(document).ready(function () {
    loadRandomCars();
});

async function loadRandomCars() {
    let request = inviaRichiesta("GET", `${URL}/auto`);
    request.fail(errore);
    request.done(function (allCars) {

        // Mescola l'array e prendi le prime 6 auto
        let shuffled = allCars.sort(() => 0.5 - Math.random());
        let selectedCars = shuffled.slice(0, 6);

        let container = $("#car-container"); // Usiamo jQuery visto che lo carichi
        container.empty(); 

        selectedCars.forEach(function(car) {
            // Definiamo i nomi delle immagini come richiesto
            const imgs = ["frontale.jpg", "laterale.jpg", "posteriore.jpg", "interni.jpg"];
            const carouselId = `carousel-${car.id}`;
            const imagePathBase = `img/auto/${car.id}`;

            // Generiamo gli indicatori e i vari item del carousel
            let carouselItems = "";
            imgs.forEach((imgName, index) => {
                carouselItems += `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${imagePathBase}/${imgName}" class="d-block w-100" alt="${imgName}">
                    </div>`;
            });

            let cardHtml = `
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100 shadow-sm vehicle-card border-0">
                        
                        <div id="${carouselId}" class="carousel slide" data-bs-ride="false">
                            <div class="carousel-inner">
                                ${carouselItems}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${car.modello}</h5>
                            <p class="card-text text-secondary mb-1">
                                <i class="bi bi-speedometer2"></i> ${car.prestazioni.potenza_massima}
                            </p>
                            <p class="card-text text-danger fw-bold h5 mt-3">
                                ${car.dati_storici_commerciali.prezzo_attuale}
                            </p>
                            <button class="btn btn-brand w-100 mt-3">Dettagli</button>
                        </div>
                    </div>
                </div>
            `;
            container.append(cardHtml);
        });
    });
}