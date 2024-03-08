import { FormGroup } from "@angular/forms";

export interface ItemOrdemCompra {
    id?: number;
    numeroNota: number;
    dataPedido: Date;
    dataEntrega: Date;
    precoCompra: number;
    quantidade: number;
    valorTotal: number;
    observacao: string;
    produtoCapa?: number;
    produtoCapaDesc?: String;
    ordemCompra: number;
    editMode?: boolean;
    formGroup?: FormGroup;
  }
