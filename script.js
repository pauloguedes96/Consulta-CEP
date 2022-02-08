document.addEventListener('DOMContentLoaded', () => {
    let inputCEP = document.querySelector('#inputCEP');
    let btnSearch = document.querySelector('#btnSearch');
    inputCEP.focus();

    btnSearch.addEventListener('click', consultaCEP);
    inputCEP.addEventListener('keyup', consultaCEPrealTime);
})

let containResult = document.querySelector('#containResult');
let cepResult = document.querySelector('#cep');
let lograResult = document.querySelector('#logra');
let compResult = document.querySelector('#comp');
let bairroResult = document.querySelector('#bairro');
let localResult = document.querySelector('#local');
let ufResult = document.querySelector('#uf');
let ibgeResult = document.querySelector('#ibge');
let dddResult = document.querySelector('#ddd');

function consultaCEPrealTime() {

    if (inputCEP.value.length == 8) {

        consultaCEP();
        containResult.style.display = 'flex';
    } else {

        limpaCampos();
        containResult.style.display = 'none';
    }
}

function consultaCEP() {

    if (inputCEP.value.length == 8) {

        console.log(inputCEP.value);
        requestAPI();
    }
    else if (inputCEP.value.length == 0) {
        inputCEP.placeholder = 'Campo Obrigatório';
    }
    else if (inputCEP.value.length < 8 ||
        inputCEP.value.length > 8) {

        containResult.style.display = 'flex';
        lancaErro('CEP INVÁLIDO');
    }

}

async function requestAPI() {

    let cep = inputCEP.value;
    let url = `http://viacep.com.br/ws/${cep}/json/`;

    try {
        let dados = await fetch(url); //aguarda dados
        let endereco = await dados.json(); //aguarda o obj json
        console.log(endereco);
        preencheCampos(endereco);

        //verifica se tem propriedade erro
        if (endereco.hasOwnProperty('erro')) {
            throw 'Cep Não Existe';
        }
    }
    catch (error) {

        console.log('Houve um erro: ' + error);
        lancaErro(error);
    }
}

function preencheCampos(endereco) {

    console.log(endereco.cep);
    cepResult.innerText = `CEP: ${endereco.cep}`;
    lograResult.innerText = `Logradouro: ${endereco.logradouro}`;
    compResult.innerText = `Complemento: ${endereco.complemento}`;
    bairroResult.innerText = `Bairro: ${endereco.bairro}`;
    localResult.innerText = `Cidade: ${endereco.localidade}`;
    ufResult.innerText = `UF: ${endereco.uf}`;
    ibgeResult.innerText = `IBGE: ${endereco.ibge}`;
    dddResult.innerText = `DDD: ${endereco.ddd}`;
}

function limpaCampos() {

    cepResult.innerText = 'CEP:';
    lograResult.innerText = 'Logradouro:';
    compResult.innerText = 'Complemento:';
    bairroResult.innerText = 'Bairro:';
    localResult.innerText = 'Cidade:';
    ufResult.innerText = 'UF:';
    ibgeResult.innerText = 'IBGE:';
    dddResult.innerText = 'DDD:';
}

function lancaErro(error) {

    cepResult.innerText = `${error}`;
    lograResult.innerText = '';
    compResult.innerText = '';
    bairroResult.innerText = '';
    localResult.innerText = '';
    ufResult.innerText = '';
    ibgeResult.innerText = '';
    dddResult.innerText = '';
}