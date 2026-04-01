// On donne l'adresse de la base de données
const myUrl = "https://makerslab.em-lyon.com/dww/data/shows.json";

// Le code de base pour télécharger les données
const getData = async(doStuffs) => {
    try {
        const response = await fetch(myUrl);
        if(!response.ok){
            throw new Error("Network response not ok :" + response.statusText);
        }
        const data = await response.json();
        doStuffs(data);
    } catch(error) {
        console.error("Problem occured while getting your data" + error);
    }
}


getData((data) => {
    
    // On cible nos boîtes vides et nos flèches
    const boiteAffiches = document.getElementById("conteneur-affiches");
    const boitePopups = document.getElementById("conteneur-popups");
    const btnPrec = document.getElementById("btn-prec");
    const btnSuiv = document.getElementById("btn-suiv");

    // On récupère toutes les comédies musicales
    const toutesLesPieces = data.musicals;
    
    // On crée une variable qui retient à quelle pièce on en est
    let indexDepart = 0; 


    /* 
    Mon prompt à l'IA :

    "Comme je vais afficher seulement une partie des données à l'écran (3 pièces),
    mais que je veux quand même pouvoir ouvrir un popup pour chacune, 

    est-ce que c’est mieux de générer tous les popups d’un coup au chargement de la page,
    même s’ils sont cachés, ou de les créer dynamiquement au moment du clic ?

    Je cherche une solution simple à implémenter sans trop complexifier mon code."
    */

  
    // Fabrication des pop-ups 
    
    toutesLesPieces.forEach((piece, index) => {
        boitePopups.innerHTML += `
            <div id="popup-${index}" class="fond-popup">
                <div class="carte-popup">
                    <a href="#" class="bouton-fermer">✖</a>
                    
                    <header class="en-tete-carte">
                        <h1>${piece.title}</h1>
                        <div class="tags">
                            <span class="badge-categorie">Catégorie : Musical</span>
                            <span class="etoile">⭐</span>
                        </div>
                    </header>

                    <section class="contenu-carte">
                        <img src="${piece.image}" alt="Affiche ${piece.title}">
                        <div class="infos-texte">
                            <p>${piece.description}</p>
                            <br>
                            <p>${piece.location} - From ${piece.startDate} to ${piece.endDate}</p>
                            <br>
                            <p class="prix"><u>$${piece.price}</u></p>
                            <a href="#" class="bouton-reserver">Réserver</a>
                        </div>
                    </section>
                </div>
            </div>
        `;
    });



    // Fonction pour afficher 3 affiches seulement 
  
    const afficherAffiches = () => {
        // On vide la boîte d'affiches avant de la re-remplir
        boiteAffiches.innerHTML = "";

        // On découpe la liste pour ne prendre que 3 pièces à partir de l'indexDepart
        const piecesAAfficher = toutesLesPieces.slice(indexDepart, indexDepart + 3);

        piecesAAfficher.forEach((piece, indexRelatif) => {

            

            // On recalcul le vrai index pour pointer vers le bon popup
            const vraiIndex = indexDepart + indexRelatif;

            boiteAffiches.innerHTML += `
                <article class="piece">
                    <a href="#popup-${vraiIndex}" class="lien-piece">
                        <h2>${piece.title}</h2>
                        <img src="${piece.image}" alt="Affiche de ${piece.title}">
                    </a>
                </article>
            `;
        });
    };

    // On lance la fonction une première fois
    afficherAffiches();


    /* 
    Mon prompt à l'IA :

    "Je veux ajouter des boutons 'suivant' et 'précédent' pour naviguer dans ma liste,
    mais je veux éviter les bugs (par exemple aller trop loin ou avoir un index négatif).

    Quelle condition simple je peux mettre pour bloquer la navigation
    quand on est au début ou à la fin de la liste ?"
    */


    // Gestion des clics sur les flèches

    
    // Clic sur la flèche SUIVANT (>)
    btnSuiv.addEventListener("click", () => {
        if (indexDepart + 3 < toutesLesPieces.length) {
            indexDepart += 3;
            afficherAffiches();
        }
    });

    // Clic sur la flèche PRÉCÉDENT (<)
    btnPrec.addEventListener("click", () => {
        if (indexDepart - 3 >= 0) {
            indexDepart -= 3;
            afficherAffiches();
        }
    });
});
