import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Recipe } from './recipe'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private URL = '../../' + environment.jsonPath
    constructor(private httpClient: HttpClient) {}

    async getRecipes() {
        const recipes$ = this.httpClient.get(this.URL)
        return (await lastValueFrom(recipes$)) as Recipe[]
    }
}
