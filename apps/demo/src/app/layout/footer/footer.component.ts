import { Component, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../app-config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  get buildVersion(): string {
    return this.build ? `${this.version}-${this.build}` : this.version;
  }

  private get version(): string { return this.appConfig.version; }
  private get build(): string { return this.appConfig.build; }
}
