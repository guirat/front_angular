import { Component, OnInit } from '@angular/core';
import { DeviceService } from './deviceService';

@Component({
  selector: 'devices',
  template: `<mat-card class="example-card" *ngFor="let device of devices" style="width:200px; margin:1rem;">
  <mat-card-header>
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title>{{device.device_id}}</mat-card-title>
    <mat-card-subtitle>{{device.label}}</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>
      {{device.description}}
    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>`
})
export class DeviceComponent implements OnInit {
  devices: any[];
  error: any;

  constructor(private deviceService: DeviceService) { }

  getDevices() {
    this.deviceService
        .getDevices()
        .then(devices => this.devices = devices)
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getDevices();
  }

   devicesget(){
    console.log(this.devices);
    return this.devices;
  }
}
