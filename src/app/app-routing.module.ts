import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';

// layout
import { DefaultLayoutComponent } from '@layout/default/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'transactions', loadChildren: './pages/transaction/transaction.module#TransactionModule' },
      { path: 'reports', loadChildren: './pages/report/report.module#ReportModule' },
      { path: 'clients', loadChildren: './pages/client/client.module#ClientModule' }
    ]
  },

  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
