import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowDown, faClipboardList, faCoffee, faDolly, faIndustry, faMagnifyingGlass, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  faDolly = faDolly;
  faClipBoardList = faClipboardList;
  faMagfyingGlass = faMagnifyingGlass;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faDownCircle = faCircleDown;
  industria = faIndustry;

  constructor(
    private router: Router,
    private toast: ToastrService) { }


  ngOnInit(): void {
    this.router.navigate(['unidadeProdutiva'])
  }


}
