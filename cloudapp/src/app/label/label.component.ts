import { Component, OnInit, ViewChild, ElementRef, ApplicationRef, ComponentFactoryResolver, Injector, ViewContainerRef, ComponentRef } from '@angular/core';
import { Patron } from '../models/patron';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudAppRestService, CloudAppSettingsService } from '@exlibris/exl-cloudapp-angular-lib';
import { map } from 'rxjs/operators';
import { Settings } from '../models/settings';
import { PrintComponent } from '../print/print.component';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  
  patron: Patron;
  settings: Settings;
  printComponent: ComponentRef<PrintComponent>;
  @ViewChild('iframe', { read: ElementRef }) iframe: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private restService: CloudAppRestService,
    private settingsService: CloudAppSettingsService,
    private vcref: ViewContainerRef,
    private resolver: ComponentFactoryResolver,

  ) { }

  ngOnInit(): void {
   //this.patronId = this.route.snapshot.paramMap.get('id');
   //console.log(this.patronId);
    this.restService.call<any>('/users/'+this.route.snapshot.paramMap.get('id'))
    .pipe(
      //finalize(()=>this.loading=false),
      map(result => { this.patron = new Patron(
      result.full_name,
      result.primary_id,
      result.user_identifier.filter(x => x.id_type.value == '01').pop().value
    )}))
    .subscribe(
      //result => console.log('result:', result),
    )
    
    this.settingsService.get().subscribe(settings => {
      this.settings = settings as Settings;
    });
    const componentFactory = this.resolver.resolveComponentFactory(PrintComponent);
    this.printComponent = this.vcref.createComponent(componentFactory);
  }

  prenta(){
    window.print();
  }

  printIframe():void {
    const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    const CIL_style = "<style>@media print {html, body {margin: 0px;}}</style>";
    doc.body.innerHTML = CIL_style;
    doc.body.appendChild(this.printComponent.location.nativeElement);
    // iframe.contentWindow.print();
    this.iframe.nativeElement.contentWindow.print();
    this.router.navigate(['/']);
  }


  // print(){
  //   const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
  //   const CIL_style = "<style>@media print {html, body {margin: 0px;}}</style>";
  //   doc.body.innertHTML = CIL_style;
  //   doc.body.appendChild(this.iframe.nativeElement.contentWindow.document.getElementById('label'));
  // }


}
