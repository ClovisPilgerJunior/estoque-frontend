import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { OrdemCompra } from 'src/app/models/OrdemCompra';
import { AuthService } from 'src/app/services/auth.service';
import { OrdemCompraService } from 'src/app/services/ordem-compra.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { OrdemCompraAddEditComponent } from '../ordem-compra-add-edit/ordem-compra-add-edit.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra-listar',
  templateUrl: './ordem-compra-listar.component.html',
  styleUrls: ['./ordem-compra-listar.component.scss']
})
export class OrdemCompraListarComponent {

  faPlus = faPlus;

  ELEMENT_DATA: OrdemCompra[] = [];

  displayedColumns: string[] = [
    'action',
    'id',
    'nomeSolicitante',
    'fornecedor',
    'numeroNota',
    'dataEmissao',
    'dataPedidoOrdemCompra',
    'dataPrevisaoEntrega',
    'dataRecebimentoOrdemCompra',
    'quantidade',
    'statusOrdem',
    'valorTotal',
    'ordemObservacao',
  ];
  dataSource = new MatTableDataSource<OrdemCompra>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: OrdemCompraService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private authService: AuthService
  ) {
  }

  isAdminUser(): boolean {
    // Verifique se o usuário tem a role 'ADMIN'
    return this.authService.hasPermission('ROLE_ADMIN');
  }

  isManager(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER');
  }

  isUser(): boolean {
    return this.authService.hasPermission('ROLE_USER')
  }

  isUserAndProdutoSaidaCreate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_CREATE')
  }

  isUserAndProdutoSaidaUpdate(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_UPDATE')
  }

  isUserAndProdutoSaidaDelete(): boolean {
    return this.authService.hasPermission('ROLE_USER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_DELETE')
  }

  isManagerAndProdutoSaidaCreate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_CREATE')
  }

  isManagerAndProdutoSaidaUpdate(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_UPDATE')
  }

  isManagerAndProdutoSaidaDelete(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER') && this.authService.hasPermission('ROLE_PRODUTOSAIDA_DELETE')
  }

  ngOnInit(): void {
    this.findAll();
  }


  dateEntrega: FormGroup;

  editingOrderId: number | null = null;
  originalPrevisaoEntrega: Date | null = null; // Armazena a cópia da data original
  
  startEditing(orderId: number) {
    const order = this.ELEMENT_DATA.find(order => order.id === orderId);
    if (order && order.statusOrdem !== 'RECEBIDO') {
       this.editingOrderId = orderId;
       // Salva a cópia da data original antes de iniciar a edição
       this.originalPrevisaoEntrega = order.dataPrevisaoEntrega;
       // Se a data original não existir ou for vazia, define como null
       if (!this.originalPrevisaoEntrega) {
         this.originalPrevisaoEntrega = null;
       }
       console.log("data: ", order.dataPrevisaoEntrega)
       console.log("data: ", this.originalPrevisaoEntrega)
       // Agora, order.dataPrevisaoEntrega já está definido corretamente
    }
   }
   
  
  

  cancelEdit() {
    this.editingOrderId = null;
    this.originalPrevisaoEntrega = null;
  }




  saveEdit(orderId: number, newPrevisaoEntrega: Date) {
    const order = this.ELEMENT_DATA.find(order => order.id === orderId);
    if (order) {
      order.dataPrevisaoEntrega = newPrevisaoEntrega;
      this.editingOrderId = null;

      // Chama o serviço para salvar a nova data de previsão de entrega no banco de dados
      this.service.updatePrevisaoEntrega(orderId, newPrevisaoEntrega).subscribe({
        next: (response) => {
          console.log('Data de previsão de entrega atualizada com sucesso:', response);
          // Atualiza a lista de ordens de compra, se necessário
          this.findAll();
        },
        error: (error) => {
          console.error('Erro ao atualizar a data de previsão de entrega:', error);
        }
      });
    }
  }




  generateAndOpenReport(idOrdemCompra: number) {
    this.service.generateReport(idOrdemCompra).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }


  isOrderFaturada: boolean = false; // Inicialmente, assumimos que a ordem não está faturada

  // Método para atualizar o status da ordem
  updateOrderStatus(status: string) {
    this.isOrderFaturada = status === 'faturar';
  }

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<OrdemCompra>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onFaturar(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja receber sua Ordem de Compra?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log(data.id);
        if (result) {
          // Certifique-se de que data.id está definido e é um número
          if (data.id && typeof data.id === 'number') {
            this.service.faturar(data.id).subscribe({
              next: (response) => {
                this.toast.success('Ordem de Compra recebida com sucesso!', 'sistema')
                console.log(response);
                // Exemplo: mostrar uma mensagem de sucesso
              },
              error: (error) => {
                this.toast.error(error.error, 'sistema')
                console.log(error)
              },
              complete: () => {
                // Aqui você pode colocar qualquer lógica que deve ser executada após a conclusão da requisição
                this.findAll();
              }
            });
          } else {
            console.error('ID da Ordem de Compra não definido ou inválido');
          }
        }
      },
      error: (error) => {
        // Aqui você pode lidar com erros que ocorrem ao tentar abrir o diálogo
        console.error(error);
      },
      complete: () => {
        // Aqui você pode colocar qualquer lógica que deve ser executada após a conclusão da abertura do diálogo
      }
    });
  }

  onEstornar(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja estornar sua Ordem de Compra?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log(data.id);
        if (result) {
          // Certifique-se de que data.id está definido e é um número
          if (data.id && typeof data.id === 'number') {
            this.service.estornar(data.id).subscribe({
              next: (response) => {
                this.toast.success('Ordem estornada com sucesso!', 'sistema')
                this.findAll();
                console.log(response);
                // Exemplo: mostrar uma mensagem de sucesso
              },
              error: (error) => {
                this.toast.error(error.error, 'sistema')
                console.log(error)
              },
            });
          } else {
            console.error('ID da Ordem de Compra não definido ou inválido');
          }
        }
      },
      error: (error) => {
        // Aqui você pode lidar com erros que ocorrem ao tentar abrir o diálogo
        console.error(error);
      },
      complete: () => {
        // Aqui você pode colocar qualquer lógica que deve ser executada após a conclusão da abertura do diálogo
      }
    });
  }

  onLiberar(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Liberar a Ordem de Compra?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log(data.id);
        if (result) {
          // Certifique-se de que data.id está definido e é um número
          if (data.id && typeof data.id === 'number') {
            this.service.liberar(data.id).subscribe({
              next: (response) => {
                this.toast.success('Ordem de Compra liberada com sucesso!', 'sistema')
                this.findAll();
                console.log(response);
                // Exemplo: mostrar uma mensagem de sucesso
              },
              error: (error) => {
                this.toast.error(error.error, 'sistema')
                console.log(error)
              },
            });
          } else {
            console.error('ID da Ordem de Compra não definido ou inválido');
          }
        }
      },
      error: (error) => {
        // Aqui você pode lidar com erros que ocorrem ao tentar abrir o diálogo
        console.error(error);
      },
      complete: () => {
        // Aqui você pode colocar qualquer lógica que deve ser executada após a conclusão da abertura do diálogo
      }
    });
  }

  onDevolver(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Enviar a Ordem de Compra para ser revisada?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log(data.id);
        if (result) {
          // Certifique-se de que data.id está definido e é um número
          if (data.id && typeof data.id === 'number') {
            this.service.devolver(data.id).subscribe({
              next: (response) => {
                this.toast.success('Ordem de Compra devolvida com sucesso!', 'sistema')
                this.findAll();
                console.log(response);
                // Exemplo: mostrar uma mensagem de sucesso
              },
              error: (error) => {
                this.toast.error(error.error, 'sistema')
                console.log(error)
              },
            });
          } else {
            console.error('ID da Ordem de Compra não definido ou inválido');
          }
        }
      },
      error: (error) => {
        // Aqui você pode lidar com erros que ocorrem ao tentar abrir o diálogo
        console.error(error);
      },
      complete: () => {
        // Aqui você pode colocar qualquer lógica que deve ser executada após a conclusão da abertura do diálogo
      }
    });
  }

  onRealizarPedido(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você tem certeza que deseja realizar o pedido da Ordem de Compra?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log(data.id);
        if (result) {
          // Certifique-se de que data.id está definido e é um número
          if (data.id && typeof data.id === 'number') {
            this.service.realizarPedido(data.id).subscribe({
              next: (response) => {
                this.toast.success('Pedido da Ordem de compra realizado com sucesso!', 'sistema')
                this.findAll();
                console.log(response);
                // Exemplo: mostrar uma mensagem de sucesso
              },
              error: (error) => {
                this.toast.error(error.error, 'sistema')
                console.log(error)
              },
            });
          } else {
            console.error('ID da Ordem de Compra não definido ou inválido');
          }
        }
      },
      error: (error) => {
        // Aqui você pode lidar com erros que ocorrem ao tentar abrir o diálogo
        console.error(error);
      },
      complete: () => {
        // Aqui você pode colocar qualquer lógica que deve ser executada após a conclusão da abertura do diálogo
      }
    });
  }

  onRevisar(data: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Enviar a Ordem de Compra para AGUARDANDO LIBERAÇÃO?',
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        console.log(data.id);
        if (result) {
          // Certifique-se de que data.id está definido e é um número
          if (data.id && typeof data.id === 'number') {
            this.service.revisar(data.id).subscribe({
              next: (response) => {
                this.toast.success('Ordem de compra enviada para ser liberada com sucesso!', 'sistema')
                this.findAll();
                console.log(response);
                // Exemplo: mostrar uma mensagem de sucesso
              },
              error: (error) => {
                this.toast.error(error.error, 'sistema')
                console.log(error)
              },
            });
          } else {
            console.error('ID da Ordem de Compra não definido ou inválido');
          }
        }
      },
      error: (error) => {
        // Aqui você pode lidar com erros que ocorrem ao tentar abrir o diálogo
        console.error(error);
      },
      complete: () => {
        // Aqui você pode colocar qualquer lógica que deve ser executada após a conclusão da abertura do diálogo
      }
    });
  }




  onCreate() {
    const dialogRef = this.dialog.open(OrdemCompraAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

  onEditForm(data: any) {
    const dialogRef = this.dialog.open(OrdemCompraAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (response) => {
        response = this.findAll();
      },
    });
  }

}
