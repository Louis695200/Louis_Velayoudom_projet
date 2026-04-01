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
        console.error("Problem occurend while getting your data" + error);
    }
}



/* 
Mon prompt à l'IA :

"Je récupère un fichier JSON avec plein de données, mais je ne veux pas tout afficher sinon ça surcharge la page.

Je sais qu'il y a plusieurs catégories (dont musicals), et j'aimerais juste prendre les 3 premières entrées de cette catégorie.

Comment je peux faire ça proprement en JavaScript sans modifier directement les données ?"
*/


getData((data) => {
    
    // On cible les deux boîtes vides qu'on a préparées dans le HTML
    const boiteAffiches = document.getElementById("conteneur-affiches");
    const boitePopups = document.getElementById("conteneur-popups");

    // On va prendre seulement les 3 premières comédies musicales de la liste pour ne pas surcharger la page
    const lesPiecesAAfficher = data.musicals.slice(0, 3); 

    // On crée une boucle : "Pour chaque pièce dans la liste réduite..."
    lesPiecesAAfficher.forEach((piece, index) => {





        

        // FABRICATION DE L'AFFICHE 
        // On ajoute (+=) un bloc HTML dans la boîte des affiches
        // On remplace le texte en dur par la donnée dynamique (ex: ${piece.title})
        boiteAffiches.innerHTML += `
            <article class="piece">
                <a href="#popup-${index}" class="lien-piece">
                    <h2>${piece.title}</h2>
                    <img src="${piece.image}" alt="Affiche de ${piece.title}">
                </a>
            </article>
        `;

        // FABRICATION DU POP-UP
        // On ajoute (+=) le grand bloc rose caché dans la boîte des popups
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

});