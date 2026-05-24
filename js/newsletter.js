$(document).ready(function () {

    // Intercettiamo l'evento di submit del form
    $("#form-newsletter").on("submit", function (e) {
        // Impediamo il ricaricamento della pagina
        e.preventDefault();

        let userEmail = $("#sub-newsletter").val().trim();

        if (userEmail === "") {
            alert("Per favore, inserisci un indirizzo email valido.");
            return;
        }

        let datiForm = {
            email: userEmail,
            dataIscrizione: new Date().toISOString()
        };

        let request = inviaRichiesta("POST", `${URL}/newsletter`, datiForm);
        request.fail(errore);
        request.done(function () {
            // Operazione riuscita con successo
            alert("Iscrizione avvenuta con successo! Grazie per esserti registrato.");

            // Resettiamo il form cancellando il testo inserito
            $("#form-newsletter")[0].reset();
        });
    });
});