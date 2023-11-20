const array = []
const width = 2
const height = 3

function start(){
    createArray()
    renderArray()
}

//cria o meu array
function createArray(){
    const numberOfPixel = width * height

    for(let cont = 0; cont < numberOfPixel; cont++){
        array[cont] = 0
    }
}

//desenha o meu array
function renderArray(){
    let html = '<table cellpadding = 0 cellspacing = 0>'

    for(let row = 0; row < height; row++){
        html += '<tr>'

        for(let column = 0; column < width; column++){
            //converte um vetor de linha e coluna, e transforma em um vetor unidirecional
            const pixelIndex = column + (width * row)
             
            html += '<td>'
            html += pixelIndex
            html += '</td>'
        }

        html += '</tr>'
    }

    html += '</table>'


    document.querySelector('#field').innerHTML = html
}

start()