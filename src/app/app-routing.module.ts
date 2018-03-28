import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./pageNotFound/pageNotFound.component";
import { AuthGuardService } from "./authGuard.service";
import { ErrorPageComponent } from "./errorPage/errorPage.component";
import { serverResolverService } from "./servers/server/serverResolver.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent, children: [
            { path: ':id/:name', component: UserComponent }
        ]
    },
    {
        path: 'servers',
        //canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        component: ServersComponent, children: [
            { path: ':id', component: ServerComponent, resolve: { server: serverResolverService } },
            { path: ':id/edit', component: EditServerComponent }
        ]
    },
    // { path: 'pageNotFound', component: PageNotFoundComponent },
    { path: 'pageNotFound', component: ErrorPageComponent, data: { message: 'Page not found!!!!' } },
    { path: '**', redirectTo: 'pageNotFound' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}