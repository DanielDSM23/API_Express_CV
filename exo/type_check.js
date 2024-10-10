function type_check_v1(arg1, arg2) {
    // Vérifie le type de arg1 et compare avec arg2
    return typeof arg1 === arg2;
}

// Exemples d'utilisation
console.log(type_check_v1(1, 'number')); // Affichera true
console.log(type_check_v1('hello', 'string')); // Affichera true
console.log(type_check_v1(true, 'boolean')); // Affichera true
console.log(type_check_v1([], 'object')); // Affichera true
