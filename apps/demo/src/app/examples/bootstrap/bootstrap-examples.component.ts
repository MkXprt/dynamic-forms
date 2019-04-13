import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExampleData } from '../example.model';

@Component({
  selector: 'app-bootstrap-examples',
  templateUrl: './bootstrap-examples.component.html',
  styleUrls: ['./bootstrap-examples.component.scss']
})
export class BootstrapExamplesComponent {
  data$: Observable<ExampleData>;

  constructor(private route: ActivatedRoute) {
    this.data$ = this.route.data.pipe(
      map(data => this.mapData(data))
    );
  }

  private mapData(data: Data): ExampleData {
    return {
      template: data.template,
      model: {}
    };
  }
}