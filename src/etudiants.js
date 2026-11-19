export function moyenneGenerale(liste) {
  const somme = liste.reduce((cumul, etudiant) => cumul + etudiant.note, 0);
  return Number((somme / liste.length).toFixed(2));
}

export function admis(liste) {
  return liste.filter((etudiant) => etudiant.note >= 10);
}

export function nomsFormates(liste) {
  return liste.map(({ prenom, nom }) => `${nom.toUpperCase()} ${prenom}`);
}

export function effectifParFiliere(liste) {
  return liste.reduce(
    (resultat, { filiere }) => ({
      ...resultat,
      [filiere]: (resultat[filiere] ?? 0) + 1,
    }),
    {}
  );
}

export function moyenneParFiliere(liste) {
  const groupes = liste.reduce(
    (resultat, { filiere, note }) => ({
      ...resultat,
      [filiere]: {
        somme: (resultat[filiere]?.somme ?? 0) + note,
        nombre: (resultat[filiere]?.nombre ?? 0) + 1,
      },
    }),
    {}
  );

  return Object.fromEntries(
    Object.entries(groupes).map(([filiere, { somme, nombre }]) => [
      filiere,
      Number((somme / nombre).toFixed(2)),
    ])
  );
}

export function classementParNote(liste) {
  return [...liste].sort((a, b) => b.note - a.note);
}

export function majNote(liste, id, note) {
  return liste.map((etudiant) =>
    etudiant.id === id ? { ...etudiant, note } : etudiant
  );
}