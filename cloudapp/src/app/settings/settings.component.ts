import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService, CloudAppSettingsService, FormGroupUtil } from '@exlibris/exl-cloudapp-angular-lib';
import { AppService } from '../app.service';
import { Settings } from '../models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  //disabled = true;
  saving = false;
  selectedLabel: string;
  selectedIdentifier: string;
  //settings: Settings;
  
  labels: any[] = [
    {name: 'R 72 x 68', id: 'r72x68'}, 
    {name: 'R 72 x 55', id: 'r72x55'},
    {name: 'R 87 x 80', id: 'r87x80'},
  ];

  identifiers: any[] = [
    {name: 'Kennitala', id: 'kennitala'},
    {name: 'Strikamerki', id: 'strikamerki'},
  ];

  constructor(
    // private appService: AppService,
    private settingsService: CloudAppSettingsService,
    private alert: AlertService,
    //private labelsService: LabelsService,
  ) { }

  ngOnInit() {
    //this.appService.setTitle('Settings');
    this.settingsService.get()
      .subscribe( settings => {
        this.form = FormGroupUtil.toFormGroup(Object.assign(new Settings(), settings))
        //console.log("#####: " + this.form.value),
        //console.log("@@@@@: " + settings.identifier);
    });
    
  }

  save() {
    this.saving = true;
    this.settingsService.set(this.form.value).subscribe(
      response => {
        this.alert.success('Settings successfully saved.');
        this.form.markAsPristine();
      },
      err => this.alert.error(err.message),
      ()  => this.saving = false
    );
  }
}
