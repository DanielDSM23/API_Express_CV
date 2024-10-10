function SnakeCase(str) {
    let result = ''; // Résultat final

    for (let i = 0; i < str.length; i++) {
        let currentChar = str[i];

        // Si on rencontre un espace, ajouter un underscore
        if (currentChar === ' ') {
            result += '_';
        }
        // Sinon, ajouter la lettre en minuscule
        else {
            result += currentChar.toLowerCase();
        }
    }

    return result;
}

let sentence = 'Hello World';
let snakeCaseSentence = SnakeCase(sentence);
console.log(snakeCaseSentence); // Affichera "hello_world"
