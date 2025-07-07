import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.service';   
import { CommonModule } from '@angular/common';                 

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],                   
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {
  formulario: FormGroup;
  enviado = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.formulario = this.fb.group({
    nombre: ['', Validators.required],
    categoria: ['', Validators.required],
    precio: [null, [Validators.required, Validators.min(0.01)]],
    stock: [null, [Validators.required, Validators.min(0)]],
    enOferta: [false]
});

  }

  guardar() {
  this.enviado = false;
  this.error = null;

  if (this.formulario.valid) {
    const producto = this.formulario.value;
    console.log('Guardando producto:', producto);

    this.productoService.crearProducto(producto).subscribe({
      next: (res) => {
        console.log('Producto guardado en el backend:', res);
        this.enviado = true;
        this.formulario.reset();
        this.obtenerProductos(); // 
      },
      error: (err) => {
        console.error('Error al guardar el producto:', err);
        this.error = 'No se pudo guardar el producto. Verifica tu backend.';
      }
    });
  } else {
    this.formulario.markAllAsTouched();
  }
}

  productoSeleccionadoId: string | null = null;  

// Meodo para actualizar un producto existente
actualizar() {
  if (this.formulario.valid && this.productoSeleccionadoId) {
    const productoActualizado = this.formulario.value;
    this.productoService.actualizarProducto(this.productoSeleccionadoId, productoActualizado).subscribe({
      next: (res) => {
        console.log('Producto actualizado:', res);
        this.enviado = true;
        this.formulario.reset();
        this.productoSeleccionadoId = null; 
        this.obtenerProductos();           
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
        this.error = 'No se pudo actualizar el producto.';
      }
    });
  } else {
    this.formulario.markAllAsTouched();
  }
}

// Metodo para eliminar un producto
eliminar(id: string) {
  if (confirm('¿Estas seguro de eliminar este producto?')) {
    this.productoService.eliminarProducto(id).subscribe({
      next: (res) => {
        console.log('Producto eliminado:', res);
        this.obtenerProductos(); 
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        this.error = 'No se pudo eliminar el producto.';
      }
    });
  }
}
productos: any[] = [];  

ngOnInit() {
  this.obtenerProductos();
}

obtenerProductos() {
  this.productoService.getProductos().subscribe({
    next: (res) => {
      this.productos = res;
      console.log('Productos cargados:', this.productos);
    },
    error: (err) => {
      console.error('Error al cargar productos:', err);
      this.error = 'No se pudieron cargar los productos.';
    }
  });
}

// Para cargar un producto al formulario para editarlo
seleccionarProducto(producto: any) {
  this.formulario.patchValue({
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: producto.precio,
    stock: producto.stock,
    enOferta: producto.enOferta
  });
  this.productoSeleccionadoId = producto._id;  
}

}
