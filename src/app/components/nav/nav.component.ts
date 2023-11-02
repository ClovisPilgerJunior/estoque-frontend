import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faClipboardList, faCoffee, faDolly, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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

  constructor(
    private router: Router,
    private toast: ToastrService) { }


  ngOnInit(): void {
    this.router.navigate(['fornecedor'])
  }


}
