
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowDown, faClipboardList, faCoffee, faDolly, faIndustry, faMagnifyingGlass, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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
    private toast: ToastrService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.router.navigate(['produtoConsultar'])
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 2500 })
  }

  isAdminUser(): boolean {
    // Verifique se o usuário tem a role 'ADMIN'
    return this.authService.hasPermission('ROLE_ADMIN');
  }


}
