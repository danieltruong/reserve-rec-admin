import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { SidebarService } from '../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signInWithRedirect, getCurrentUser, fetchAuthSession, signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  @Input() showSideBar = true;

  private subscriptions = new Subscription();
  public isAuthenticed = false;
  public session;
  public envName: string;
  public showBanner = true;
  public welcomeMsg: string;
  public isAuthorized: boolean;
  public routes: any[] = [];

  constructor(
    protected configService: ConfigService,
    protected sidebarService: SidebarService,
    private changeDetectorRef: ChangeDetectorRef
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
    try {
      // Check if user is already signed in, throws if not
      await getCurrentUser();
      this.isAuthenticed = true;
    } catch (e) {
      console.log(e);
    }

    // Change this to a back-end service.
    const self = this;
    setInterval(async () => {
      self.session = await fetchAuthSession();
      if (self?.session?.tokens?.idToken?.payload != null) {
        self.isAuthenticed = true;
      } else {
        self.isAuthenticed = false;
      }
      self.changeDetectorRef.detectChanges();
    }, 15000);
  }

  public async onLoginLogoutCLick(inOrOut: string) {
    if (inOrOut === 'login') {
      await signInWithRedirect({
        provider: {
          custom: 'AzureIDIR'
        }
      });
    } else {
      await signOut();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
