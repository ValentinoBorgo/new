import { Component, OnInit } from '@angular/core';
import { SucursalesService } from '../sucursales.service';
import { forkJoin } from 'rxjs';

interface Venta {
  Suc1: number;
  Suc2: number;
  Suc3: number;
  Suc4: number;
  Suc5: number;
}

interface EditState {
  isEditing: boolean;
  rowIndex: number;
  colIndex: number;
  value: number;
  originalValue: number;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  host: {
    ngSkipHydration: 'true'
  }
})
export class TablaComponent implements OnInit {
  ventas: Venta[] = [];
  datos: number[][] = [];
  meses: string[] = [];
  sucursales: string[] = [];
  max: number | undefined;
  maxApiladas: number | undefined;
  totalAnual: number[] | undefined;
  totalMensual: number[] = [];
  sumaTotalAnual: number | undefined;
  cargando: boolean = true;

  editState: EditState = {
    isEditing: false,
    rowIndex: -1,
    colIndex: -1,
    value: 0,
    originalValue: 0
  };

  constructor(private sucursalService: SucursalesService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    forkJoin({
      meses: this.sucursalService.recuperarMeses(),
      sucursales: this.sucursalService.recuperarSucus(),
      ventas: this.sucursalService.recuperarVentas()
    }).subscribe({
      next: (result) => {
        this.meses = result.meses;
        this.sucursales = result.sucursales;
        this.ventas = result.ventas;
        this.procesarDatos();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
        this.cargando = false;
      }
    });
  }

  onCellClick(rowIndex: number, colIndex: number): void {
    if (!this.editState.isEditing && this.datos[rowIndex] && this.datos[rowIndex][colIndex] !== undefined) {
      this.editState = {
        isEditing: true,
        rowIndex,
        colIndex,
        value: this.datos[rowIndex][colIndex],
        originalValue: this.datos[rowIndex][colIndex]
      };
    }
  }

  cancelEdit(): void {
    if (this.editState.isEditing) {
      // Restaurar el valor original
      this.datos[this.editState.rowIndex][this.editState.colIndex] = this.editState.originalValue;
      this.resetEditState();
    }
  }

  confirmarEdit(): void {
    if (this.editState.isEditing) {
      const columnName = `Suc${this.editState.colIndex + 1}`;
      const id = this.editState.rowIndex + 1;
      const valor = this.editState.value;

      this.sucursalService.actualizarVenta(id, columnName, valor).subscribe({
        next: (response) => {
          this.datos[this.editState.rowIndex][this.editState.colIndex] = valor;
          
          const ventaKey = columnName as keyof Venta;
          if (this.ventas[this.editState.rowIndex]) {
            this.ventas[this.editState.rowIndex][ventaKey] = valor;
          }

          this.procesarDatos();
          this.resetEditState();
        },
        error: (error) => {
          console.error('Error al actualizar la venta:', error);
          this.datos[this.editState.rowIndex][this.editState.colIndex] = this.editState.originalValue;
          this.resetEditState();
          alert('Error al actualizar el valor');
        }
      });
    }
  }

  private resetEditState(): void {
    this.editState = {
      isEditing: false,
      rowIndex: -1,
      colIndex: -1,
      value: 0,
      originalValue: 0
    };
  }

  private procesarDatos() {
    this.datos = [];
    this.ventas.forEach((venta: Venta) => {
      this.datos.push(Object.values(venta));
    });

    this.totalAnual = this.totalFunction();
    this.totalMensual = this.totalMensualFunction();
    this.sumaTotalAnual = this.totalTotales(this.totalAnual);
  }

  private totalFunction(): number[] {
    let totalArray: number[] = [];
    if (this.sucursales.length > 0 && this.datos.length > 0) {
      for (let d = 0; d < this.sucursales.length; d++) {
        let total = 0;
        for (let f = 0; f < this.meses.length; f++) {
          if (this.datos[f] && typeof this.datos[f][d] === 'number') {
            total += this.datos[f][d];
          }
        }
        totalArray.push(total);
      }
    }
    return totalArray;
  }

  private totalMensualFunction(): number[] {
    let totalArray: number[] = [];
    if (this.meses.length > 0 && this.datos.length > 0) {
      for (let d = 0; d < this.meses.length; d++) {
        let total = 0;
        if (this.datos[d]) {
          for (let f = 0; f < this.sucursales.length; f++) {
            if (typeof this.datos[d][f] === 'number') {
              total += this.datos[d][f];
            }
          }
        }
        totalArray.push(total);
      }
    }
    return totalArray;
  }

  private totalTotales(totalAnual: number[]): number {
    return totalAnual.reduce((acc, curr) => acc + curr, 0);
  }
}