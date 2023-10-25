import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService, CloudAppSettingsService, FormGroupUtil } from '@exlibris/exl-cloudapp-angular-lib';
import { Settings } from '../models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  saving = false;
  selectedLabel: string;
  selectedIdentifier: string;
  
  labels: any[] = [
    {name: 'R 72 x 68', id: 'r72x68'}, 
    {name: 'R 72 x 55', id: 'r72x55'},
    {name: 'R 87 x 80', id: 'r87x80'},
    {name: 'Karta biblioteczna', id: 'karta_biblioteczna'}
  ];

  identifiers: any[] = [
    {name: 'Kennitala', id: 'kennitala'},
    {name: 'Strikamerki', id: 'strikamerki'},
    {name: 'Primary Id', id: 'primaryId'}
  ];

  constructor(
    private settingsService: CloudAppSettingsService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.settingsService.get()
      .subscribe( settings => {
        this.form = FormGroupUtil.toFormGroup(Object.assign(new Settings(), settings))
    });
    
  }

  save() {
    this.saving = true;
    this.settingsService.set(this.form.value).subscribe(
      response => {
        this.alert.success('Stillingar vistaðar.');
        this.form.markAsPristine();
      },
      err => this.alert.error(err.message),
      ()  => this.saving = false
    );
  }
}
