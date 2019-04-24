import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Chart } from 'chart.js'
import {MatSnackBar} from '@angular/material';
import { DeviceComponent } from '../device/devices'
import {DeviceService} from '../device/deviceService';

@Component({
  /*selector: 'status',*/
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements AfterViewInit {



  public BASE_URL: string = 'http://127.0.0.1:8003/';
  isLoggedIn: boolean = false;
  user_account = { email: '', password: '', username: '',
    first_name: '', last_name: '', tagline: '',
    avatar: '', created_at: '', updated_at: '', is_admin: '',
    is_active: '', is_staff: ''};
  devices = [];
  // @Input()
  // devicesComp: DeviceComponent;

  chart = [];
  canvas: any;
  ctx: any;
   @ViewChild('snrChart') snrChart: ElementRef;
   @ViewChild('rssiChart') rssiChart: ElementRef;
   @ViewChild('deviceChart') deviceChart: ElementRef;
   @ViewChild('deviceChart1') deviceChart1: ElementRef;
   @ViewChild('deviceChart2') deviceChart2: ElementRef;
   @ViewChild('deviceChart3') deviceChart3: ElementRef;

  constructor(private router: Router, private auth: AuthService, public popup: MatSnackBar) {}


  navigateDevice = function () {
        this.router.navigateByUrl('devices');
      }

  ngOnInit(): void {

    // this.devices = this.devicesComp.devicesget();
    const token = localStorage.getItem('token');
    var retrievedUser = localStorage.getItem('user')
    this.user_account = JSON.parse(retrievedUser);
    // console.log(this.user_account);

    if (token) {
      this.auth.ensureAuthenticated(token)
      .then((user) => {

        if (user.json().status === 'success') {
          this.isLoggedIn = true;

        }

        this.popup.open('Hello '+this.user_account.email, 'login', {
          duration: 2000,
        });

      })
      .catch((err) => {
        console.log(err);
      });
    }

    var xlist = [1,2,3];
    var list1 = [868.5,820.5,920.5];
    var list2 = [756.5,820.5,657];


  }

  ngAfterViewInit() {

    this.canvas = document.getElementById('summaryChart3');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'pie',
      data: {
        datasets:[
          {
            data: ['98.2','1.8'],
            backgroundColor: ['#3cba9f','#ffcc00'],
            label: 'Dataset 1'
          }],
          labels:['received', 'lost']
      },
      options: {
        responsive: true,
        title: {
					display: true,
					text: 'Sigfox'
				}
      }
    });

    this.canvas = document.getElementById('summaryChart2');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'pie',
      data: {
        datasets:[
          {
            data: ['95.7','4.3'],
            backgroundColor: ['#3cba9f','#ffcc00'],
            label: 'Dataset 1'
          }],
          labels:['received', 'lost']
      },
      options: {
        responsive: true,
        title: {
					display: true,
					text: 'LoRa Objenious'
				}
      }
    });

    this.canvas = document.getElementById('summaryChart1');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'pie',
      data: {
        datasets:[
          {
            data: ['59','41'],
            backgroundColor: ['#3cba9f','#ffcc00'],
            label: 'Dataset 1'
          }],
          labels:['received', 'lost']
      },
      options: {
        responsive: true,
        title: {
					display: true,
					text: 'LoRa Orange'
				}
      }
    });

    this.canvas = this.snrChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'line',
      data: {
        labels: ['1','2','3'],
        datasets:[
          {
            label: 'first chart',
            data: ['868.5','820.5','920.5'],
            borderColor: '#3cba9f',
            fill:false
          }
        ]
      },
      options: {
        responsive: true,
        title: {
					display: true,
					text: 'SNR'
				},
        tooltips: {
					mode: 'index',
					intersect: false,
				},
        legend: {
          display: false
        },
        hover: {
					mode: 'nearest',
					intersect: true
				},
        scales: {
          xAxes:[{
            display: true,
            scaleLabel: {
							display: true,
							labelString: 'Time'
						}
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
							display: true,
							labelString: 'SNR'
						}
          }]
        }
      }
    });

    this.canvas = document.getElementById('dailyChart');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'bar',
      data: {
        labels:['1','2','3','4','5','6','7','8','9'],
        datasets:[
          {
            label:'LoRa Objenious',
            data: ['1','1','1','1','0','1','1','0','1'],
            backgroundColor: '#3cba9f',
            borderWidth: 1
          }]

      },
      options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: false,
						text: ''
					}
				}
    });

    var options = {
			maintainAspectRatio: false,
			spanGaps: false,
			elements: {
				line: {
					tension: 0.000001
				}
			},
			plugins: {
				filler: {
					propagate: false
				}
			},
			scales: {
				xAxes: [{
					ticks: {
						autoSkip: false,
						maxRotation: 0
					}
				}]
			}
		};

    this.canvas = this.rssiChart.nativeElement;
    console.log(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'line',

				data: {
					labels: ['09:02:30','09:13:04','09:27:50','09:36:52','09:49:43','10:00:38','10:19:03','10:33:11','10:54:04'],
					datasets: [{
						borderColor: '#F44336',
						data: ['-110','-130','120','100','-110','-120','80','90','110'],
						label: 'Dataset'
					}]
				},
				option: Chart.helpers.merge(options, {
					title: {
						text: 'fill: ',
						display: true
					}
				})

    });

    this.canvas = this.deviceChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'pie',
      data: {
        datasets:[
          {
            data: ['80.3','19.7'],
            backgroundColor: ['#3cba9f','#ffcc00'],
            label: 'Dataset 1'
          }],
          labels:['received', 'lost']
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'NEUMEUS_4906'
        }
      }
    });
    this.canvas = this.deviceChart1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'pie',
      data: {
        datasets:[
          {
            data: ['59','41'],
            backgroundColor: ['#3cba9f','#ffcc00'],
            label: 'Dataset 1'
          }],
          labels:['received', 'lost']
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'LoRa Orange'
        }
      }
    });
    this.canvas = this.deviceChart2.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'pie',
      data: {
        datasets:[
          {
            data: ['95.7','4.3'],
            backgroundColor: ['#3cba9f','#ffcc00'],
            label: 'Dataset 1'
          }],
          labels:['received', 'lost']
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'LoRa Objenious'
        }
      }
    });
    this.canvas = this.deviceChart3.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx , {
      type: 'pie',
      data: {
        datasets:[
          {
            data: ['98.2','1.8'],
            backgroundColor: ['#3cba9f','#ffcc00'],
            label: 'Dataset 1'
          }],
          labels:['received', 'lost']
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Sigfox'
        }
      }
    });
  }


  onLogout(): void {
    this.auth.logout()
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
      console.log('logout');
    })
    .catch((err) => {
      console.log(err);
    });

  }

  goHome = function () {
        this.router.navigateByUrl('');
      }
}

