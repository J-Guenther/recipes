import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RecipeTableComponent } from './recipe-table/recipe-table.component'

@NgModule({
    declarations: [AppComponent, RecipeTableComponent],
    imports: [BrowserModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
