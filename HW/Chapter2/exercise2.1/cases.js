const permutation = (n, r) => {
    let i = n;
    let result = 1;
    for(i; i > n - r; i--){
        result *= i;
    }
    return result;
};

const combination = (n, r) =>{
    return permutation(n, r) / permutation(r, r);
};

const multiPermutation = (n, r) =>{
    let i = 0;
    let result = 1;
    for(i; i < r; i++){
        result *= n;
    }
    return result;
};

const multiCombination = (n, r) =>{
    return combination(n + r - 1, r);
};

module.exports = {
    permutation,
    combination,
    multiPermutation,
    multiCombination,
};