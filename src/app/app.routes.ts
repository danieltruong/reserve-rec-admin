import { Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { CallbackComponent } from './callback/callback.component';

export const routes: Routes = [
  { path: 'logout', component: LogoutComponent },
  { path: 'callback', component: CallbackComponent }
];
