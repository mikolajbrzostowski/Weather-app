import { ApiService } from '../services/api.service';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { User } from '../models/user.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnChanges {
  @Input() user: User;
  modalRef: BsModalRef;
  temperature: number;
  humidity: number;
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue: Date;
  maxDate = new Date();

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.bsValue = new Date();
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        adaptivePosition: true,
        dateInputFormat: 'YYYY-MM-DD, h:mm:ss'
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user) {
      this.user = changes.user.currentValue;
      if (this.user) {
        this.bsValue = new Date();
        this.getWeather(this.bsValue);
      }
    }
  }

  updateUser(updatedUser: User) {
    this.userService.updateUser(updatedUser);
  }

  delete() {
    this.userService.deleteUser(this.user);
  }

  editUser() {
    this.showModal('Edit user', [], 'Confirm', 'Cancel', ModalComponent, {
      callback: this.updateUser.bind(this),
      user: this.user
    });
  }

  deleteUser() {
    this.showModal(
      'Delete user',
      ['Are you sure???'],
      'Confirm',
      'Cancel',
      ConfirmModalComponent,
      {
        callback: this.delete.bind(this)
      }
    );
  }

  showModal(
    title: string,
    list: any[],
    confirmButtonText: string,
    cancelButtonText: string,
    modal,
    data: {}
  ): void {
    const initialState = {
      title,
      list,
      confirmButtonText,
      cancelButtonText,
      data
    };

    this.modalRef = this.modalService.show(modal, { initialState });
    this.modalRef.content.onClose.subscribe(result => {
      console.log('result: ', result);
      if (result) {
        this.modalRef.content.data.callback(result);
      }
    });
  }

  getWeather(time: Date | null) {
    let miliTime = 0;
    time ? (miliTime = time.getTime()) : (miliTime = Date.now());
    miliTime = Math.floor(miliTime / 1000);
    this.geocode(
      `${this.user.city},${this.user.country}`,
      (error, { latitude, longitude, location }) => {
        if (error) {
          return console.log(error);
        }

        this.forecast(
          latitude,
          longitude,
          miliTime,
          (forcastError, forecastData) => {
            if (forcastError) {
              return console.log(forcastError);
            }
          }
        );
      }
    );
  }

  geocode(address, callback) {
    const url = `${environment.geocode.url}${address}.json?access_token=${environment.geocode.accessToken}&limit=1`;

    this.apiService.get(url).subscribe((response: any) => {
      if (response.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined);
      }
      callback(undefined, {
        latitude: response.features[0].center[1],
        longitude: response.features[0].center[0],
        location: response.features[0].place_name
      });
    });
  }

  forecast(latitude, longitude, time, callback) {
    const url = `${environment.darksky.url}${environment.darksky.key}/${latitude},${longitude},${time}?units=si`;

    this.apiService.get(environment.proxy + url).subscribe((response: any) => {
      if (response.currently.temperature) {
        this.temperature = Math.round(
          parseInt(response.currently.temperature, 10)
        );
      }
      if (response.currently.humidity) {
        this.humidity = Math.round(
          parseFloat(response.currently.humidity) * 100
        );
      }
    });
  }

  generatePDF() {
    const element = document.getElementById('weatherComponent') as HTMLElement;
    html2canvas(element).then(canvas => {

      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.height, canvas.width]
      });
      doc.addImage(canvas, 'PNG', 10, 10);
      doc.save(`${this.user.firstName}_${this.user.lastName}.pdf`);
    });
  }
}
