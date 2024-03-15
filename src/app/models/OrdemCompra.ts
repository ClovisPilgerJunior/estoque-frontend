export class OrdemCompra {
    id?: number;
    numeroNota?: number;
    fornecedor: number;
    dataEmissao: Date;
    dataPedidoOrdemCompra: Date;
    dataRecebimentoOrdemCompra: Date;
    quantidade: number;
    statusOrdem: number;
    valorTotal?: number;
    obeservacao?: string;
  }