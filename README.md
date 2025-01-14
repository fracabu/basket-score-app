# 🏀 Basket Score App
Basket Score App è un'applicazione web per gestire e monitorare i punteggi di una partita di basket.
L'app consente di aggiungere giocatori, aggiornare i punteggi, tracciare i falli per ogni quarto e generare un referto ufficiale in formato PDF.

## ✨ Caratteristiche principali
- **🔒 Login con password:** Accesso sicuro con scadenza della password configurabile.
- **📊 Gestione punteggi cumulativi:** Punti accumulati visibili nel tabellone in tempo reale.
- **📋 Tracciamento dettagliato per quarti:** Dati su punti e falli per ogni quarto.
- **📄 Generazione PDF:** Referto completo con punteggi e statistiche per ogni squadra e quarto.
- **👥 Aggiunta e gestione giocatori:** Possibilità di aggiungere giocatori con nome, cognome, numero e aggiornare punti e falli.

## 🔧 Requisiti
- **🌐 Browser:** Google Chrome, Firefox, o qualsiasi browser moderno con supporto a JavaScript.
- **📚 Librerie utilizzate:**
  - [jsPDF](https://github.com/parallax/jsPDF): Per generare il file PDF.
  - [jsPDF-Autotable](https://github.com/simonbengtsson/jsPDF-AutoTable): Per creare tabelle nei PDF.

## 📁 Struttura del Progetto
- **🗂️ index.html:** Contiene il layout della pagina.
- **🎨 styles.css:** Gestisce lo stile visivo dell'applicazione.
- **⚙️ script.js:** Logica dell'applicazione, gestione eventi e funzioni principali.

## 📥 Installazione
1. **Clona il repository:**
   ```bash
   git clone https://github.com/tuo-utente/basket-score-app.git
   ```
2. **Apri il progetto:**
   Apri il file `index.html` direttamente nel browser o utilizza un server locale (es. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) per Visual Studio Code).

## 🎮 Utilizzo
1. **🔑 Login:** Inserisci la password per accedere all'app (preconfigurata come `ciao`).
2. **⏱️ Gestione Quarti:** Usa i pulsanti per navigare tra i quarti della partita.
3. **➕ Aggiungi Giocatori:** Clicca su "Aggiungi Giocatore Local" o "Aggiungi Giocatore Ospite" per aggiungere un nuovo giocatore.
4. **🔄 Aggiorna Punti e Falli:** Utilizza i pulsanti accanto a ciascun giocatore per aggiornare i punti o aggiungere falli.
5. **💾 Genera PDF:** Clicca su "Genera PDF" per scaricare il referto della partita.

## ⚙️ Configurazione
Puoi configurare alcuni parametri direttamente nel file `script.js`:
- **Password e durata:**
  ```javascript
  const password = "ciao"; // Password predefinita
  const expirationMinutes = 100; // Durata in minuti
  ```
- **Numero massimo di quarti:**
  Puoi estendere il numero di quarti modificando la logica di navigazione tra i quarti.

## 📸 Schermate
### Login
![image](https://github.com/user-attachments/assets/5a560d20-4528-4ea0-a06a-9772157b751e)

### Tabellone e Gestione Giocatori
![image](https://github.com/user-attachments/assets/fcc91c23-d8ca-489e-8a29-135c0eba22a3)

## 📝 Licenza
Questo progetto è rilasciato sotto la licenza MIT. Consulta il file [LICENSE](LICENSE) per ulteriori dettagli.

## 🤝 Contribuire
Le contribuzioni sono sempre benvenute! Ecco come puoi aiutare:

1. 🍴 Fai un fork del repository
2. 👯 Clona il tuo fork
3. ✨ Fai le tue modifiche
4. 📫 Invia una pull request

## 🐛 Segnalazione Bug
Se trovi un bug, per favore apri una issue su GitHub con:

- 🔍 Una descrizione dettagliata del problema
- 📝 Gli step per riprodurre il bug
- 🖥️ L'ambiente in cui si verifica (browser, versione, etc.)

## 📞 Contatti
- 📧 Email: fracabu@gmail.com
- 🌐 Sito Web: [https://www.linkedin.com/in/francesco-~-capurso-5801031a9/](https://www.linkedin.com/in/francesco-~-capurso-5801031a9/)


## 🙏 Ringraziamenti
- 👏 A tutti i contributori che hanno aiutato a migliorare questo progetto
- 🌟 Alle librerie open source utilizzate
- 💕 Alla comunità del basket per il supporto

## 🔄 Changelog
### Versione 1.0.0 (2024-12-11)
- 🎉 Prima release pubblica
- ✨ Implementazione delle funzionalità base
- 🔧 Correzione bug minori

---
⭐️ Se ti piace questo progetto, metti una stella su GitHub!

