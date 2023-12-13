import swal from 'sweetalert2';
import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  public ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes);
  }

  public delete(cliente: Cliente): void {
    const swalBS = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary mx-1',
        cancelButton: 'btn btn-outline-primary mx-1',
      },
      buttonsStyling: false,
    });

    swalBS.fire({
        title: `¿Está seguro de eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
        text: "Una vez borrado, no podrá recuperar este registro",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.deleteCliente(cliente.id).subscribe(() => {

            // Evaluate if the client object matches the deleted client
            this.clientes = this.clientes.filter((item: Cliente) => item !== cliente);

            // Evaluate if the id doesn't match the deleted client's
            // this.clientes = this.clientes.filter((item: Cliente) => item.id !== cliente.id);

            swal.fire({
              title: "¡Borrado!",
              text: `¡El cliente ${cliente.nombre} ${cliente.apellido} fue borrado exitosamente!`,
              icon: "success",
            });
          });
        }
      });
  }
}
