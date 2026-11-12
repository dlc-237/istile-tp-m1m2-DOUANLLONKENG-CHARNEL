import { simulerFetch } from "../outils/simulerFetch.js";
globalThis.fetch = simulerFetch;

import { readFile } from "node:fs/promises";
import {
  moyenneGenerale,
  admis,
  nomsFormates,
  effectifParFiliere,
  moyenneParFiliere,
  classementParNote,
  majNote,
} from "./etudiants.js";
import { chargerUtilisateurs, chargerUtilisateur } from "./charger.js";

const etudiants = JSON.parse(
  await readFile(new URL("../data/etudiants.json", import.meta.url), "utf8")
);

console.log("Moyenne générale :", moyenneGenerale(etudiants));
console.log("Admis :", admis(etudiants));
console.log("Noms formatés :", nomsFormates(etudiants));
console.log("Effectif par filière :", effectifParFiliere(etudiants));
console.log("Moyenne par filière :", moyenneParFiliere(etudiants));


const premierAvant = etudiants[0];
console.log("Classement :", classementParNote(etudiants));
console.log(
  "Liste d'origine inchangée :",
  etudiants[0] === premierAvant
);


const { id, note: ancienneNote } = etudiants[0];
const nouvelleListe = majNote(etudiants, id, 20);
console.log("Objets différents :", etudiants[0] !== nouvelleListe[0]);
console.log("Ancienne note inchangée :", etudiants[0].note === ancienneNote);
console.log("Nouvelle note :", nouvelleListe[0].note)

console.log("Succès :", await chargerUtilisateurs(3));
console.log("Inexistant :", await chargerUtilisateur(99999));
console.log(
  "Réseau :",
  await chargerUtilisateurs(3, "https://hote-invalide.exemple")
);