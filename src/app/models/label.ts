export interface Label {
  label: string
  icon: string
}

export interface LabelList {
  [key: string]: Label
}


//important: do not switch the labels' order
export const LABELS = [
  {label: 'label.vegan', icon: 'plant'},
  {label: 'label.alcoholic', icon: 'wine'}
] as const;


