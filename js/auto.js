"use strict";
const URL = "http://localhost:3000";

$(document).ready(function () {
    loadAllCars();
});

function loadAllCars() {
    let request = inviaRichiesta("GET", `${URL}/auto`);
    request.done(function (allCars) {
        let container = $("#all-cars-container");
        container.empty();

        allCars.forEach(car => {
            const imgs = ["frontale.jpg", "laterale.jpg", "posteriore.jpg", "interni.jpg"];
            const carouselId = `carousel-${car.id}`;
            const imagePathBase = `../img/auto/${car.id}`;

            let carouselItems = imgs.map((img, i) => `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img src="${imagePathBase}/${img}" class="d-block w-100" alt="${car.modello}">
                </div>`).join('');

            let cardHtml = `
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100 shadow-sm border-0 vehicle-card">
                        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">${carouselItems}</div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${car.modello}</h5>
                            <p class="text-danger fw-bold h5">${car.dati_storici_commerciali.prezzo_attuale}</p>
                            <a href="" class="btn btn-brand w-100 mt-3">Visualizza Dettagli</a>
                        </div>
                    </div>
                </div>`;
            container.append(cardHtml);
        });
    });
}