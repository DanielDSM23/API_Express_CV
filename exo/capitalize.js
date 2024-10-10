function capitalize(str) {
    let result = ''; // Résultat final
    let capitalizeNext = true; // Indicateur pour savoir si on doit capitaliser le prochain caractère

    for (let i = 0; i < str.length; i++) {
        let currentChar = str[i];

        // Si on doit capitaliser et c'est une lettre minuscule
        if (capitalizeNext && currentChar >= 'a' && currentChar <= 'z') {
            // Convertir manuellement en majuscule en utilisant l'écart ASCII (ajouter ou remplacer directement les lettres)
            result += currentChar.toUpperCase();
        } else {
            result += currentChar;
        }

        // Si on rencontre un espace, on capitalise le prochain caractère
        capitalizeNext = currentChar === ' ';
    }

    return result;
}

let sentence = 'hello world';
let capitalizeSentence = capitalize(sentence);
console.log(capitalizeSentence); // Affichera "Hello World"
