(function(){
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

insereProdutosNaPrateleira(new Produto(
    "0003",
    "Joystick PS5 Wireless",
    399.99,
    ["./design/imgs-produtos/200x136/pexels-cottonbro-3945659.jpg","./design/imgs-produtos/100x68/pexels-cottonbro-3945659.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0004",
    "iPhone Beta 5",
    2899.99,
    ["./design/imgs-produtos/200x136/pexels-jess-bailey-designs-788946.jpg","./design/imgs-produtos/100x68/pexels-jess-bailey-designs-788946.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0005",
    "iPad Generic X",
    3199.99,
    ["./design/imgs-produtos/200x136/pexels-josh-sorenson-1334598.jpg","./design/imgs-produtos/100x68/pexels-josh-sorenson-1334598.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0006",
    "Notebook Low Hardware 3",
    539.99,
    ["./design/imgs-produtos/200x136/pexels-karsten-madsen-18105.jpg","./design/imgs-produtos/100x68/pexels-karsten-madsen-18105.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0007",
    "Groove Master LP11",
    1999.99,
    ["./design/imgs-produtos/200x136/pexels-lilartsy-4717873.jpg","./design/imgs-produtos/100x68/pexels-lilartsy-4717873.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0008",
    "Keyboard SoftHand Pro",
    99.99,
    ["./design/imgs-produtos/200x136/pexels-olenka-sergienko-1772123.jpg","./design/imgs-produtos/100x68/pexels-olenka-sergienko-1772123.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0009",
    "Lazy Boy Headphone 4C",
    299.99,
    ["./design/imgs-produtos/200x136/pexels-sound-on-3394650.jpg","./design/imgs-produtos/100x68/pexels-sound-on-3394650.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0010",
    "TecSound Player 2020",
    129.99,
    ["./design/imgs-produtos/200x136/pexels-sound-on-3394666.jpg","./design/imgs-produtos/100x68/pexels-sound-on-3394666.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0011",
    "Old School Recorder 1980",
    9.99,
    ["./design/imgs-produtos/200x136/pexels-stas-knop-1228497.jpg","./design/imgs-produtos/100x68/pexels-stas-knop-1228497.jpg"]
));

insereProdutosNaPrateleira(new Produto(
    "0012",
    "Notebook BadTools 2005",
    739.99,
    ["./design/imgs-produtos/200x136/pexels-tuur-tisseghem-812264.jpg","./design/imgs-produtos/100x68/pexels-tuur-tisseghem-812264.jpg"]
));

//Inserção dos protudos na DOM
const areaProdutos = take('#area-produtos');

function geraProduto(produto) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('produto');
    card.style = 'width: 18rem;';
    card.title = produto.getNome;

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
    botaoCompra.title = `Comprar ${produto.getNome}`
    botaoCompra.href = '#';
    botaoCompra.innerHTML = 'Comprar';

    const botaoCarrinho = document.createElement('a');
    botaoCarrinho.id = `btn-ref-prod-${produto.getId}`;
    botaoCarrinho.classList.add('btn');
    botaoCarrinho.classList.add('btn-primary');
    botaoCarrinho.classList.add('mx-1');

    iconCarrinho = '<img src="./design/local_grocery_store_white_24dp.svg" alt="Carrinho">';

    botaoCarrinho.innerHTML = iconCarrinho;
    botaoCarrinho.title = `Adicionar ${produto.getNome} ao Carrinho`

    botaoCarrinho.onclick = function() {
        addProdutoNoCarrinho(produto);
        this.setAttribute("aria-disabled","true");
        this.classList.add('disabled');
        mostraProdsNoCarrinho.innerText = `${carrinhoDeProdutos.length}`;

        if(carrinhoDeProdutos.length && !caixaDeItensDoCarrinho.classList.contains('position-right')) iconeCarrinho.classList.add('position-right');

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
let carrinhoDeProdutos = [];
const iconeCarrinho = take('#icone-carrinho');
iconeCarrinho.onclick = function() {
    this.classList.remove('position-right');
    caixaDeItensDoCarrinho.classList.add('position-right');
}

const caixaDeItensDoCarrinho = take('#caixa-itens-carrinho');
const botaoFechaItensDoCarrinho = take('#botao-fechar-carrinho');
botaoFechaItensDoCarrinho.onclick = () => {
    caixaDeItensDoCarrinho.classList.remove('position-right');
    if(carrinhoDeProdutos.length) iconeCarrinho.classList.add('position-right');
}

const areaDeExibicaoItensCarrinho = take('#area-produtos-do-carrinho');

function insereProdutosNaAreaDeExibicao(prodCar) {
    const card = document.createElement('div');
    card.title = prodCar.getNome
    card.classList.add('card','my-2');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'p-1', 'align-items-center');

    const imagem = document.createElement('img');
    imagem.classList.add('imagem-miniatura-carrinho');
    imagem.src = prodCar.getImgPequena;
    imagem.alt = "Imagem do produto";

    const nomeProd = document.createElement('div');
    nomeProd.classList.add('mx-1');
    nomeProd.innerText = prodCar.getNome;

    const botaoFechar = document.createElement('button');
    botaoFechar.classList.add('btn', 'btn-danger', 'botao-remover-do-carrinho');
    botaoFechar.innerText = 'x';
    botaoFechar.title = 'Remover'
    botaoFechar.onclick = function(){
        this.parentNode.remove();
        carrinhoDeProdutos = carrinhoDeProdutos.filter(indice => {
                    return indice.getId !== prodCar.getId
                });
        mostraProdsNoCarrinho.innerText = `${carrinhoDeProdutos.length}`;

        //Abaixo, seguem os métodos para reativar o botão de add ao carrinho no card
        botaoCarrinho = take(`#btn-ref-prod-${prodCar.getId}`);
        botaoCarrinho.classList.remove('disabled');
        botaoCarrinho.removeAttribute("aria-disabled");
    }

    cardBody.appendChild(imagem);
    cardBody.appendChild(nomeProd);

    card.appendChild(cardBody);
    card.appendChild(botaoFechar);

    return card;
}

const mostraProdsNoCarrinho = take('#num-prods-no-carrinho');

function addProdutoNoCarrinho(prodNoCarrinho) {
    carrinhoDeProdutos.push(prodNoCarrinho);
    areaDeExibicaoItensCarrinho.appendChild( insereProdutosNaAreaDeExibicao(carrinhoDeProdutos[carrinhoDeProdutos.length-1]) );
}})();

console.log(`
    .:Olá!:.

* Tecnologias Usadas:
    - HTML, CSS, Javascript e Bootstrap.

* Objetivo da página:
    - Simular um e-commerce responsivo.

*Funcionalidades objetivas e técnicas:
    - Simular um e-commerce com a possibilidade de escolher um produto e inseri-lo no carrinho de compras;
    - O Carrinho só aparece quando há no mínimo 1 produto inserido e desaparece quando todos os produtos são removidos;
    - É permitido clicar no ícone do carrinho para ver quais foram os produtos nele inseridos e remover os produtos que desejar;
    - Para além do ícone do carrinho e do botão de "Adicionar ao carrinho" presente em cada item, os botões/dropdowns de "Filtro" e "Serviços" também possuem interações (são exibidos apenas no modo responsívo para dispositivos móveis);
    - A inserção dos produtos no Carrinho ocorre por meio da leitura de um array que é preenchido conforme o usuário escolhe o(s) produto(s);
    - Assim que o array do Carrinho recebe o produto, o quadro de exibição dos produtos no carrinho faz a leitura e os exibe para o usuário;
    - Os produtos que já são exibidos na DOM quando a página é renderizada também são inseridos via Javascript e estão armazanados também em um array (distindo do array do carrinho, obviamente);
    - Essas duas formas anteriores de uso de array são feitas para facilitar um possível envio dos dados ao back-end e não depender exclusivamente de dados presentes em elementos na DOM.
`)