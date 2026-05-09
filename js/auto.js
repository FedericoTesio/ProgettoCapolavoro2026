"use strict";
const URL = "http://localhost:3000";

$(document).ready(function () {
    loadAllCars();

    $("#all-cars-container").on("click", "button[name='btn-dettagli']", apriDettagli);
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
                            <button name="btn-dettagli" data-id="${car.id}" class="btn btn-brand w-100 mt-3">
                                Visualizza Dettagli
                            </button>
                        </div>
                    </div>
                </div>`;
            container.append(cardHtml);
        });
    });
}

function apriDettagli(id) {
    let idAuto = $(this).attr("data-id");

    // Salviamo nel localStorage
    localStorage.setItem("idAutoSelezionata", idAuto);
    window.location.href = "../html/dettagliAuto.html";
}