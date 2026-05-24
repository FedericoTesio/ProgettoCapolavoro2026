# ProgettoCapolavoro2026

Benvenuto nel progetto **Tesio Motors**, un sito web per una concessionaria di auto e moto. Il sito permette agli utenti di esplorare i cataloghi dei veicoli, filtrare le ricerche in base a vari parametri (prezzo, anno, marca, stato), visualizzare i dettagli specifici di ogni veicolo e richiedere informazioni, tutto tramite un server in locale.

## Funzionalità Principali

* **Home Page:** Vetrina dinamica con una selezione casuale di auto e moto in evidenza e caroselli di immagini.
* **Catalogo Auto & Moto:** Pagine dedicate con filtri avanzati in tempo reale (ricerca testuale, prezzo massimo, anno minimo, marca, categoria, stato nuovo/usato).
* **Dettagli Veicolo:** Pagine di dettaglio con galleria immagini, specifiche tecniche (es. chilometraggio, anno, prezzo) e un modulo modale per inviare una richiesta di informazioni alla concessionaria.
* **Newsletter:** Modulo di iscrizione alla newsletter integrato nel footer del sito.

## Tecnologie Utilizzate

* **Frontend:** HTML5, CSS3, JavaScript (ES6).
* **Librerie e Framework:** [Bootstrap 5.3](https://getbootstrap.com/) per l'interfaccia utente (UI), layout responsivo e componenti (modali, caroselli).
    * [jQuery](https://jquery.com/) per la manipolazione del DOM, gestione eventi e semplificazione delle chiamate AJAX verso il backend.
    * Bootstrap Icons per la grafica vettoriale.
* **Backend / API Mock:** [JSON Server](https://github.com/typicode/json-server) per simulare un'API RESTful reale in locale.

## Struttura del Progetto

Il progetto è organizzato nel seguente modo:

```Mappa
ProgettoCapolavoro2026/
├── README.md           # Tu ti trovi qui
├── index.html           # Pagina principale (Home)
├── html/                # Pagine interne
│   ├── auto.html
│   ├── moto.html
│   ├── dettagliAuto.html
│   └── dettagliMoto.html
├── css/                 # Fogli di stile
│   ├── index.css
│   └── auto.css
├── js/                  # Logica JavaScript
│   ├── libreria.js      # Funzioni di utilità generiche (es. inviaRichiesta tramite AJAX)
│   ├── index.js         # Logica della Home Page
│   ├── auto.js          # Logica catalogo Auto (caricamento e filtri)
│   ├── moto.js          # Logica catalogo Moto (caricamento e filtri)
│   ├── dettagliAuto.js  # Caricamento dettagli singola auto e form richieste
│   ├── dettagliMoto.js  # Caricamento dettagli singola moto e form richieste
│   └── newsletter.js    # Gestione form iscrizione newsletter
├── img/                 # Risorse grafiche e foto dei veicoli
|   ├── auto             # Immagini delle auto
│   |── moto             # Immagini delle moto
│   └── sito             # Immagini del sito (ad esempio lo sfondo della home)
└── db.json              # File di database utilizzato da json-server (da creare)
```

## Risorse Grafiche e Immagini

Per garantire un'esperienza visiva coerente e professionale all'interno della concessionaria virtuale, il comparto fotografico del sito è stato curato con particolare attenzione.

### Origine delle immagini e utilizzo dell'AI
La maggior parte delle immagini dei veicoli è stata accuratamente ricercata e reperita online. Tuttavia, per completare i cataloghi e mantenere uno standard qualitativo omogeneo, le inquadrature mancanti o difficili da reperire sono state **generate o ritoccate utilizzando l'Intelligenza Artificiale Gemini**. Questo ci ha permesso di avere un set fotografico completo per ogni singolo modello.

### Struttura delle Gallerie
Ogni veicolo presente nel database (sia auto che moto) è corredato da esattamente **4 immagini**, che mostrano il mezzo da 4 punti di vista specifici e predefiniti:

**Per le Auto:**
1. Vista Frontale (`frontale.jpg`)
2. Vista Laterale (`laterale.jpg`)
3. Vista Posteriore (`posteriore.jpg`)
4. Vista degli Interni (`interni.jpg`)

**Per le Moto:**
1. Vista Frontale (`frontale.jpg`)
2. Vista Laterale (`laterale.jpg`)
3. Vista Posteriore (`posteriore.jpg`)
4. Vista del Cruscotto/Manubrio (`dashboard.jpg`)

### Specifiche Tecniche delle Immagini
Per far sì che i caroselli e le schede dei dettagli mantengano sempre lo stesso layout senza deformazioni o scatti durante la navigazione, tutte le immagini sono state uniformate alle seguenti specifiche:
* **Risoluzione Standard:** `1200px` (larghezza) x `800px` (altezza)
* **Formato:** `3:2`

Ecco il codice Markdown pronto da inserire nel tuo README.md. Questa sezione spiega nel dettaglio quali sono i filtri disponibili e la logica con cui operano, basandosi sul funzionamento dei tuoi file auto.js e moto.js.

## Funzionamento dei Filtri (Catalogo Auto e Moto)

Per facilitare la ricerca del veicolo perfetto, le pagine del catalogo (Auto e Moto) sono dotate di un sistema di filtraggio avanzato e dinamico. Tutti i filtri operano in combinazione tra loro (logica *AND*): questo significa che un veicolo verrà mostrato solo se soddisfa **tutti** i criteri selezionati contemporaneamente.

### Tipologie di Filtri Disponibili

1. **Ricerca Testuale (Nome/Modello):** Una barra di ricerca permette di digitare in tempo reale il nome o il modello del veicolo. Il sistema aggiorna istantaneamente i risultati confrontando il testo inserito (ignorando maiuscole e minuscole) con i modelli presenti nel database.

2. **Prezzo Massimo (Slider):**
   Un cursore (range slider) permette di impostare un budget massimo. L'etichetta del prezzo si aggiorna in tempo reale mentre si muove il cursore. Se impostato al valore massimo, la ricerca del prezzo diventa "Illimitata".

3. **Anno di Immatricolazione Minimo (Slider):**
   Un secondo cursore permette di escludere i veicoli più vecchi. Ad esempio, impostando l'anno a "2018", verranno mostrati solo i veicoli prodotti dal 2018 in poi.

4. **Filtro per Marca:**
   Le checkbox delle marche non sono fisse, ma vengono **generate dinamicamente** dal sistema in base ai veicoli effettivamente disponibili nel database. È possibile selezionare una o più marche contemporaneamente.

5. **Filtro per Categoria:**
   Come per le marche, è possibile filtrare i mezzi per tipologia (es. SUV, Berlina, Naked, Sportiva) spuntando le apposite checkbox.

6. **Stato (Nuovo o Usato):**
   Il sistema determina automaticamente lo stato del veicolo leggendo i dati storici dal file `db.json`:
   * **Nuovo:** Il filtro mostra solo i veicoli con chilometraggio uguale a zero (`km === 0`).
   * **Usato:** Il filtro mostra i veicoli con chilometraggio superiore a zero (`km > 0`).

### Come si applicano
* **In Tempo Reale:** La barra di ricerca testuale intercetta l'evento `input` e filtra immediatamente i risultati a ogni tasto premuto.
* **Pulsante "Applica Filtri":** Per i filtri a checkbox e gli slider, le modifiche si attivano cliccando l'apposito pulsante "Applica", che interroga i dati e aggiorna la griglia dei veicoli.
* **Pulsante "Reset":** Riporta tutti gli slider, le barre di ricerca e le checkbox ai valori predefini

## Il Database: `db.json`

Il file `db.json` rappresenta il cuore pulsante dei dati di **Tesio Motors**. È progettato specificamente per interfacciarsi con **JSON Server**, fungendo da database NoSQL locale per simulare un'API RESTful completa. 

### Caratteristiche Principali del Database
* **Struttura a Nodi:** Il file è suddiviso in collezioni principali che fungono da endpoint (es. `/auto`, `/moto`, `/richieste`, `/newsletter`).
* **Estrema Dettagliatezza:** Le schede dei veicoli non sono piatte, ma sono suddivise in sotto-oggetti tematici (motore, prestazioni, telaio, ecc.) per una gestione più pulita e modulare delle informazioni in fase di rendering.
* **Tipizzazione dei Dati:** I valori sono formattati per essere letti in modo chiaro dall'interfaccia (es. i prezzi e le misure contengono già le relative unità di misura formattate, mentre i dati numerici calcolabili come i chilometri sono salvati come interi `km: 0`).

---

### Struttura Base e Collezioni
Il database espone 4 endpoint principali:

```json
{
  "auto": [ ... array di oggetti auto ... ],
  "moto": [ ... array di oggetti moto ... ],
  "richieste": [ ... array per salvare i form di contatto ... ],
  "newsletter": [ ... array per salvare le mail degli iscritti ... ]
}
```

### Esempio di Scheda Veicolo e Campi (auto)
Ogni auto nel database presenta una struttura annidata altamente informativa. Ecco un esempio dei campi che troverai all'interno dell'oggetto di un singolo veicolo (es. Ferrari F40):

```json auto
{
  "auto": [
        {
          "id": "CAR-1",
          "modello": "Ferrari F40",
          "categoria": "Supercar",

          "motore_trasmissione": {
            "codice_motore": "F120 A",
            "architettura": "V8 90°",
            "cilindrata_totale": "2.936 cc",
            "rapporto_compressione": "7.7:1",
            "sovralimentazione": "Doppio Turbo IHI",
            "distribuzione": "Bialbero, 4 valvole per cilindro",
            "lubrificazione": "Carter secco",
            "cambio": "Manuale 5 rapporti",
            "frizione": "Bidisco a secco"
          },

          "prestazioni": {
            "potenza_massima": "478 CV",
            "coppia_massima": "577 Nm",
            "velocita_massima": "324 km/h",
            "accel_0_100": "4.1 s",
            "accel_0_200": "11.3 s",
            "chilometro_fermo": "20.9 s"
          },

          "telaio_sospensioni": {
            "telaio": "Traliccio tubolare in acciaio e compositi",
            "sospensioni": "Quadrilateri trasversali indipendenti",
            "freni": "Dischi autoventilanti Brembo",
            "pneumatici": "Pirelli P-Zero",
            "sterzo": "Pignone e cremagliera"
          },

          "dimensioni_pesi": {
            "peso_a_secco": "1.100 kg",
            "lunghezza": "4.358 mm",
            "larghezza": "1.970 mm",
            "altezza": "1.124 mm",
            "passo": "2.450 mm",
            "serbatoio": "120 L"
          },

          "aerodinamica_design": {
            "cx": "0.34",
            "materiali_carrozzeria": "Kevlar, Fibra di Carbonio, Alluminio",
            "dettagli_estetici": "Ala posteriore fissa, 11 feritoie sul lunotto",
            "verniciatura": "Rosso Corsa",
            "interni": {
              "tipo": "Racing essenziale",
              "colore": "Rosso"
            }
          },

          "dati_storici_commerciali": {
            "anni_produzione": "1987-1992",
            "anno": "1989",
            "esemplari_prodotti": "1.311",
            "numero_esemplare": "322",
            "designer": "Pininfarina",
            "prezzo_listino_orig": "374.000.000 Lire",
            "prezzo_attuale": "2.800.000 €",
            "km": 25000
          }
        }
    ]
}
```

### Esempio di Scheda Veicolo e Campi (moto)
Ogni moto nel database presenta una struttura annidata altamente informativa. Ecco un esempio dei campi che troverai all'interno dell'oggetto di un singolo veicolo (es. Ducati Panigale V4 S):

```json moto
{
  "moto": [
        {
          "id": "BIKE-1",
          "modello": "Ducati Panigale V4 S",
          "categoria": "Supersportiva",
        
          "motore_trasmissione": {
            "codice_motore": "Desmosedici Stradale V4",
            "architettura": "V4 a 90° con albero controrotante",
            "cilindrata_totale": "1.103 cc",
            "rapporto_compressione": "14.0:1",
            "sovralimentazione": "Aspirato",
            "distribuzione": "Desmodromica, 4 valvole per cilindro",
            "lubrificazione": "Carter semisecco",
            "cambio": "6 marce con Ducati Quick Shift (DQS) up/down EVO 2",
            "frizione": "Multidisco in bagno d'olio, antisaltellamento"
          },
        
          "prestazioni": {
            "potenza_massima": "215.5 CV",
            "coppia_massima": "123.6 Nm",
            "velocita_massima": ">300 km/h",
            "accel_0_100": "3.0 s",
            "accel_0_200": "7.2 s",
            "chilometro_fermo": "18.9 s"
          },
        
          "telaio_sospensioni": {
            "telaio": "Front Frame in lega di alluminio",
            "sospensioni": "Forcella Öhlins NPX 25/30, mono Öhlins TTX36 (Smart EC 2.0)",
            "freni": "Doppio disco anteriore Brembo Stylema",
            "pneumatici": "Pirelli Diablo Supercorsa SP",
            "sterzo": "Ammortizzatore di sterzo Öhlins Smart EC 2.0"
          },
        
          "dimensioni_pesi": {
            "peso_a_secco": "174 kg",
            "lunghezza": "2.056 mm",
            "larghezza": "810 mm",
            "altezza": "1.115 mm",
            "passo": "1.469 mm",
            "serbatoio": "17 L"
          },
        
          "aerodinamica_design": {
            "cx": "0.32",
            "materiali_carrozzeria": "Tecnopolimeri e inserti in carbonio",
            "dettagli_estetici": "Ali aerodinamiche derivate dalla MotoGP",
            "verniciatura": "Rosso Ducati",
            "sella": {
              "tipo": "Racing bicolore",
              "colore": "Nero/Rosso"
            }
          },
        
          "dati_storici_commerciali": {
            "anni_produzione": "2022-2024",
            "anno": "2022",
            "esemplari_prodotti": "Serie regolare",
            "numero_esemplare": "412",
            "designer": "Centro Stile Ducati",
            "prezzo_listino_orig": "31.590 €",
            "prezzo_attuale": "26.000 €",
            "km": 4500
          }
        }
    ]
}
```

## Come scaricare e avviare il progetto da GitHub

Se vuoi testare o sviluppare questo progetto sul tuo computer locale, segui questa procedura dettagliata passo dopo passo.

### 1. Clonare il repository da GitHub
Per scaricare tutti i file del progetto sul tuo computer, apri il terminale (o il prompt dei comandi) e posizionati nella cartella in cui desideri salvare il progetto (ad esempio sul Desktop o in una cartella dedicata ai tuoi progetti).

Usa il comando `git clone` seguito dall'URL del repository GitHub:

```bash
git clone [https://github.com/tuo-username/nome-del-repository.git](https://github.com/tuo-username/nome-del-repository.git)
```

Dopodiché non ti resta che aprire la cartella e troverai tutti i file al suo interno


## Come avviare il progetto in locale

Il progetto utilizza **JSON Server** per simulare un database backend e fornire le API REST ai file JavaScript. Segui questi passaggi per avviare il server e utilizzare il sito.

### 1. Prerequisiti
Assicurati di avere [Node.js](https://nodejs.org/) (che include npm) installato sul tuo computer.

### 2. Installazione di JSON Server
Apri il tuo terminale (scrivendo cmd nella barra di ricerca del tuo pc) e installa `json-server` a livello globale eseguendo questo comando:

```bash
npm install -g json-server
```

### 3. Spostamento db.json
Apri il progetto entra nella cartella db e copia il db.json, poi vai sul disco C del tuo compuer, clicca sulla cartella `Utenti`, poi clicca sulla `cartella del tuo utente`, poi vai su `visualizza`, vai su `mostra` e clicca su `elementi nascosti`, apparira un cartella `AppData`, clicca sopra, poi clicca su `Roaming`, poi su `npm` e dentro quella cartella incolla il db.json, il percorso è il seguente:

```Percorso
C:\Users\nome_dell_utente\AppData\Roaming\npm
```

### 4. Avvio json-server
Clicca in alto sul percorso e scrivi cmd, ti si aprirà un terminale dove devi scrivere il seguente comando:

```bash
json-server --port 3000 db.json
```

Il server è attivo quindi ora il sito ha i dati è può funzionare.

## Come vedere il sito

Una volta seguiti tutti questi passaggi basta cliccare sul file `index.html` nella cartella `ProgettoCapolavoro2026`

---
### A opera di: [Tesio Federico](https://github.com/FedericoTesio)