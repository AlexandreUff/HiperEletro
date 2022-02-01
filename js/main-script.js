//Funções básicas do projeto
function take(query) {
    return document.querySelector(query);
}

//Eeito no placeHolder de pesquisa
const frasesPlaceHolder = [
    "O maior site de produtos eletrônicos do Brasil.",
    "Diversos produtos de diversas marcas em um único lugar.",
    "Aproveite nossas promoções e pague o menor preço."
]

function placeHolderEffect(n) {

let numFrase = n;
if (numFrase > 2) numFrase = 0;
inputPesquisa.placeholder = '';
let i = 0;

let contadorInterval =  setInterval(()=>{
                            inputPesquisa.placeholder = inputPesquisa.placeholder + frasesPlaceHolder[numFrase][i];
                            if(i === frasesPlaceHolder[numFrase].length - 1){
                                    clearInterval(contadorInterval);
                                    setTimeout(() => placeHolderEffect(numFrase+1),2000);
                                }
                            i++
                        },80);

}

const inputPesquisa = take('#input-pesquisa');
placeHolderEffect(0);

//Criação dos produtos
class Produto {
    constructor(id,nome,preco,img){
        this.id = id
        this.nome = nome
        this.preco = preco
        this.img = img
    }

    get getId(){
        return this.id
    }

    get getNome(){
        return this.nome
    }

    get getPreco(){
        return this.preco
    }

    get getImgGrande(){
        return this.img[0]
    }

    get getImgPequena(){
        return this.img[1]
    }

}

const prateleiraProdutos = []

function insereProdutosNaPrateleira(produto) {
    prateleiraProdutos.push(produto);
}

insereProdutosNaPrateleira(new Produto(
    "0001",
    "MX-Gold Premium V9.5",
    199.99,
    ["./design/imgs-produtos/200x136/pexels-kinkate-205926.jpg","./design/imgs-produtos/100x68/pexels-kinkate-205926.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0002",
    "Router Turbo TecBuild 77",
    149.99,
    ["./design/imgs-produtos/200x136/pexels-aditya-singh-4218546.jpg","./design/imgs-produtos/100x68/pexels-aditya-singh-4218546.jpg"]
));



//Inserção dos protudos na DOM
const areaProdutos = take('#area-produtos');

function geraProduto(produto) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('produto');
    card.style = 'width: 18rem;';

    const imagem = document.createElement('img');
    imagem.classList.add('card-img-top');
    imagem.src = produto.getImgGrande;
    imagem.alt = `${produto.getNome} por ${produto.getPreco}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const titulo = document.createElement('h5');
    titulo.classList.add('card-title');
    titulo.innerHTML = produto.getNome;

    const preco = document.createElement('p');
    preco.classList.add('card-text');
    preco.innerHTML = `<strong>R$ ${produto.getPreco.toString().replace('.',',')}</strong>`;

    const parcela = document.createElement('p');
    parcela.classList.add('card-text');

    const valorParcelaInteiro = Math.trunc(produto.getPreco / 10);

    /*   CONSTRUÇÃO DA VARIÁVEL: valorParcelaFracio
        - Pega o preço e divide por 10;
        - Converte para string essa divisão;
        - Pega só a parte após o '.' com o split;
        - Dessa parte fracionária, pega apenas os 2
        primeiros caracteres após o ponto com a
        substring.
    */
    const valorParcelaFracio = ((produto.getPreco / 10).toString().split('.')[1].substring(0,2));

    parcela.innerHTML = `em 10x de R$ ${valorParcelaInteiro} <sup>${valorParcelaFracio}</sup>`;

    const botaoCompra = document.createElement('a');
    botaoCompra.classList.add('btn');
    botaoCompra.classList.add('btn-success');
    botaoCompra.href = '#';
    botaoCompra.innerHTML = 'Comprar';

    const botaoCarrinho = document.createElement('a');
    botaoCarrinho.classList.add('btn');
    botaoCarrinho.classList.add('btn-primary');
    botaoCarrinho.classList.add('mx-1');

    iconCarrinho = '<img src="./design/local_grocery_store_white_24dp.svg" alt="Carrinho">';

    botaoCarrinho.href = '#';
    botaoCarrinho.innerHTML = iconCarrinho;

    botaoCarrinho.onclick = function() {
        addProdutoNoCarrinho(produto);
        this.setAttribute("aria-disabled","true");
        this.classList.add('disabled');
        numProdsNoCarrinho++
        mostraProdsNoCarrinho.innerText = `${numProdsNoCarrinho}`;

        if(numProdsNoCarrinho) iconeCarrinho.classList.add('position-right');

    }

    cardBody.appendChild(titulo);
    cardBody.appendChild(preco);
    cardBody.appendChild(parcela);
    cardBody.appendChild(botaoCompra);
    cardBody.appendChild(botaoCarrinho);

    card.appendChild(imagem);
    card.appendChild(cardBody);

    return card;
}


function insereProdutos() {
    for (novoProduto of prateleiraProdutos){
        const prod = geraProduto(novoProduto);
        areaProdutos.appendChild(prod);
    }
}
insereProdutos();


//Inserção de produtos no carrinho
const carrinhoDeProdutos = [];
const iconeCarrinho = take('#icone-carrinho');
iconeCarrinho.onclick = function() {
    this.classList.remove('position-right');
}

let numProdsNoCarrinho = 0;

const mostraProdsNoCarrinho = take('#num-prods-no-carrinho');

function addProdutoNoCarrinho(prodNoCarrinho) {
    carrinhoDeProdutos.push(prodNoCarrinho);
}