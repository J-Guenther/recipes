export const TAG_COLORS = {
  pasta:      { bg: 'var(--amber-light)',  fg: 'var(--charcoal)', dot: 'var(--amber)'  },
  tofu:       { bg: 'var(--sage-light)',   fg: 'var(--charcoal)', dot: 'var(--sage)'   },
  vegan:      { bg: 'var(--sage-light)',   fg: 'var(--charcoal)', dot: 'var(--sage)'   },
  vegetarian: { bg: 'var(--sage-light)',   fg: 'var(--charcoal)', dot: 'var(--sage)'   },
  drinks:     { bg: 'var(--sky-light)',    fg: 'var(--charcoal)', dot: 'var(--sky)'    },
  dessert:    { bg: 'var(--plum-light)',   fg: 'var(--charcoal)', dot: 'var(--plum)'   },
  soup:       { bg: 'var(--sky-light)',    fg: 'var(--charcoal)', dot: 'var(--sky)'    },
  salad:      { bg: 'var(--sage-light)',   fg: 'var(--charcoal)', dot: 'var(--sage)'   },
  meat:       { bg: 'var(--terra-light)',  fg: 'var(--charcoal)', dot: 'var(--terra)'  },
  seafood:    { bg: 'var(--sky-light)',    fg: 'var(--charcoal)', dot: 'var(--sky)'    },
  quick:      { bg: 'var(--amber-light)',  fg: 'var(--charcoal)', dot: 'var(--amber)'  },
  dairy:      { bg: 'var(--cream-dark)',   fg: 'var(--charcoal)', dot: 'var(--charcoal-light)' },
  noodles:    { bg: 'var(--amber-light)',  fg: 'var(--charcoal)', dot: 'var(--amber)'  },
  italian:    { bg: 'var(--terra-light)',  fg: 'var(--charcoal)', dot: 'var(--terra)'  },
  japanese:   { bg: 'var(--plum-light)',   fg: 'var(--charcoal)', dot: 'var(--plum)'   },
  mexican:    { bg: 'var(--terra-light)',  fg: 'var(--charcoal)', dot: 'var(--terra)'  },
  default:    { bg: 'var(--cream-dark)',   fg: 'var(--charcoal)', dot: 'var(--charcoal-light)' },
}

export function tagStyle(tag) {
  return TAG_COLORS[tag] || TAG_COLORS.default
}