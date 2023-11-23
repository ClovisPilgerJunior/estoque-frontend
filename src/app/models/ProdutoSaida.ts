export interface ProdutoSaida {
  id?: number;
  dataSaida: Date;
  quantidade: number;
  retiradoPor: string;
  setor: number;
  unidadeProdutiva?: number;
  servico?: string;
  observacao: string;
  produtoCapa?: number;
  produtoCapaDesc?: String;
}
