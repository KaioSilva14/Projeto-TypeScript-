interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
  categoria: string;
  data: string;
}

let transacoes: Transacao[] = [];

function adicionarTransacao(
  descricao: string,
  valor: number,
  tipo: "entrada" | "saida",
  categoria: string,
  data: string
): void {
  if (valor <= 0) {
    console.log("O valor deve ser maior que zero.");
    return;
  }

  const novaTransacao: Transacao = {
    id: transacoes.length + 1,
    descricao,
    valor,
    tipo,
    categoria,
    data,
  };

  transacoes.push(novaTransacao);
  console.log(`Transação adicionada: ${descricao}`);
}

function calcularTotalEntradas(): number {
  return transacoes
    .filter((transacao) => transacao.tipo === "entrada")
    .reduce((total, transacao) => total + transacao.valor, 0);
}

function calcularTotalSaidas(): number {
  return transacoes
    .filter((transacao) => transacao.tipo === "saida")
    .reduce((total, transacao) => total + transacao.valor, 0);
}

function calcularSaldo(): number {
  return calcularTotalEntradas() - calcularTotalSaidas();
}

function filtrarPorCategoria(categoria: string): Transacao[] {
  return transacoes.filter(
    (transacao) =>
      transacao.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

function listarTransacoes(lista: Transacao[] = transacoes): void {
  if (lista.length === 0) {
    console.log("Nenhuma transação encontrada.");
    return;
  }

  lista.forEach((transacao) => {
    const sinal = transacao.tipo === "entrada" ? "+" : "-";

    console.log(
      `${transacao.id}. ${transacao.data} | ` +
        `${transacao.descricao} | ` +
        `${transacao.categoria} | ` +
        `${sinal} R$ ${transacao.valor.toFixed(2)}`
    );
  });
}

function exibirResumo(): void {
  const entradas = calcularTotalEntradas();
  const saidas = calcularTotalSaidas();
  const saldo = calcularSaldo();

  console.log("\\n===== RESUMO FINANCEIRO =====");
  console.log(`Total de entradas: R$ ${entradas.toFixed(2)}`);
  console.log(`Total de saídas:   R$ ${saidas.toFixed(2)}`);
  console.log(`Saldo atual:       R$ ${saldo.toFixed(2)}`);
}

adicionarTransacao("Salário", 3500, "entrada", "Trabalho", "2026-08-01");
adicionarTransacao("Aluguel", 1200, "saida", "Moradia", "2026-08-05");
adicionarTransacao("Supermercado", 450.75, "saida", "Alimentação", "2026-08-08");
adicionarTransacao("Freelance", 800, "entrada", "Trabalho", "2026-08-10");
adicionarTransacao("Cinema", 70, "saida", "Lazer", "2026-08-12");

console.log("\\n===== TODAS AS TRANSAÇÕES =====");
listarTransacoes();

exibirResumo();

console.log("\\n===== TRANSAÇÕES DA CATEGORIA TRABALHO =====");
listarTransacoes(filtrarPorCategoria("trabalho"));