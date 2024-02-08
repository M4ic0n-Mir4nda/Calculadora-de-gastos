const salario = document.querySelector('.input-value-salario');
const mensagem = document.querySelector('.container-mensagem');;

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

function formatarValorTotal(valores) {
    let totalCategoria = 0;

    valores.forEach(function(valores) {    
        num = slice(valores.value)
        totalCategoria += parseFloat(num) || 0;
    });

    return parseFloat(totalCategoria).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function ValorTotalCategoria(input) {
    const divs = document.querySelectorAll('.container-item');
    let paragrafo = input.parentNode;
    let label = paragrafo.parentNode;
    let elementoPai = label.parentNode;
    let valorTotal = 0;
    
    for (el of divs) {
        if (el == elementoPai) {
            let inputs = elementoPai.querySelectorAll('.labels > p > .input-value');
            valorTotal = formatarValorTotal(inputs);
        }
    }

    let totalCategoria = elementoPai.querySelector('.valor-total-categoria');
    totalCategoria.innerHTML = valorTotal;

    if (elementoPai == divs[0]) document.querySelector('.lbl-casa').innerHTML = valorTotal;
    if (elementoPai == divs[1]) document.querySelector('.lbl-alimentacao').innerHTML = valorTotal;
    if (elementoPai == divs[2]) document.querySelector('.lbl-saude-beleza').innerHTML = valorTotal;
    if (elementoPai == divs[3]) document.querySelector('.lbl-transporte').innerHTML = valorTotal;
    if (elementoPai == divs[4]) document.querySelector('.lbl-educacao').innerHTML = valorTotal;
    if (elementoPai == divs[5]) document.querySelector('.lbl-lazer-extras').innerHTML = valorTotal;
}

function calcularGastos() {
    let salarioAtual = 0;
    let casa = document.querySelector('.lbl-casa');
    let alimentacao = document.querySelector('.lbl-alimentacao');
    let saudeBeleza = document.querySelector('.lbl-saude-beleza');
    let transporte = document.querySelector('.lbl-transporte');
    let educacao = document.querySelector('.lbl-educacao');
    let lazerExtras = document.querySelector('.lbl-lazer-extras');

    salarioAtual = slice(salario.value) - slice(casa.textContent);
    salarioAtual = salarioAtual - slice(alimentacao.textContent);
    salarioAtual = salarioAtual - slice(saudeBeleza.textContent);
    salarioAtual = salarioAtual - slice(transporte.textContent);
    salarioAtual = salarioAtual - slice(educacao.textContent);
    salarioAtual = salarioAtual - slice(lazerExtras.textContent);
    
    const total = document.querySelector('.valor');
    const msgSaldo = document.querySelector('.mensagem');

    if (salarioAtual > 0) {
        setTimeout(() => {
            mensagem.classList.remove('negativo') || mensagem.classList.remove('alerta');
            total.innerText = parseFloat(salarioAtual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            msgSaldo.innerText = 'Parabéns, você conseguiu ficar no positivo! hora de pensar em investir esse dinheiro!';
            mensagem.classList.add('positivo');
        }, 2000)
    } else if (salarioAtual == 0) {
        setTimeout(() => {
            mensagem.classList.remove('negativo') || mensagem.classList.remove('positivo');
            total.innerText = parseFloat(salarioAtual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            msgSaldo.innerText = 'Alerta! Você está com o saldo zerado';
            mensagem.classList.add('alerta');
        }, 2000)
    } else {
        setTimeout(() => {
            mensagem.classList.remove('positivo') || mensagem.classList.remove('alerta');
            total.innerText = parseFloat(salarioAtual).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            msgSaldo.innerText = 'Saldo negativo! Reveja seu orçamento e tente aumentar receitas ou diminuir despesas';
            mensagem.classList.add('negativo');
        }, 2000)
    }
}

document.addEventListener('keyup', event => {
    const el = event.target;
    if (el.classList.contains('input-value')) {
        ValorTotalCategoria(el);
        calcularGastos();
    }
})

try {
    salario.addEventListener('keyup', () => {
        calcularGastos();
    })
} catch (err) {
    console.log('Erro esperado:', err)
}
