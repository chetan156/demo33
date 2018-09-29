import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule' },
    { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
