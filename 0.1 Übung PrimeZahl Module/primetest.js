exports.isPrime = (number) => {
    for(let i = 2; i < 10; i++)
        if(number/i % 2 == 0) 
            return false
    return true
}