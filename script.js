const array = []
const width = 2
const height = 3

function start(){
    createArray()
    console.log(array)
}

//cria o meu array
function createArray(){
    const numberOfPixel = width * height

    for(let cont = 0; cont < numberOfPixel; cont++){
        array[cont] = 0
    }
}

function renderArray(){

}

start()