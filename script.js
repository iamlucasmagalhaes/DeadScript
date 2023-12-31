const array = []
const width = 4
const height = 5
let ammunition = 50 //munição
let currentPosition = 0 //armazena a posição atual do jogador
var countAmmunition = window.document.querySelector('.ammunition')

countAmmunition.textContent = "Ammunition: " + ammunition

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
        array[currentPosition] = 0 //restaura o valor da posição atual antes de mover, evita que o valor seja permanentemente definida como 0

        currentPosition = newPosition

        //armazena o valor presente na minha posição do array em uma variavel, que é passado como parâmetro para a função updateAmmunition(currentValue)
        const currentValue = array[currentPosition]
        array[currentPosition] = 0 //atualiza o posição atual do meu vetor com o número 0
        updateAmmunition(currentValue)

        if(currentPosition === array.length - 1 && ammunition >= 0) {
            window.alert("Parabens! Você venceu.")

            setTimeout(function() {location.reload()}, 1000)
        }
    }
}

//faz a subtração da variável ammunition com a variável currentValue
function updateAmmunition(currentValue) {
    ammunition -= currentValue
    
    console.log('Munição antes: ' + (ammunition + currentValue))
    console.log("Subtraindo: " + currentValue)
    console.log("Ammunition left: " + ammunition)

    //recarrega a página em caso de derrota
    if(ammunition < 0){
        window.alert("Você Perdeu.")

        setTimeout(function() {
            location.reload()
        }, 100)
    }

    //atualiza o meu elemento HTML que exibe a munição
    countAmmunition.textContent = "Ammunition: " + ammunition
}

start()