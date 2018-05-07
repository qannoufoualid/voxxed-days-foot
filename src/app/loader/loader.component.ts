import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    show: boolean;

    constructor(private loaderService: LoaderService) { }
  
    ngOnInit() {
      this.loaderService.getShow().subscribe(show => {
        this.show = show;
      });
    }
  
    hide(){
      this.show = false;
    }

}
