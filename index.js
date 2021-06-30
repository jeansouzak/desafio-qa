const form = document.querySelector('.needs-validation')

const send = () => {
    const observation = document.querySelector('#observation').value

    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return
    }

    if(!observation && hasChecked()) {
        Swal.fire(
            'Formulario invalido!',
            'Favor inserir observacao ou selecionar algum campo!',
            'error'
        )
        return
    }

    const points = getValues()

    
    $('.form').hide();
    $('#content').show();
    configureContent(points, observation)
}

const checkObservations = (text) => {
    return 
}

const hasChecked = () => {
    const allCheckbox = document.querySelectorAll('input[type="checkbox"]');

    const checked = Array.from(allCheckbox).every(checkbox => checkbox.checked === false)
    return checked
}

const getValues = () => {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    const checked = Array.from(checkbox).filter(checkboxElement => checkboxElement.checked === true)
    let sum = 0
    checked.forEach(data => sum += Number(data.value))
    return sum
}

const getProtocol = () => {
    const date = new Date();
    const rand = Math.floor(Math.random() * 1000 + 500)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const seconds = date.getSeconds()

    return `${month}${year}${hour}${minute}${rand}${day}${seconds}`
}

const getIfApproved = (points, observation) => {
    const name = document.querySelector('#name').value
    const protocol = getProtocol();
    console.log(points)
    if(points < 75) {
        return {
            title: 'Reprovado',
            protocol: protocol,
            status: `${name} foi Reprovado.`,
            text: 'E-mail com observações enviado',
            classes: 'bg-danger'
        }
    } else if(points > 75 && observation) {
        return {
            title: 'Aprovado com observações',
            protocol: protocol,
            status: `${name} foi aprovado.`,
            text: 'E-mail com credencial e observações enviado',
            classes: 'bg-warning'
        }
    } else if (points > 75 && !observation) {
        return {
            title: 'Aprovado',
            protocol: protocol,
            status: `${name} foi aprovado.`,
            text: 'E-mail com credencial enviado',
            classes: 'bg-success'
        }
    }
}

const configureContent = (points, observation) => {
    const approved = getIfApproved(points, observation);
    document.querySelector('#content').classList.add(approved.classes)
    document.querySelector('#container').classList.add(approved.classes)

    $('#title').text(approved.title)
    $('#protocol').text(approved.protocol)
    $('#status').text(approved.status)
    $('#text').text(approved.text)
}