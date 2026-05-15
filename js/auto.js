"use strict";
const URL = "http://localhost:3000";

let globalCars = [];

$(document).ready(function () {
    loadAllCars();

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

    $("#all-cars-container").on("click", "button[name='btn-dettagli']", apriDettagli);
});

function loadAllCars() {
    let request = inviaRichiesta("GET", `${URL}/auto`);
    request.done(function (allCars) {
        globalCars = allCars;
        createBrandFilters(allCars);
        renderCars(allCars);
    });
}

function createBrandFilters(cars) {
    // Estraiamo le marche uniche dal campo modello (es. "Ferrari F40" -> "Ferrari")
    let brands = [...new Set(cars.map(c => c.modello.split(' ')[0]))];
    let container = $("#brandContainer");
    container.empty();

    brands.forEach(brand => {
        container.append(`
            <input type="checkbox" class="btn-check filter-brand" id="check-${brand}" value="${brand}">
            <label class="btn btn-outline-dark" for="check-${brand}">${brand}</label>
        `);
    });
}

function renderCars(cars) {
    let container = $("#all-cars-container");
    container.empty();

    cars.forEach(car => {
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

    let filtered = globalCars.filter(car => {
        let price = parseInt(car.dati_storici_commerciali.prezzo_attuale.replace(/\./g, '').replace('€', ''));
        let year = parseInt(car.dati_storici_commerciali.anno);
        let brand = car.modello.split(' ')[0];
        let matchSearch = car.modello.toLowerCase().includes(search);
        let matchPrice = (maxPrice == 5000000) || (price <= maxPrice);
        let matchYear = year >= minYear;
        let matchBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);

        // Categoria (Epoca vs Sportiva)
        let matchCategory = true;
        if (selectedCategories.length > 0) {
            matchCategory = selectedCategories.some(cat => {
                if (cat === "epoca") return year <= sogliaEpoca;
                if (cat === "sportiva") return parseInt(car.prestazioni.potenza_massima) > 400; // Esempio: > 400CV
                return true;
            });
        }

        return matchSearch && matchPrice && matchYear && matchBrand && matchCategory;
    });

    renderCars(filtered);
}

function apriDettagli() {
    let idAuto = $(this).attr("data-id");

    // Salviamo nel localStorage
    localStorage.setItem("idAutoSelezionata", idAuto);
    window.location.href = "../html/dettagliAuto.html";
}

function resetFilters() {
    $("#searchBar").val("");
    $(".btn-check").prop("checked", false);
    $("#rangePrice").val(5000000);
    $("#rangeYear").val(1950);
    $("#priceLabel").text("Illimitato");
    $("#yearLabel").text("1950");
    applyFilters();
}