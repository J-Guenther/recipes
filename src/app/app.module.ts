import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RecipeTableComponent } from './recipe-table/recipe-table.component'
import { HomeComponent } from './home/home.component'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { HttpClientModule } from '@angular/common/http'
import { MatCardModule } from '@angular/material/card'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar';
import { ServiceWorkerModule } from '@angular/service-worker'

@NgModule({
    declarations: [AppComponent, RecipeTableComponent, HomeComponent, RecipeDialogComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatTableModule,
        MatCardModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [{ provide: MatDialogRef, useValue: {} }],
    bootstrap: [AppComponent]
})
export class AppModule {}
