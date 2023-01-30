const cols = document.querySelectorAll('.Col');

document.addEventListener('keydown', (event) =>{
    event.preventDefault()
    if (event.code === 'Space'){
        SetRandomColors()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type === "Lock") {
        const node =
        event.target.tagName.toLowerCase() === 'i'
         ? event.target
         :event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClick(event.target.textContent)
    }
})

function GenRandColor () {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for ( let i = 0; i < 6; i++ ) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    console.log('#' + color)
    return '#' + color
}

function copyToClick(text) {
    return navigator.clipboard.writeText(text)
}

function SetRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((Col) => {
        const ifLocked = Col.querySelector('i').classList.contains('fa-lock')
        const text = Col.querySelector('h2')
        const button = Col.querySelector('button')
        const color = chroma.random()

        if (ifLocked) {
            colors.push(text.textContent)
            return
        }



        colors.push(color)

        text.textContent = color
        Col.style.background = color

        SetTextColor(text, color)
        SetTextColor(button, color)
    });

    upColHash(colors)
}

function upColHash(colors= []) {
    document.location.hash = colors
        .map((Col) => {
        return Col.toString().substring(1)
    })
        .join('-')
}

function SetTextColor(text, color) {
    const  luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function getColorsFromHash () {
    if (document.location.hash.length > 1) {
        document.location.hash.substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return []
}



SetRandomColors(true)