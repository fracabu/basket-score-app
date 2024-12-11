// Configurazione password
const password = "ciao";
const expirationMinutes = 100;

// Stato dei quarti
let currentQuarter = 1;
let quarters = {};

// Elementi del DOM
const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");
const passwordInput = document.getElementById("passwordInput");
const loginForm = document.getElementById("loginForm");
const quarterTitle = document.getElementById("quarterTitle");
const prevQuarterBtn = document.getElementById("prevQuarter");
const nextQuarterBtn = document.getElementById("nextQuarter");
const homeScore = document.getElementById("homeScore");
const guestScore = document.getElementById("guestScore");
const generatePDFBtn = document.getElementById("generatePDF");
const localPlayerList = document.getElementById("localPlayerList");
const guestPlayerList = document.getElementById("guestPlayerList");
const addLocalPlayerBtn = document.getElementById("addLocalPlayerBtn");
const addGuestPlayerBtn = document.getElementById("addGuestPlayerBtn");

// Caricamento jsPDF
const jsPDFScript = document.createElement('script');
jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
document.head.appendChild(jsPDFScript);

// Inizializza password e scadenza
function setPassword() {
  const expirationTime = new Date().getTime() + expirationMinutes * 60 * 1000;
  localStorage.setItem("password", password);
  localStorage.setItem("expiration", expirationTime);
}

function validatePassword(inputPassword) {
  const savedPassword = localStorage.getItem("password");
  const expirationTime = parseInt(localStorage.getItem("expiration"));
  const currentTime = new Date().getTime();

  if (!savedPassword || !expirationTime) {
    alert("Password non configurata correttamente.");
    return;
  }

  if (inputPassword === savedPassword && currentTime < expirationTime) {
    loginDiv.classList.add("hidden");
    appDiv.classList.remove("hidden");
    initializeQuarter(currentQuarter);
    loadQuarter();
  } else if (currentTime >= expirationTime) {
    alert("La password è scaduta! Ricarica la pagina per una nuova password.");
  } else {
    alert("Password errata!");
  }
}

// Inizializza password all'avvio
if (!localStorage.getItem("password")) {
  setPassword();
}

// Gestisci il login
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validatePassword(passwordInput.value.trim());
});

// Inizializza i quarti
function initializeQuarter(quarter) {
  if (!quarters[quarter]) {
    quarters[quarter] = {
      homeScore: 0,
      guestScore: 0,
      localPlayers: [],
      guestPlayers: [],
    };
  }
}

// Cambia quarto
function switchQuarter(quarter) {
  saveCurrentQuarter();
  currentQuarter = quarter;
  updateQuarterTitle();
  loadQuarter();
}

// Salva il quarto corrente
function saveCurrentQuarter() {
  quarters[currentQuarter] = {
    homeScore: parseInt(homeScore.value),
    guestScore: parseInt(guestScore.value),
    localPlayers: [...quarters[currentQuarter].localPlayers],
    guestPlayers: [...quarters[currentQuarter].guestPlayers],
  };
}

// Carica i dati del quarto
function loadQuarter() {
  initializeQuarter(currentQuarter);
  const currentData = quarters[currentQuarter];
  homeScore.value = currentData.homeScore || 0;
  guestScore.value = currentData.guestScore || 0;
  renderPlayers("local", quarters[currentQuarter].localPlayers);
  renderPlayers("guest", quarters[currentQuarter].guestPlayers);
}

// Aggiorna il titolo del quarto
function updateQuarterTitle() {
  quarterTitle.textContent = `${currentQuarter}`;
}

// Aggiungi un nuovo giocatore
function addPlayer(team) {
  initializeQuarter(currentQuarter);
  const newPlayer = {
    id: team === "local" ? quarters[currentQuarter].localPlayers.length + 1 : quarters[currentQuarter].guestPlayers.length + 1,
    name: "",
    surname: "",
    number: "",
    points: 0,
    fouls: 0,
  };
  if (team === "local") {
    quarters[currentQuarter].localPlayers.push(newPlayer);
    renderPlayers("local", quarters[currentQuarter].localPlayers);
  } else {
    quarters[currentQuarter].guestPlayers.push(newPlayer);
    renderPlayers("guest", quarters[currentQuarter].guestPlayers);
  }
}

// Renderizza i giocatori
function renderPlayers(team, players) {
  const playerList = team === "local" ? localPlayerList : guestPlayerList;
  playerList.innerHTML = "";
  players.forEach((player, index) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");

    playerDiv.innerHTML = `
      <input type="text" placeholder="Nome" value="${player.name}" onchange="updatePlayer('${team}', ${index}, 'name', this.value)">
      <input type="text" placeholder="Cognome" value="${player.surname}" onchange="updatePlayer('${team}', ${index}, 'surname', this.value)">
      <input type="number" placeholder="N°" value="${player.number}" onchange="updatePlayer('${team}', ${index}, 'number', this.value)">
      <div class="actions">
        <button onclick="updatePoints('${team}', ${index}, 2)">+2</button>
        <button onclick="updatePoints('${team}', ${index}, 3)">+3</button>
        <button onclick="updatePoints('${team}', ${index}, 1)">+1</button>
        <button onclick="addFoul('${team}', ${index})">Fallo</button>
      </div>
      <span>Punti: ${player.points}</span>
      <span>Falli: ${player.fouls}</span>
    `;
    playerList.appendChild(playerDiv);
  });
  updateScores();
}

// Aggiorna i dettagli del giocatore
function updatePlayer(team, index, field, value) {
  const players = team === "local" ? quarters[currentQuarter].localPlayers : quarters[currentQuarter].guestPlayers;
  players[index][field] = value;
  renderPlayers(team, players);
}

