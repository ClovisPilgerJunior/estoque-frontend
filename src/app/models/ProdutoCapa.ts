export class FornecedorDTO {
  id: Number;
  empresa?: string;
  nome?: string;
}

export class ProdutoCapa {
  id?: number;
  description: string;
  tipoProduto: string;
  medidaUnidade: string;
  fornecedor: FornecedorDTO;
  minimo: number;
  maximo: number;
  resuprimento: string;
  ativo: boolean;
}
