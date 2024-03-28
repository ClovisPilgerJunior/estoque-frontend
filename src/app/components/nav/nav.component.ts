
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faCircleDown, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCircleArrowDown, faClipboardList, faCoffee, faDolly, faIndustry, faMagnifyingGlass, faMinusCircle, faPlusCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
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
  faSearch = faMagnifyingGlass;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faDownCircle = faCircleDown;
  faIndustry = faIndustry;
  faExitToApp = faRightFromBracket;
  faNotifications = faBell;
  faPerson = faUser;
  faList = faClipboardList;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.router.navigate(['ordemCompra'])
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

  isManager(): boolean {
    return this.authService.hasPermission('ROLE_MANAGER');
  }

  isUser(): boolean {
    return this.authService.hasPermission('ROLE_USER')
  }


}
