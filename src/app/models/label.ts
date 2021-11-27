export interface Label {
  id: number
  label: string
  icon: string
}

export const LABELS = [
  {id: 0, label: 'label.vegetarian', icon: 'vegetarian.svg'},
  {id: 1, label: 'label.vegan', icon: 'vegan.svg'},
  {id: 2, label: 'label.alcoholic', icon: 'wine.svg'},
  {id: 3, label: 'label.gluten', icon: 'gluten.svg'},
  {id: 4, label: 'label.lactose', icon: 'milk.svg'}
] as const;


