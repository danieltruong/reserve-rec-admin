import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { SidebarService } from '../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { fetchAuthSession, signInWithRedirect, signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  @Input() showSideBar = true;

  private subscriptions = new Subscription();

  public envName: string;
  public showBanner = true;
  public welcomeMsg: string;
  public isAuthorized: boolean;
  public routes: any[] = [];

  constructor(
    protected configService: ConfigService,
    protected sidebarService: SidebarService
  ) {
    this.subscriptions.add(
      sidebarService.routes.subscribe((routes) => {
        this.routes = routes;
      })
    );

    this.envName = this.configService.config['ENVIRONMENT'];
    if (this.envName === 'prod') {
      this.showBanner = false;
    }
  }

  async ngOnInit() {
    const session = await fetchAuthSession();
  }

  public async onLoginCLick() {
    await signInWithRedirect();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
