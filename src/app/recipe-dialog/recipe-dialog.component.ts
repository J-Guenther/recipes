import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Recipe } from '../services/recipe'

@Component({
    selector: 'app-recipe-dialog',
    templateUrl: './recipe-dialog.component.html',
    styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public recipe: Recipe) {}
}
