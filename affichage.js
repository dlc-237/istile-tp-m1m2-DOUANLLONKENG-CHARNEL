const NOMBRE_PAR_DEFAUT = 6;

const conteneur = document.getElementById("liste-etudiants");
const message = document.getElementById("message");
const formulaire = document.getElementById("formulaire-recherche");
const champ = document.getElementById("champ-recherche");

let etudiants = [];

function creerCarte({ prenom, nom, filiere, note }) {
  const carte = document.createElement("article");
  carte.classList.add("carte-etudiant");

  const titre = document.createElement("h3");
  titre.textContent = `${prenom} ${nom.toUpperCase()}`;

  const ligneFiliere = document.createElement("p");
  ligneFiliere.textContent = `Filière : ${filiere}`;

  const ligneNote = document.createElement("p");
  ligneNote.textContent = `Note : ${note}`;

  carte.append(titre, ligneFiliere, ligneNote);

  return carte;
}

function afficher(liste) {
  conteneur.replaceChildren(...liste.map(creerCarte));

  message.textContent =
    liste.length === 0
      ? "Aucun étudiant trouvé."
      : `${liste.length} étudiant(s) affiché(s).`;
}

function rechercher() {
  const terme = champ.value.trim().toLowerCase();

  if (terme === "") {
    afficher(etudiants.slice(0, NOMBRE_PAR_DEFAUT));
    return;
  }

  const resultat = etudiants.filter(
    ({ prenom, nom }) =>
      `${prenom} ${nom}`.toLowerCase().includes(terme)
  );

  afficher(resultat);
}

async function charger() {
  try {
    const reponse = await fetch("./etudiants.json");

    if (!reponse.ok) {
      message.textContent =
        `Erreur de chargement (${reponse.status}).`;
      return;
    }

    etudiants = await reponse.json();

    afficher(
      etudiants.slice(0, NOMBRE_PAR_DEFAUT)
    );
  } catch (erreur) {
    console.error(erreur);

    message.textContent =
      "Impossible de charger les étudiants. Lancez le projet avec Live Server.";
  }
}

formulaire.addEventListener("submit", (event) => {
  event.preventDefault();
  rechercher();
});

champ.addEventListener("input", rechercher);

charger();
