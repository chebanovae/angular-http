import { Component } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.service.getAppName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  constructor(private service: ServerService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSave() {
    this.service.storeServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error),
        () => console.log('Complete onSave')
      );
  }

  onGet() {
    this.service.getServers()
      .subscribe(
        (servers: any[]) => this.servers = servers,
      (error) => console.log(error),
      () => console.log('Complete onSave')
    );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
