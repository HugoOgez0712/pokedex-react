# Pokedex structure :

## 1. Component Hierarchy

tsx
App
├── Title Section
│ ├── Main Title (h1)
│ ├── Subtitle (p)
│ └── Search Bar (input)
│
└── Pokemon Cards Section
└── Card Grid
└── Individual Pokemon Cards
├── Pokemon Name
├── Type Badges
└── Pokemon Sprite Image

## 2. Data Structure :

typescript
// Main Interfaces
interface Pokemon {
id: number;
name: string;
types: {
type: {
name: string;
}
}[];
sprites: {
front_default: string;
};
stats: {
base_stat: number;
stat: {
name: string;
};
}[];
abilities: {
ability: {
name: string;
};
}[];
}

## 3. Layout Structure

html

<div className="App">
│
├── Title Section
│ └── container
│ ├── row
│ │ └── col-12 (Title & Subtitle)
│ └── row
│ └── col-12 col-md-6 (Search Bar)
│
└── Cards Section
└── container-fluid
└── row
└── col (Pokemon Cards)
└── card
├── card-body
│ ├── card-title
│ └── type badges
└── card-img-bottom
