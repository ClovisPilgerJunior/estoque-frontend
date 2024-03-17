export class OrdemCompra {
    id?: number;
    numeroNotaOrdem: number;
    fornecedor: number;
    dataEmissao: Date;
    dataPedidoOrdemCompra: Date;
    dataRecebimentoOrdemCompra: Date;
    quantidade: number;
    statusOrdem: number;
    valorTotal?: number;
    ordemObservacao: string;
  }