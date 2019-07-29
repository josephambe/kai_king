import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';


const routes: Routes = [
  { path: '', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/login/login_page.module#LoginPageModule' },
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
  { path: 'table-create', loadChildren: './pages/table-create/table-create.module#TableCreatePageModule', canActivate: [AuthGuard] },
  { path: 'table-detail/:id', loadChildren: './pages/table-detail/table-detail.module#TableDetailPageModule', canActivate: [AuthGuard] },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
