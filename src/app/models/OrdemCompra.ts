export class OrdemCompra {
    id?: number;
    fornecedor: number;
    dataPedidoOrdemCompra: Date;
    dataRecebimentoOrdemCompra: Date;
    quantidade: number;
    statusOrdem: number;
    valorTotal?: number;
  }