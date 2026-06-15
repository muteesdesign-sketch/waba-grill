import type { MenuItem } from "@/components/ui/MenuItemCard";

export type MenuCategory = {
  id: string;
  name: string; // nav label
  title: string; // section heading
  items: MenuItem[];
};

const IMAGES = [
  "/images/bowl-chicken.png",
  "/images/bowl-steak.png",
  "/images/bowl-chicken-steak.png",
  "/images/bowl-grilled.png",
];
const img = (i: number) => IMAGES[i % IMAGES.length];

export const menuCategories: MenuCategory[] = [
  {
    id: "bowls",
    name: "Bowls",
    title: "Bowls",
    items: [
      {
        name: "Chicken Bowl",
        image: img(0),
        description:
          "Grilled all-natural, never frozen chicken caramelized with our signature WaBa sauce.",
        price: "$10.19",
        calories: "580 Cals",
        badge: "Popular Item",
      },
      {
        name: "Steak Bowl",
        image: img(1),
        description:
          "Juicy steak marinated in-house with our WaBa marinade and grilled to perfection.",
        price: "$12.19",
        calories: "580 Cals",
        badge: "Popular Item",
      },
      {
        name: "Dual Protein Bowl",
        image: img(2),
        description: "Grilled chicken and steak marinated with our signature WaBa sauce.",
        price: "$12.99",
        calories: "520-590 Cals",
      },
      {
        name: "Sweet & Spicy Bowl",
        image: img(3),
        description:
          "Grilled all-natural, never frozen chicken caramelized with WaBa's sweet chili sauce.",
        price: "$10.19",
        calories: "620 Cals",
      },
      {
        name: "Salmon Bowl",
        image: img(3),
        description: "Wild-caught salmon flame-grilled over rice and fresh veggies.",
        price: "$12.19",
        calories: "580 Cals",
      },
      {
        name: "Shrimp Bowl",
        image: img(0),
        description: "Perfectly grilled shrimp tossed with our signature WaBa sauce.",
        price: "$12.19",
        calories: "440 Cals",
        badge: "Limited Time",
      },
      {
        name: "Tofu Bowl",
        image: img(1),
        description: "Grilled organic tofu hand-basted in our flavorful signature WaBa sauce.",
        price: "$10.19",
        calories: "560 Cals",
      },
      {
        name: "Veggie Bowl",
        image: img(2),
        description: "Grilled all-natural, never frozen veggies over a fresh rice base.",
        price: "$7.69",
        calories: "410 Cals",
      },
    ],
  },
  {
    id: "bigger-bowls",
    name: "Bigger bowls",
    title: "Bigger Bowls",
    items: [
      {
        name: "Big Chicken Bowl",
        image: img(0),
        description: "Double the grilled chicken over rice and crisp steamed veggies.",
        price: "$13.19",
        calories: "880 Cals",
        badge: "Popular Item",
      },
      {
        name: "Big Steak Bowl",
        image: img(1),
        description: "A hearty portion of in-house marinated steak, grilled to perfection.",
        price: "$15.19",
        calories: "920 Cals",
      },
      {
        name: "Big Dual Protein",
        image: img(2),
        description: "Loaded chicken and steak for the biggest appetites.",
        price: "$15.99",
        calories: "900 Cals",
      },
      {
        name: "Big Veggie Bowl",
        image: img(3),
        description: "A generous bowl of grilled veggies and rice.",
        price: "$10.69",
        calories: "640 Cals",
      },
    ],
  },
  {
    id: "greens-grain-bowls",
    name: "Greens & Grain Bowls",
    title: "Greens & Grains Bowls",
    items: [
      {
        name: "Chicken Greens Bowl",
        image: img(0),
        description: "Grilled chicken over a bed of fresh greens and ancient grains.",
        price: "$11.19",
        calories: "490 Cals",
        badge: "Popular Item",
      },
      {
        name: "Steak Greens Bowl",
        image: img(1),
        description: "In-house marinated steak over crisp greens and quinoa.",
        price: "$13.19",
        calories: "520 Cals",
      },
      {
        name: "Tofu Greens Bowl",
        image: img(2),
        description: "Grilled organic tofu over greens and grains.",
        price: "$10.19",
        calories: "430 Cals",
      },
      {
        name: "Veggie Greens Bowl",
        image: img(3),
        description: "Fresh grilled veggies over greens and ancient grains.",
        price: "$8.69",
        calories: "360 Cals",
      },
    ],
  },
  {
    id: "dumplings",
    name: "Dumplings",
    title: "Dumplings",
    items: [
      {
        name: "Chicken Dumplings",
        image: img(3),
        description: "Six steamed or fried dumplings filled with seasoned chicken.",
        price: "$5.49",
        calories: "320 Cals",
        badge: "Popular Item",
      },
      {
        name: "Veggie Dumplings",
        image: img(2),
        description: "Six dumplings packed with fresh garden vegetables.",
        price: "$5.49",
        calories: "280 Cals",
      },
      {
        name: "Pork Dumplings",
        image: img(1),
        description: "Six savory pork dumplings with our dipping sauce.",
        price: "$5.99",
        calories: "360 Cals",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    title: "Sides",
    items: [
      {
        name: "Steamed Veggies",
        image: img(2),
        description: "A side of fresh broccoli and carrots, steamed to order.",
        price: "$3.49",
        calories: "60 Cals",
      },
      {
        name: "Side of Rice",
        image: img(0),
        description: "Fluffy white or brown rice.",
        price: "$2.99",
        calories: "300 Cals",
      },
      {
        name: "Side of Chicken",
        image: img(0),
        description: "A scoop of our grilled signature chicken.",
        price: "$4.49",
        calories: "230 Cals",
      },
      {
        name: "Side of Steak",
        image: img(1),
        description: "A scoop of in-house marinated grilled steak.",
        price: "$5.49",
        calories: "250 Cals",
      },
    ],
  },
  {
    id: "tacos",
    name: "Tacos",
    title: "Tacos",
    items: [
      {
        name: "Chicken Taco",
        image: img(0),
        description: "Grilled chicken, fresh slaw, and WaBa sauce in a soft shell.",
        price: "$3.69",
        calories: "240 Cals",
        badge: "Popular Item",
      },
      {
        name: "Steak Taco",
        image: img(1),
        description: "Marinated grilled steak with crisp slaw and sauce.",
        price: "$3.99",
        calories: "260 Cals",
      },
      {
        name: "Shrimp Taco",
        image: img(3),
        description: "Grilled shrimp with fresh slaw and sweet chili drizzle.",
        price: "$4.29",
        calories: "220 Cals",
      },
    ],
  },
  {
    id: "healthy-value-menu",
    name: "Healthy value menu",
    title: "Healthy Value Menu",
    items: [
      {
        name: "Mini Chicken Bowl",
        image: img(0),
        description: "A smaller bowl with grilled chicken, rice, and veggies.",
        price: "$6.99",
        calories: "390 Cals",
      },
      {
        name: "Mini Veggie Bowl",
        image: img(2),
        description: "A lighter bowl of grilled veggies over rice.",
        price: "$5.69",
        calories: "280 Cals",
      },
      {
        name: "Chicken & Veggie Cup",
        image: img(3),
        description: "Grilled chicken and steamed veggies in a value cup.",
        price: "$5.99",
        calories: "260 Cals",
      },
      {
        name: "Value Combo",
        image: img(1),
        description: "A mini bowl plus dumplings and a drink.",
        price: "$8.99",
        calories: "640 Cals",
      },
    ],
  },
  {
    id: "family-meals",
    name: "Family meals",
    title: "Family Meals",
    items: [
      {
        name: "Family Chicken Pack",
        image: img(0),
        description: "Feeds 4 — grilled chicken, rice, and veggies for the whole table.",
        price: "$34.99",
        calories: "2400 Cals",
        badge: "Popular Item",
      },
      {
        name: "Family Steak Pack",
        image: img(1),
        description: "Feeds 4 — in-house marinated steak with all the fixings.",
        price: "$42.99",
        calories: "2600 Cals",
      },
      {
        name: "Family Dual Protein",
        image: img(2),
        description: "Feeds 4 — chicken and steak combo for the family.",
        price: "$44.99",
        calories: "2550 Cals",
      },
      {
        name: "Family Veggie Pack",
        image: img(3),
        description: "Feeds 4 — grilled veggies and rice, plant-forward.",
        price: "$28.99",
        calories: "1800 Cals",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    title: "Desserts",
    items: [
      {
        name: "Mochi Trio",
        image: img(3),
        description: "Three pieces of soft, chewy mochi ice cream.",
        price: "$4.49",
        calories: "210 Cals",
      },
      {
        name: "Banana Spring Rolls",
        image: img(2),
        description: "Crispy spring rolls filled with sweet banana.",
        price: "$3.99",
        calories: "280 Cals",
      },
    ],
  },
  {
    id: "beverages",
    name: "WaBeverages",
    title: "WaBeverages",
    items: [
      {
        name: "Thai Iced Tea",
        image: img(1),
        description: "Sweet, creamy, and refreshing Thai iced tea.",
        price: "$3.49",
        calories: "180 Cals",
      },
      {
        name: "Fountain Drink",
        image: img(0),
        description: "Your choice of fountain beverage.",
        price: "$2.49",
        calories: "0-200 Cals",
      },
      {
        name: "Bottled Water",
        image: img(2),
        description: "Pure bottled water.",
        price: "$1.99",
        calories: "0 Cals",
      },
      {
        name: "Lemonade",
        image: img(3),
        description: "Freshly squeezed, lightly sweet lemonade.",
        price: "$2.99",
        calories: "120 Cals",
      },
    ],
  },
];
