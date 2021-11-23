export interface Label {
  label: string
  icon: string
}


//important: do not switch the labels' order!!!!!!!!!!!!!!
export const LABELS = [
  {label: 'label.vegan', icon: 'plant.svg'},
  {label: 'label.alcoholic', icon: 'wine.svg'}
] as const;


