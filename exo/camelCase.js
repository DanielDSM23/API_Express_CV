function camelCase(str) {
    let result = ''; // Résultat final
    let capitalizeNext = true; // Indicateur pour savoir si on doit capitaliser le prochain caractère

    for (let i = 0; i < str.length; i++) {
        let currentChar = str[i];

        // Si on doit capitaliser et c'est une lettre minuscule
        if (capitalizeNext && currentChar >= 'a' && currentChar <= 'z') {
            result += currentChar.toUpperCase(); // Convertir en majuscule
        }
        // Si c'est une lettre majuscule ou autre
        else if (!capitalizeNext && currentChar !== ' ') {
            result += currentChar; // Ajouter tel quel si ce n'est pas un espace
        }

        // Si on rencontre un espace, on capitalise le prochain caractère
        capitalizeNext = currentChar === ' ';
    }

    return result;
}

let sentence = 'hello world';
let camelCaseSentence = camelCase(sentence);
console.log(camelCaseSentence); // Affichera "HelloWorld"
