function ucfirst(str) {
    if (str.length === 0) return str; // Vérifie si la chaîne est vide
    return str[0].toUpperCase() + str.slice(1);
}

console.log(ucfirst('hello world'));
