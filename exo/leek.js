function leet(str) {
    let result = ''; // Résultat final

    for (let i = 0; i < str.length; i++) {
        let currentChar = str[i].toLowerCase(); // On met tout en minuscule pour gérer les majuscules aussi
        switch (currentChar) {
            case 'a':
                result += '4';
                break;
            case 'e':
                result += '3';
                break;
            case 'i':
                result += '1';
                break;
            case 'o':
                result += '0';
                break;
            case 'u':
                result += '_';
                break;
            case 'y':
                result += '7';
                break;
            default:
                result += str[i]; // On garde le caractère tel quel si ce n'est pas une voyelle
        }
    }

    return result;
}

let sentence = 'anaconda';
let leetSentence = leet(sentence);
console.log(leetSentence); // Affichera "4n4c0nd4"
