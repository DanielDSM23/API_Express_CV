function verlan(str) {
    let words = str.split(' '); // Séparer les mots de la phrase
    let result = words.map((word) => {
        // Inverser chaque mot
        let reversedWord = '';
        for (let i = word.length - 1; i >= 0; i--) {
            reversedWord += word[i];
        }
        return reversedWord;
    });

    // Rejoindre les mots inversés avec des espaces
    return result.join(' ');
}

let sentence = 'Hello world';
let verlanSentence = verlan(sentence);
console.log(verlanSentence); // Affichera "olleH dlrow"
