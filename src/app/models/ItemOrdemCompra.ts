import { FormGroup } from "@angular/forms";

export interface ItemOrdemCompra {
    id?: number;
    numeroNota: number;
    precoCompra: number;
    quantidade: number;
    valorTotal?: number;
    observacao: string;
    produtoCapaId?: number;
    produtoCapaDesc?: String;
    ordemCompraId: number;
    editMode?: boolean;
    formGroup?: FormGroup;
  }