function updatePoints(team, index, points) {
  const players = team === "local" ? quarters[currentQuarter].localPlayers : quarters[currentQuarter].guestPlayers;

  // Aggiungi punti al giocatore
  players[index].points += points;

  // Aggiungi punti al totale della squadra
  if (team === "local") {
      quarters[currentQuarter].homeScore += points;
  } else {
      quarters[currentQuarter].guestScore += points;
  }

  // Aggiorna i punteggi visivi
  updateScores();

  // Aggiorna i giocatori
  renderPlayers(team, players);
}


// Gestione dei falli
function addFoul(team, index) {
  const players = team === "local" ? quarters[currentQuarter].localPlayers : quarters[currentQuarter].guestPlayers;
  
  if (players[index].fouls >= 5) {
    alert(`Attenzione: ${players[index].name} ${players[index].surname} ha raggiunto 5 falli!`);
    return;
  }
  
  players[index].fouls += 1;
  
  if (players[index].fouls === 4) {
    alert(`Attenzione: ${players[index].name} ${players[index].surname} ha 4 falli!`);
  }
  
  renderPlayers(team, players);
}


function updateScores() {
  const currentQuarterData = quarters[currentQuarter];
  
  // Aggiorna il valore nell'oggetto stato
  const homeScoreValue = currentQuarterData.homeScore || 0;
  const guestScoreValue = currentQuarterData.guestScore || 0;

  // Aggiorna l'HTML visivo
  document.getElementById("homeScore").textContent = homeScoreValue;
  document.getElementById("guestScore").textContent = guestScoreValue;
}


// Aggiungi questo script all'head del documento HTML
const autoTableScript = document.createElement('script');
autoTableScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.7.1/jspdf.plugin.autotable.min.js';
document.head.appendChild(autoTableScript);

// Modifica la funzione di generazione PDF
generatePDFBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Intestazione
  doc.setFontSize(16);
  doc.text("REFERTO UFFICIALE DI GARA", 105, 20, { align: "center" });

  // Prepara i dati per la squadra di casa
  const localTeamData = quarters[currentQuarter].localPlayers
    .filter(player => player.name || player.surname)
    .map(player => [
      player.number,
      `${player.surname} ${player.name}`,
      player.fouls,
      player.points
    ]);

  // Tabella squadra casa
  doc.setFontSize(12);
  doc.text("SQUADRA CASA", 20, 35);
  doc.autoTable({
    startY: 40,
    head: [['Nr', 'Cognome Nome', 'Falli', 'Punti']],
    body: localTeamData,
    margin: { left: 20 },
    tableWidth: 85,
    styles: { fontSize: 8, cellPadding: 1 },
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 45 },
      2: { cellWidth: 15 },
      3: { cellWidth: 15 }
    }
  });

  // Prepara i dati per la squadra ospite
  const guestTeamData = quarters[currentQuarter].guestPlayers
    .filter(player => player.name || player.surname)
    .map(player => [
      player.number,
      `${player.surname} ${player.name}`,
      player.fouls,
      player.points
    ]);

  // Tabella squadra ospite
  doc.text("SQUADRA OSPITE", 115, 35);
  doc.autoTable({
    startY: 40,
    head: [['Nr', 'Cognome Nome', 'Falli', 'Punti']],
    body: guestTeamData,
    margin: { left: 115 },
    tableWidth: 85,
    styles: { fontSize: 8, cellPadding: 1 },
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 45 },
      2: { cellWidth: 15 },
      3: { cellWidth: 15 }
    }
  });

  // Prepara i dati per il punteggio per quarti
  const quarterScores = [];
  let totalHome = 0;
  let totalGuest = 0;

  Object.entries(quarters).forEach(([quarterNum, data]) => {
    totalHome += data.homeScore || 0;
    totalGuest += data.guestScore || 0;
  });

  quarterScores.push(
    ['CASA', 
      quarters[1]?.homeScore || 0, 
      quarters[2]?.homeScore || 0, 
      quarters[3]?.homeScore || 0, 
      quarters[4]?.homeScore || 0, 
      totalHome
    ],
    ['OSPITI', 
      quarters[1]?.guestScore || 0, 
      quarters[2]?.guestScore || 0, 
      quarters[3]?.guestScore || 0, 
      quarters[4]?.guestScore || 0, 
      totalGuest
    ]
  );

  // Tabella punteggi
  doc.autoTable({
    startY: doc.previousAutoTable.finalY + 20,
    head: [['Squadra', '1°', '2°', '3°', '4°', 'TOT']],
    body: quarterScores,
    margin: { left: 20, right: 20 },
    styles: { fontSize: 10, cellPadding: 2, halign: 'center' },
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 25 },
      2: { cellWidth: 25 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 }
    }
  });

  // Note e firma
  doc.setFontSize(10);
  const noteY = doc.previousAutoTable.finalY + 20;
  doc.text("Note:", 20, noteY);
  doc.line(20, noteY + 5, 190, noteY + 5);
  doc.line(20, noteY + 15, 190, noteY + 15);

  doc.text("Firma arbitro", 20, noteY + 35);
  doc.line(20, noteY + 40, 80, noteY + 40);

  doc.save(`referto_partita_${new Date().toISOString().split('T')[0]}.pdf`);
});

// Navigazione tra i quarti
prevQuarterBtn.addEventListener("click", () => {
  if (currentQuarter > 1) switchQuarter(currentQuarter - 1);
});

nextQuarterBtn.addEventListener("click", () => {
  if (currentQuarter < 4) switchQuarter(currentQuarter + 1);
});

// Aggiungi giocatori
addLocalPlayerBtn.addEventListener("click", () => addPlayer("local"));
addGuestPlayerBtn.addEventListener("click", () => addPlayer("guest"));

// Inizializza
initializeQuarter(currentQuarter);
loadQuarter();