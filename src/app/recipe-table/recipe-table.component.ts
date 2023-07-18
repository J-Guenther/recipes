import { Component, Input, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { RecipeService } from '../services/recipe.service'
import { Recipe } from '../services/recipe'
import { MatDialog } from '@angular/material/dialog'
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component'

@Component({
    selector: 'app-recipe-table',
    templateUrl: './recipe-table.component.html',
    styleUrls: ['./recipe-table.component.css']
})
export class RecipeTableComponent implements OnInit {
    displayedColumns: string[] = ['name']
    dataSource: MatTableDataSource<Recipe>
    recipes: Recipe[]
    private _meat = true
    private _vegetarian = true
    private _vegan = true
    private _filterValue = ''

    @Input()
    set meat(value: boolean) {
        this._meat = value
        this.applyType(value, this.vegetarian, this.vegan)
    }
    get meat(): boolean {
        return this._meat
    }
    @Input()
    set vegetarian(value: boolean) {
        this._vegetarian = value
        this.applyType(this.meat, value, this.vegan)
    }
    get vegetarian(): boolean {
        return this._vegetarian
    }
    @Input()
    set vegan(value: boolean) {
        this._vegan = value
        this.applyType(this.meat, this.vegetarian, value)
    }
    get vegan(): boolean {
        return this._vegan
    }
    @Input()
    set filterValue(value: string) {
        this._filterValue = value
        this.applyFilter(this._filterValue)
    }
    get filterValue(): string {
        return this._filterValue
    }

    constructor(private recipeService: RecipeService, public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource<Recipe>([])
        this.recipes = []
    }

    async ngOnInit() {
        this.recipes = await this.recipeService.getRecipes()
        this.applyType(this.meat, this.vegetarian, this.vegan)
    }

    applyFilter(value: string) {
        this._filterValue = value
        this.dataSource.filter = this.filterValue.trim().toLowerCase()
    }

    applyType(meat: boolean, vegetarian: boolean, vegan: boolean) {
        console.log({ meat, vegetarian, vegan })
        const recipes: Recipe[] = []

        if (meat) {
            recipes.push(...this.recipes.filter(recipes => recipes.type === 'Meat'))
        }
        if (vegetarian) {
            recipes.push(...this.recipes.filter(recipes => recipes.type === 'Vegetarian'))
        }
        if (vegan) {
            recipes.push(...this.recipes.filter(recipes => recipes.type === 'Vegan'))
        }

        this.dataSource = new MatTableDataSource(recipes)
        this.applyFilter(this.filterValue)
    }

    clickRow(row: Recipe) {
        this.dialog.open(RecipeDialogComponent, {
            data: row,
            autoFocus: false
        })
    }
}
