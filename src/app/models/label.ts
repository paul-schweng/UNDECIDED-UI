export interface Label {
  label: string
  icon: string
}

export interface LabelList {
  [key: string]: Label
}

// switch between 'en' and 'de' like this:
// https://stackoverflow.com/questions/47825728/typescript-dynamically-assign-a-part-of-variable-name

export const LABELS: LabelList = {
  vegan: {label: 'label.vegan', icon: 'plant'},
  alcoholic: {label: 'label.alcoholic', icon: 'wine'}
}


