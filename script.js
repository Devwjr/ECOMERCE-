let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function formatarPreco(preco) {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`; 
}

function exibirProdutos() {
    const produtosContainer = document.querySelector('.produtos');
    produtosContainer.innerHTML = ''; 

    const produtos = [
    { nome: 'Fones', preco: 99.99, img: '/img/fones.jpg' },
    { nome: 'Gabinete', preco: 390.90, img: '/img/gabinete.jpeg' },
    { nome: 'Notebook', preco: 1200.00, img: '/img/notebook.jpg' },
    { nome: 'Periféricos', preco: 150.00, img: '/img/periféricos.jpg' },
    { nome: 'Placa mãe', preco: 500.00, img: '/img/placamae.jpg' },
    { nome: 'Memória RAM', preco: 90.00, img: '/img/ram.jpg' },
    { nome: 'TV LED', preco: 900.00, img: '/IMG/monitor.jpeg' }, 
    { nome: 'placa de vídeo', preco: 1990.00, img: '/img/placadevideo.jpg' }, 
    { nome: 'Processador', preco: 490.99, img: '/img/intel.jpg' },
    
];

    produtos.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.className = 'produto';
        divProduto.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}">
            <h2>${produto.nome}</h2>
            <p>${formatarPreco(produto.preco)}</p>
            <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
        `;
        produtosContainer.appendChild(divProduto);
    });
}

function adicionarAoCarrinho(nome, preco) {
    const produtoExistente = carrinho.find(item => item.nome === nome);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
    function favoritarProduto(nome) {
    if (!favoritos.includes(nome)) {
        favoritos.push(nome);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert(`${nome} foi adicionado aos favoritos!`);
    }
}


function verCarrinho() {
    window.location.href = 'carrinho.html'; 
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.produtos')) {
        exibirProdutos(); 
    } else {
        carregarCarrinho(); 
    }
});

function carregarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');

    listaCarrinho.innerHTML = '';
    totalCarrinho.textContent = '';

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li>Carrinho vazio.</li>'; 
    }

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nome} - ${formatarPreco(item.preco)} (x${item.quantidade}) 
            <button onclick="removerDoCarrinho(${index})">Remover</button>`;
        listaCarrinho.appendChild(li);
    });
      
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    totalCarrinho.textContent = `Total: ${formatarPreco(total)}`;
}


function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho(); 
}



function voltarPaginaInicial() {
    window.location.href = '/index.html'; 
}
