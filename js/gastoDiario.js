const form = document.querySelector('.form');
const data = document.querySelector('.data');
const date = new Date();
date.setDate(date.getDate())
const dataFormatada = date.toLocaleDateString();
data.innerHTML = dataFormatada

let itens = JSON.parse(localStorage.getItem('itens')) ||  [];

itens.forEach((item) => {
    criaLinha(item)
})

class Item {
    constructor(nome, valor, categoria, data) {
        this.nome = nome;
        this.valor = this.formatarValor(valor);
        this.categoria = categoria;
        this.data = data;
    }

    formatarValor(valor) {
        valor = valor.replace("R$", "").replace(",", ".");

        if (valor.length >= 8) {
            if (valor.length >= 13) {
                valor = valor.replace(".", "");
            }
            valor = valor.replace(".", "");
        };
        
        return parseFloat(valor);
    }
}

function setValorInput(input) {
    num = slice(input.value);
    let valor = parseFloat(num).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    input.value = valor;
}

function slice(text) {
    let num = text.replace(",", "");
    num = num.replace(".", "");
    num = num.replace("R$", "");
    num = num.padStart(2, '0');

    let a = num.slice(0, -2);
    let b = num.slice(-2);

    num = a + "." + b;
    return num;
}

function criaIcone(categoria) {
    const icons = ['bi bi-house', 'bi bi-basket-fill', 'bi bi-heart-fill', 'bi bi-bus-front-fill', 'bi bi-pencil-square', 'bi bi-controller'];
    const categorias = ['Casa', 'Alimentação', 'Saúde e Beleza', 'Transporte', 'Educação', 'Lazer e Extras']
    let icone;

    if (categoria == categorias[0]) {
        icone = document.createElement('i')
        let listIcon = icons[0].split(' ');
        icone.style.color = '#5e2129';
        icone.classList.add(listIcon[0], listIcon[1], 'icon-item');
    } else if (categoria == categorias[1]) {
        icone = document.createElement('i')
        let listIcon = icons[1].split(' ');
        icone.style.color = '#5DB7DE';
        icone.classList.add(listIcon[0], listIcon[1], 'icon-item');
    } else if (categoria == categorias[2]) {
        icone = document.createElement('i')
        let listIcon = icons[2].split(' ');
        icone.style.color = '#ff4c4c';
        icone.classList.add(listIcon[0], listIcon[1], 'icon-item');
    } else if (categoria == categorias[3]) {
        icone = document.createElement('i')
        let listIcon = icons[3].split(' ');
        icone.style.color = '#FF8811';
        icone.classList.add(listIcon[0], listIcon[1], 'icon-item');
    } else if (categoria == categorias[4]) {
        icone = document.createElement('i')
        let listIcon = icons[4].split(' ');
        icone.style.color = '#A66555';
        icone.classList.add(listIcon[0], listIcon[1], 'icon-item');
    } else {
        icone = document.createElement('i')
        let listIcon = icons[5].split(' ');
        icone.style.color = '#C2E812';
        icone.classList.add(listIcon[0], listIcon[1], 'icon-item');
    }

    return icone;
}

function criaLinha(item) {
    const tabela = document.querySelector('.table-container');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');

    td1.innerText = item.nome;
    td2.innerText = parseFloat(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    td3.innerText = item.categoria;
    td4.appendChild(criaIcone(item.categoria))

    td4.classList.add('icon')
    td2.classList.add('valor');
    td3.classList.add('categoria');
    td3.classList.add('icon-item');

    tabela.appendChild(tbody);
    tbody.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);    
}

form.addEventListener('submit', (e) => {
    const descricao = document.querySelector('#descricao');
    const valor = document.querySelector("#valor");
    const categoria = document.querySelector("#lista-categoria")

    if (descricao.value == '' || valor.value == '' || categoria.value == '') {
        alert('Preencha todos os Campos');
        e.preventDefault();
        return;
    }

    const item = new Item(descricao.value, valor.value, categoria.value, data.textContent);
    criaLinha(item);

    itens.push(item)

    localStorage.setItem('itens', JSON.stringify(itens));

    descricao.value = '';
    valor.value = 'R$ 0,00';
    categoria.value = '';

    e.preventDefault();
})