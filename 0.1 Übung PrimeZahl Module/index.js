const { isPrime } = require('./primetest')

const { argv } = process

//Remove first two parameters because of node
argv.splice(0, 2)

//Checks for paramters. If there are none return with error
if(argv.length < 1) {
    console.warn('Add some numbers you would like to check. Just type node index.js NUMBER_1 NUMBER_2')
    process.exit(1)
}

//Loop over each number
argv.forEach(number => {
    //parse Number to Int
    const validNumber = parseInt(number)

    //Only continue if the parse process returned a valid number
    if(!isNaN(validNumber))
        //Checks for prime and console logs correct words
        console.log(`${validNumber} ist ${isPrime(validNumber) ? 'eine' : 'keine'} Primezahl!`)
    else 
        console.log(`${number} ist keine Zahl.`)
})