import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private baseUrl: string = "http://localhost:8080/api";

  private httpHeaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, private router: Router) { }

  public getClientes(): Observable<Cliente[]> {

    // return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`, { headers: this.httpHeaders });
    
    // Alternate Methods

    // Just using the keyword 'as' + the type to cast the Observable to
    // return this.http.get(`${this.baseUrl}/clientes`) as Observable<Cliente[]>;

    // (This one requires to import map from rxjs/operators)
     return this.http.get<any>(`${this.baseUrl}/clientes`).pipe(
             map(res => res.data as Cliente[])
     );
  }

  public getCliente(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.baseUrl}/clientes/${id}`, { headers: this.httpHeaders }).pipe(
        catchError(e => {
            this.router.navigate(['/clientes']);
            console.error(e.error.mensaje);
            swal.fire("Error al obtener cliente", e.error.mensaje, "error");
            return throwError(()=> e);
        }),
        map(res => res.data as Cliente)
    );
  }

  public saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/clientes`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire("Error al guardar cliente", e.error.mensaje, "error");
        return throwError(() => e);
      })
    );
  }

  public updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<any>(`${this.baseUrl}/clientes/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire("Error al obtener cliente", e.error.mensaje, "error");
          return throwError(()=> e);
        }),
        map(res => res.data as Cliente)
    );
  }

  public deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.baseUrl}/clientes/${id}`, { headers: this.httpHeaders }).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire("Error al borrar cliente", e.error.mensaje, "error");
          return throwError(()=> e);
        })
    );
  }
}
