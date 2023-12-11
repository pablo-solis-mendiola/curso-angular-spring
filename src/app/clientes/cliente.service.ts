import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  private baseUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {

    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`);
    
    // Alternate Methods

    // Just using the keyword 'as' + the type to cast the Observable to
    // * return this.http.get(`${this.baseUrl}/clientes`) as Observable<Cliente[]>;

    // (This one requires to import map from rxjs/operators)
    // * return this.http.get(`${this.baseUrl}/clientes`).pipe(
    // *         map(res => res as Cliente[])
    // * );
  }

  getCliente(): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/clientes`);
  }
}
