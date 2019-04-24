import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from './deviceService';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'devices',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  deviceList: DeviceData[] = [];
  error: any;
  displayedColumns = ['id', 'label', 'description'];
  dataSource: MatTableDataSource<DeviceData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceService: DeviceService) {
    // let deviceList : DeviceData[] = [];

  }

   getDevices() {
    this.deviceService
        .getDevices()
        .then(deviceList => this.deviceList = deviceList)
        .catch(error => this.error = error);
  }

  ngOnInit() {
    // this.deviceList =  this.getDevices();
    //  console.log(this.deviceList);
    //
    // // deviceList.push();
    // this.dataSource = new MatTableDataSource(this.deviceList);


  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // ngAfterViewInit() {
  //   // console.log('device');
  //   // console.log(this.devices);
  // }


}

export interface DeviceData {
  device_id: string;
  label: string;
  description: string;
  state: string;
  last_modification: string;
  created: string;
  last_activity: string;
  user: string;
}
