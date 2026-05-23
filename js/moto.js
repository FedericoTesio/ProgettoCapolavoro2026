"use strict";
const URL = "http://localhost:3000";

let globalBikes = [];

$(document).ready(function () {
    loadAllBikes();

    // Eventi Live
    $("#searchBar").on("input", applyFilters);
    $("#btnApplica").on("click", applyFilters);

    // Aggiornamento etichette range
    $("#rangePrice").on("input", function () {
        let val = $(this).val();
        $("#priceLabel").text(val == 5000000 ? "Illimitato" : parseInt(val).toLocaleString() + " €");
    });

    $("#rangeYear").on("input", function () {
        $("#yearLabel").text($(this).val());
    });

    $("#btnReset").on("click", resetFilters);

    $("#all-bikes-container").on("click", "button[name='btn-dettagli']", apriDettagli);
});

function loadAllBikes() {
    let request = inviaRichiesta("GET", `${URL}/moto`);
    request.done(function (allBikes) {
        globalBikes = allBikes;
        createBrandFilters(allBikes);
        renderBikes(allBikes);
    });
}

function createBrandFilters(bikes) {
    // Estraiamo le marche uniche dal campo modello (es. "Ducati v4 R" -> "Ducati")
    let brands = [...new Set(bikes.map(c => c.modello.split(' ')[0]))];
    let container = $("#brandContainer");
    container.empty();

    brands.forEach(brand => {
        container.append(`
            <input type="checkbox" class="btn-check filter-brand" id="check-${brand}" value="${brand}">
            <label class="btn btn-outline-dark" for="check-${brand}">${brand}</label>
        `);
    });

    // Estraiamo le categoria uniche dal campo categoria
    let categories = [...new Set(bikes.map(c => c.categoria))];
    container = $("#categoryContainer");
    container.empty();

    categories.forEach(category => {
        container.append(`
            <input type="checkbox" class="btn-check filter-category" id="check-${category}" value="${category}">
            <label class="btn btn-outline-dark" for="check-${category}">${category}</label>
        `);
    });
}

function renderBikes(bikes) {
    let container = $("#all-bikes-container");
    container.empty();

    if (bikes.length === 0) {
        // Se l'array è vuoto, aggiunge il messaggio di errore
        container.html(`
            <div class="col-12 text-center py-5">
                <i class="bi bi-search text-secondary" style="font-size: 3rem;"></i>
                <h3 class="mt-3 text-secondary">Nessun risultato trovato</h3>
                <p class="text-muted">Prova a modificare i filtri o la ricerca.</p>
            </div>
        `);
    } else {
        bikes.forEach(bike => {
            const imgs = ["frontale.jpg", "laterale.jpg", "posteriore.jpg", "dashboard.jpg"];
            const carouselId = `carousel-${bike.id}`;
            const imagePathBase = `../img/auto/${bike.id}`;

            let carouselItems = imgs.map((img, i) => `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img src="${imagePathBase}/${img}" class="d-block w-100" alt="${bike.modello}">
                </div>`).join('');

            let km = bike.dati_storici_commerciali.km.toLocaleString('it-IT', {
                maximumFractionDigits: 0
            });

            let cardHtml = `
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100 shadow-sm border-0 vehicle-card">
                        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">${carouselItems}</div>
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
                            <h5 class="card-title fw-bold">${bike.modello}</h5>
                            <p class="card-text text-secondary mb-1">
                                <i class="bi bi-speedometer2"></i> ${km} km
                            </p>
                            <p class="card-text text-secondary mb-1">
                                <i class="bi bi-calendar-event"></i> ${bike.dati_storici_commerciali.anno}
                            </p>
                            <p class="card-text text-danger fw-bold h5 mt-3">
                                ${bike.dati_storici_commerciali.prezzo_attuale}
                            </p>
                            <button name="btn-dettagli" data-id="${bike.id}" class="btn btn-brand w-100 mt-3">
                                Visualizza Dettagli
                            </button>
                        </div>
                    </div>
                </div>`;
            container.append(cardHtml);
        });
    }
}

function applyFilters() {
    let search = $("#searchBar").val().toLowerCase();
    let maxPrice = parseInt($("#rangePrice").val());
    let minYear = parseInt($("#rangeYear").val());

    const currentYear = new Date().getFullYear();
    const sogliaEpoca = currentYear - 30;

    let selectedBrands = [];
    $(".filter-brand:checked").each(function () { selectedBrands.push($(this).val()); });

    let selectedCategories = [];
    $(".filter-category:checked").each(function () { selectedCategories.push($(this).val()); });

    let selectedStatuses = [];
    $(".filter-status:checked").each(function () { selectedStatuses.push($(this).val()); });

    let filtered = globalBikes.filter(car => {
        let price = parseInt(car.dati_storici_commerciali.prezzo_attuale.replace(/\./g, '').replace('€', ''));
        let year = parseInt(car.dati_storici_commerciali.anno);
        let brand = car.modello.split(' ')[0];
        let category = car.categoria;

        let km = parseInt(car.dati_storici_commerciali.km) || 0;

        let matchSearch = car.modello.toLowerCase().includes(search);
        let matchPrice = (maxPrice == 200000) || (price <= maxPrice);
        let matchYear = year >= minYear;
        let matchBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
        let matchCategory = selectedCategories.length === 0 || selectedCategories.includes(category);

        let matchStatus = true;
        if (selectedStatuses.length > 0) {
            matchStatus = selectedStatuses.some(status => {
                if (status === "nuova") return km === 0;
                if (status === "usata") return km > 0;
                return true;
            });
        }

        // Ritorniamo vero solo se la moto soddisfa tutti i criteri
        return matchSearch && matchPrice && matchYear && matchBrand && matchCategory && matchStatus;
    });

    renderBikes(filtered);
}

function apriDettagli() {
    let idMoto = $(this).attr("data-id");

    // Salviamo nel localStorage
    localStorage.setItem("idMotoSelezionata", idMoto);
    window.location.href = "../html/dettagliMoto.html";
}

function resetFilters() {
    $("#searchBar").val("");
    $(".btn-check").prop("checked", false);
    $("#rangePrice").val(200000);
    $("#rangeYear").val(1950);
    $("#priceLabel").text("Illimitato");
    $("#yearLabel").text("1950");
    applyFilters();
}