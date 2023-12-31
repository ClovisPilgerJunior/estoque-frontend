export interface ProdutoEntrada {
    id?: number;
    numeroNota: number;
    dataPedido: Date;
    dataEntrega: Date;
    precoCompra: number;
    quantidade: number;
    observacao: string;
    produtoCapa?: number;
    produtoCapaDesc?: String;
  }
