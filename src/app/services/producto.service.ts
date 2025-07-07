import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  _id?: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  enOferta: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/productos';  // URL 

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoPorId(id: string): Observable<Producto> {
  return this.http.get<Producto>(`${this.apiUrl}/${id}`);
}

  crearProducto(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  actualizarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
