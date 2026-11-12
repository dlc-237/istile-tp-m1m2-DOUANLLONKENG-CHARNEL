export function moyenneGenerale(listeNotes) {
    const somme = listeNotes.reduce((acc, note) => acc + note, 0);
    return Number(somme / listeNotes.length).toFixed(2);
}

export function admis(liste){
    return liste.filter((etudiant) => etudiant.moyenne >= 10);
}

export function nomsFormates(liste){
    return liste.map((etudiant) => {
        const nomFormate = etudiant.nom.charAt(0).toUpperCase() + etudiant.nom.slice(1).toLowerCase();
        const prenomFormate = etudiant.prenom.charAt(0).toUpperCase() + etudiant.prenom.slice(1).toLowerCase();
        return `${nomFormate} ${prenomFormate}`;
    });
}
export function effectifParFiliere(liste){
    return liste.reduce((acc, etudiant) => {
        if (acc[etudiant.filiere]) {
            acc[etudiant.filiere]++;
        } else {
            acc[etudiant.filiere] = 1;
        }
        return acc;
    }, {});
}

export function moyenneParFiliere(liste){
    const filieres = {};
    liste.forEach((etudiant) => {
        if (!filieres[etudiant.filiere]) {
            filieres[etudiant.filiere] = { somme: 0, count: 0 };
        }
        filieres[etudiant.filiere].somme += etudiant.moyenne;
        filieres[etudiant.filiere].count++;
    });
    for (const filiere in filieres) {
        filieres[filiere] = Number(filieres[filiere].somme / filieres[filiere].count).toFixed(2);
    }
    return filieres;
}

export function classementParNote(liste){
    return liste.sort((a, b) => b.moyenne - a.moyenne);
}

export function majNote(liste, id, note) {
  return liste.map((etudiant) =>
    etudiant.id === id ? { ...etudiant, note } : etudiant
  );
}