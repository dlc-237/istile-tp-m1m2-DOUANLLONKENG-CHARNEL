export async function chargerUtilisateurs(limite = 5, base = "https://dummyjson.com") {
  try {
    const response = await fetch(`${base}/users?limit=${limite}`);

    if (!response.ok) {
      console.error(`Erreur HTTP : ${response.status}`);
      return [];
    }

    const { users } = await response.json();
    return users.map(({ id, firstName, lastName, email }) => ({
      id,
      prenom: firstName,
      nom: lastName,
      email,
    }));
  } catch (erreur) {
    console.error(`Erreur réseau : ${erreur.message}`);
    return [];
  }
}

export async function chargerUtilisateur(id, base = "https://dummyjson.com") {
  try {
    const response = await fetch(`${base}/users/${id}`);

    if (response.status === 404) {
      console.error(`Utilisateur ${id} introuvable (404)`);
      return null;
    }

    if (!response.ok) {
      console.error(`Erreur HTTP : ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (erreur) {
    console.error(`Erreur réseau : ${erreur.message}`);
    return null;
  }
}