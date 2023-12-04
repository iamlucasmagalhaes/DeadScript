const array = []
const width = 4
const height = 5
let currentPosition = 0 //armazena a posição atual do jogador

function start(){
    createArray()
    renderArray()
    setupEventListener()
}

//gera um número aleatório entre os valores passados por parámetros
function randomNumber(max, min){
    return Math.random() * (max - min) + min
}

//cria o meu array
function createArray(){
    const numberOfPixel = width * height

    for(let cont = 0; cont < numberOfPixel; cont++){
        array[cont] = Math.floor(randomNumber(10, 1))
    }
}

//desenha o meu array
function renderArray(){
    let html = '<table cellpadding = 0 cellspacing = 0>'

    for(let row = 0; row < height; row++){
        html += '<tr>'

        for(let column = 0; column < width; column++){
            //converte um vetor de linha e coluna, e transforma em um vetor unidirecional
            const zombies = column + (width * row)
            const pixelIndex = column + width * row;

            //recebe o meu indice e compara se ele é identico a minha posição atual
            const isFirstElement = zombies === currentPosition

            //compara se a minha posição é a 0, caso seja verdadeiro ela chama a classe "first-element"
            const cellClass = isFirstElement ? 'first-element' : ''
             
            html += `<td class = "${cellClass}">`
            html += `<div class = "pixel-index">${pixelIndex}</div>`
            html += array[zombies]
            html += '</td>'
        }

        html += '</tr>'
    }

    html += '</table>'


    document.querySelector('#field').innerHTML = html
}

//ouvinte que é chamado sempre que a tecla é pressionada
function setupEventListener() {
    document.addEventListener('keydown', handleKeyPress)
}

function handleKeyPress(event) {
    switch (event.key){
        
        case 'ArrowUp':
            moveSquare (-width) //move para cima subtraindo o valor da largura
            break

        case 'ArrowDown':
            moveSquare (width) //move para baixo somando o valor com a largura
            break

        case 'ArrowLeft':
            moveSquare (-1) //move para a esquerda subrtraindo 1
            break

        case 'ArrowRight':
            moveSquare (1) //move para a direira adicionando 1
            break
    }

    renderArray() //atualiza o vetor após a realização do movimento
}

//faz a movimentação do quadrado
function moveSquare(offset) {
    const newPosition = currentPosition + offset;

    //verifica se a nova posição do quadrado está dentro dos limites do array
    if (newPosition >= 0 && newPosition < array.length) {
        array[currentPosition] = 0 // Limpa a posição anterior
        currentPosition = newPosition
        array[currentPosition] = 'X' // Coloca o quadrado vermelho na nova posição
    }
}

start()