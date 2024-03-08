export class OrdemCompra {
    id?: number;
    fornecedor: number;
    dataEmissao: Date;
    dataPedidoOrdemCompra: Date;
    dataRecebimentoOrdemCompra: Date;
    quantidade: number;
    statusOrdem: number;
    valorTotal?: number;
  }