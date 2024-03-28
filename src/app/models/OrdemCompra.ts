export class OrdemCompra {
    id?: number;
    nomeSolicitante: string;
    numeroNotaOrdem: number;
    fornecedor: number;
    dataEmissao: Date;
    dataPrevisaoEntrega: Date;
    dataPedidoOrdemCompra: Date;
    dataRecebimentoOrdemCompra: Date;
    quantidade: number;
    statusOrdem: number | string;
    valorTotal?: number;
    ordemObservacao: string;
  }