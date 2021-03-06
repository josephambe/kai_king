import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { TabsPage } from './tabs.page';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../../services/user/auth.guard';

const routes: Routes = [
    {
        path: '', // default
        component: TabsPage,
        children: [
            { path: 'table-list', loadChildren: '../table-list/table-list.module#TableListModule', canActivate: [AuthGuard] },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule', canActivate: [AuthGuard] },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
            { path: 'edit-image', loadChildren: '../edit-image/edit-image.module#EditImagePageModule', canActivate: [AuthGuard] },
            { path: 'profile-settings', loadChildren: '../profile-settings/profile-settings.module#ProfileSettingsPageModule', canActivate: [AuthGuard] },


        ], canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsRoutingModule {}
