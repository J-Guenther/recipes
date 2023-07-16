export interface Recipe {
    name: string
    ingredients: string[]
    cookingSteps: string[]
    notes: string
    type: 'Meat' | 'Vegetarian' | 'Vegan'
    source: string
}
