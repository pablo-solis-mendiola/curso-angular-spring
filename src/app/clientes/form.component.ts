import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public titulo: string = 'Nuevo Cliente';

  // Model Data
  public cliente: Cliente = new Cliente();

  public constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loadClient();
  }

  public loadClient(): void {
    this.route.params.subscribe((params) => {
      let id = Number(params['id']);

      if (id === 0) {
        return;
      }

      this.clienteService.getCliente(id).subscribe({
        next: (cliente: Cliente) => {
          // this.cliente.nombre = cliente.nombre;
          // this.cliente.apellido = cliente.apellido;
          // this.cliente.email = cliente.email;
          this.cliente = cliente;
        },
      });
    });
  }

  public save(): void {
    this.clienteService.saveCliente(this.cliente).subscribe({
      next: (cliente: Cliente) => {
        this.router.navigate(['/clientes']);
        swal.fire(
          "Nuevo cliente",
          `Cliente ${cliente.nombre} ${cliente.apellido} creado exitosamente`,
          "success"
        );
      },
    });
  }

  public update(): void {
    this.clienteService.updateCliente(this.cliente).subscribe({
      next: (cliente: Cliente) => {
        this.router.navigate(['/clientes']);
        swal.fire(
          "Actualización correcta",
          `Cliente ${cliente.nombre} ${cliente.apellido} actualizado exitosamente`,
          "success"
        );
      },
    });
  }
}
