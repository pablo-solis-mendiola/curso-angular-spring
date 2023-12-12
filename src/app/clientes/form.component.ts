import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  public titulo: string = "Nuevo Cliente";

  // Model Data
  public cliente: Cliente = new Cliente();

  public constructor(private clienteService: ClienteService, private router: Router) { }


  public save(): void {
    // console.log("Clicked!", this.cliente);
    this.clienteService.saveCliente(this.cliente).subscribe({ 
      next: (res) => {
        this.router.navigate(["/clientes"]);
      }
    });
  }
}
