export class FornecedorDTO {
  id: number;
  empresa: string;
  nome: string;
}

export class ProdutoCapa {
  id?: any;
  description: string;
  tipoProduto: string;
  medidaUnidade: string;
  fornecedor: FornecedorDTO; // Agora, fornecedor é do tipo Fornecedor
  minimo: number;
  maximo: number;
  resuprimento: string;
  ativo: boolean;
}
