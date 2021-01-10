import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from "../shared/authentication.guard";
import { QuillModule } from 'ngx-quill';
import { SearchPipe } from "../shared/search.pipe";



@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children:[
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},   
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthenticationGuard]},
                    {path: 'add', component: AddPageComponent, canActivate: [AuthenticationGuard]},
                    {path: 'orders', component: OrdersPageComponent, canActivate: [AuthenticationGuard]},
                    {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthenticationGuard]},           
                ]
            }
        ])
    ],
    exports: [RouterModule],
    declarations: [
        AdminLayoutComponent, 
        LoginPageComponent, 
        AddPageComponent, 
        DashboardPageComponent, 
        EditPageComponent, 
        OrdersPageComponent,
        SearchPipe,
    ]
})

export class AdminModule{
}
