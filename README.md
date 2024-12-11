# Basket Scorer

Basket Scorer è un'applicazione web per gestire e monitorare i punteggi di una partita di basket.
L'app consente di aggiungere giocatori, aggiornare i punteggi, tracciare i falli per ogni quarto e generare un referto ufficiale in formato PDF.

## Caratteristiche principali

- **Login con password:** Accesso sicuro con scadenza della password configurabile.
- **Gestione punteggi cumulativi:** Punti accumulati visibili nel tabellone in tempo reale.
- **Tracciamento dettagliato per quarti:** Dati su punti e falli per ogni quarto.
- **Generazione PDF:** Referto completo con punteggi e statistiche per ogni squadra e quarto.
- **Aggiunta e gestione giocatori:** Possibilità di aggiungere giocatori con nome, cognome, numero e aggiornare punti e falli.

## Requisiti

- **Browser:** Google Chrome, Firefox, o qualsiasi browser moderno con supporto a JavaScript.
- **Librerie utilizzate:**
  - [jsPDF](https://github.com/parallax/jsPDF): Per generare il file PDF.
  - [jsPDF-Autotable](https://github.com/simonbengtsson/jsPDF-AutoTable): Per creare tabelle nei PDF.

## Struttura del Progetto

- **index.html:** Contiene il layout della pagina.
- **styles.css:** Gestisce lo stile visivo dell'applicazione.
- **script.js:** Logica dell'applicazione, gestione eventi e funzioni principali.

## Installazione

1. **Clona il repository:**
   ```bash
   git clone https://github.com/tuo-utente/basket-scorer.git
   ```

2. **Apri il progetto:**
   Apri il file `index.html` direttamente nel browser o utilizza un server locale (es. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) per Visual Studio Code).

## Utilizzo

1. **Login:** Inserisci la password per accedere all'app (preconfigurata come `ciao`).
2. **Gestione Quarti:** Usa i pulsanti per navigare tra i quarti della partita.
3. **Aggiungi Giocatori:** Clicca su "Aggiungi Giocatore Local" o "Aggiungi Giocatore Ospite" per aggiungere un nuovo giocatore.
4. **Aggiorna Punti e Falli:** Utilizza i pulsanti accanto a ciascun giocatore per aggiornare i punti o aggiungere falli.
5. **Genera PDF:** Clicca su "Genera PDF" per scaricare il referto della partita.

## Configurazione

Puoi configurare alcuni parametri direttamente nel file `script.js`:

- **Password e durata:**
  ```javascript
  const password = "ciao"; // Password predefinita
  const expirationMinutes = 100; // Durata in minuti
  ```

- **Numero massimo di quarti:**
  Puoi estendere il numero di quarti modificando la logica di navigazione tra i quarti.

## Schermate

### Login
![Login Screen](screenshot-login.png)

### Tabellone e Gestione Giocatori
![App Screen](screenshot-app.png)

### PDF Generato
![PDF Sample](screenshot-pdf.png)

## Icone

### Pallone da Basket
![Basketball Icon](https://www.flaticon.com/svg/static/icons/svg/727/727614.svg)

### Canestro
![Basketball Hoop Icon](https://www.flaticon.com/svg/static/icons/svg/727/727617.svg)

## Contributi

Contribuzioni sono benvenute! Puoi:
- Segnalare bug o proporre nuove funzionalità tramite [Issues](https://github.com/tuo-utente/basket-scorer/issues).
- Fare un fork del progetto, implementare modifiche e aprire una [Pull Request](https://github.com/tuo-utente/basket-scorer/pulls).

## Licenza

Questo progetto è rilasciato sotto la licenza MIT. Consulta il file [LICENSE](LICENSE) per ulteriori dettagli.

