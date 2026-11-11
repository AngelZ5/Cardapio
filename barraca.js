const reais = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

const CARDAPIO = [
{ id: 1, nome: "Água de coco", preco: 700, disponivel: true },
{ id: 2, nome: "Queijo coalho", preco: 800, disponivel: true },
{ id: 3, nome: "Suco de cajá", preco: 900, disponivel: true },
{ id: 4, nome: "Picolé", preco: 500, disponivel: false },
{ id: 5, nome: "Cadeira", preco: 1500, disponivel: true },
{ id: 6, nome: "Guarda-sol", preco: 2000, disponivel: true },
];



// a comanda da mesa 3: o id do item e a quantidade
const comanda = [
{ id: 1, qtd: 2 },
{ id: 2, qtd: 3 },
{ id: 5, qtd: 2 },
{ id: 6, qtd: 1 },
];

const  TAXA_SERVICO = 10;
const  DESCONTO_ACIMA_DE = 8000;
const  VALOR_DESCONTO = 500;

function buscarItem(id){
return CARDAPIO.find(item => item.id === id);
}

function filtrarAtivos(){
       const CARDAPIO_FILTRADO = CARDAPIO.filter(item => item.disponivel == true)
        return CARDAPIO_FILTRADO.map(item => item.nome)
   
}

function calcularSubtotal(comanda){
    let total = 0;

    // Loop inicializa um iterador pedido que percorre o array de objetos comanda
    for (const pedido of comanda) {
    //Cria a constante itemCardapio que recebe o valor de buscar item com o iterador e o ID do pedido da comanda
    const itemCardapio = buscarItem(pedido.id);
    // Simplifiquei a lógica do IF, seria a mesma coisa de escrever itemCardapio !== undefined
    // Mas basicamente todo if sem uma lógica tipo >= ou <= vai aplicar o princípio de existencia ou vazio, ou seja se o valor True ele dá continuidade, caso contrário é Undefined, Sim eu Aprendi isso agora :)
    if (itemCardapio) {
      total += itemCardapio.preco * pedido.qtd;
    }
  }

  return total;
}

function calcularServico(subtotal) {
    return Math.round(subtotal * (TAXA_SERVICO / 100));
}

function calcularDesconto(subtotal) {

  if (subtotal > DESCONTO_ACIMA_DE) {
    return VALOR_DESCONTO;
  }
  return 0;
}

function calcularTotal(comanda) {
  const subtotal = calcularSubtotal(comanda);
  const servico = calcularServico(subtotal);
  const desconto = calcularDesconto(subtotal);

  return subtotal + servico - desconto;
}

function fecharConta(comanda){
    for (const item of comanda){
        console.log(`${buscarItem(item.id)}: ${buscarItem(item.preco)}`)
    }
}

function fecharConta(comanda) {
  console.log("CONTA DA MESA");

  for (const pedido of comanda) {
    const item = buscarItem(pedido.id);
    if (item) {
      const valorItem = item.preco * pedido.qtd;
      console.log(`${pedido.qtd}x ${item.nome} - ${reais.format(valorItem / 100)}`);
    }
  }

  const subtotal = calcularSubtotal(comanda);
  const servico = calcularServico(subtotal);
  const desconto = calcularDesconto(subtotal);
  const total = calcularTotal(comanda);

  console.log(`Subtotal: ${reais.format(subtotal / 100)}`);
  console.log(`Taxa de serviço (${TAXA_SERVICO}%): ${reais.format(servico / 100)}`);
  console.log(`Desconto: -${reais.format(desconto / 100)}`);
  console.log(`TOTAL A PAGAR: ${reais.format(total / 100)}`);
}

// Executando o fechamento da conta
fecharConta(comanda);

// Se tudo estiver certo, nada aparece no console. Se algo falhar, exibe um erro.

// 1. Teste busca de item (R3)
console.assert(buscarItem(1).nome === "Água de coco", "Erro: Deveria encontrar Água de coco");

// 2. Teste filtro de ativos (R4)
console.assert(filtrarAtivos().length === 5, "Erro: Deveria retornar 5 itens disponíveis");

// 3. Teste cálculo de subtotal (R5) -> (2*700) + (3*800) + (2*1500) + (1*2000) = 8800
console.assert(calcularSubtotal(comanda) === 8800, "Erro: Subtotal da comanda deveria ser 8800");

// 4. Teste taxa de serviço (R6) -> 10% de 8800 = 880
console.assert(calcularServico(8800) === 880, "Erro: Taxa de serviço deveria ser 880");

// 5. Teste regra dos R$ 80,00 em ponto (R8) -> 8000 não ganha desconto (precisa ser > 8000)
console.assert(calcularDesconto(8000) === 0, "Erro: R$ 80,00 exatos não deveria ter desconto");

// 6. Teste desconto acima de R$ 80,00 e total final (R6)
console.assert(calcularDesconto(8800) === 500, "Erro: Acima de R$ 80,00 deveria ter desconto de 500");
console.assert(calcularTotal(comanda) === 9180, "Erro: Total final deveria ser 9180");
