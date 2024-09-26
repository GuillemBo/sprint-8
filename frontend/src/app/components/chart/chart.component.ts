import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;

  private barChart!: Chart;
  private lineChart!: Chart;

  constructor(private productService: ProductService) {
    Chart.register(...registerables); // Asegúrate de registrar los componentes de Chart.js
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.productService.getListProducts().subscribe((products: Product[]) => {
      console.log('Productos cargados:', products);

      const labels = products.map((product: Product) => product.name);
      const stockValues = products.map((product: Product) => product.stock);
      const priceValues = products.map((product: Product) => product.price);

      this.createBarChart(labels, stockValues);
      this.createLineChart(labels, priceValues);
    }, error => {
      console.error('Error al cargar productos:', error);
    });
  }

  createBarChart(labels: string[], stockValues: number[]) {
    if (this.barChart) {
      this.barChart.destroy();
    }

    const barConfig: ChartConfiguration<'bar'> = {
      type: 'bar', // Asegúrate de usar 'bar' como tipo
      data: {
        labels: labels,
        datasets: [{
          label: 'Stock de Productos',
          data: stockValues,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    };

    this.barChart = new Chart(this.barCanvas.nativeElement, barConfig);
  }

  createLineChart(labels: string[], priceValues: number[]) {
    if (this.lineChart) {
      this.lineChart.destroy();
    }

    const lineConfig: ChartConfiguration<'line'> = {
      type: 'line', // Asegúrate de usar 'line' como tipo
      data: {
        labels: labels,
        datasets: [{
          label: 'Precio de Productos',
          data: priceValues,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true
      }
    };

    this.lineChart = new Chart(this.lineCanvas.nativeElement, lineConfig);
  }
}