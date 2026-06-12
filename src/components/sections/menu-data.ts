export type Bowl = {
  name: string;
  image: string;
  description: string;
  price: string;
  calories: string;
  popular?: boolean;
};

export const categories = [
  "Bowls",
  "Bigger bowls",
  "Greens & Grain Bowls",
  "Dumplings",
  "Sides",
  "Tacos",
  "Family meals",
  "Desserts",
] as const;

export const bowls: Bowl[] = [
  {
    name: "Steak Bowl",
    image: "/images/bowl-steak.png",
    description:
      "Juicy steak marinated in-house with our WaBa marinade and grilled to perfection.",
    price: "$12.19",
    calories: "560 Cals",
    popular: true,
  },
  {
    name: "Chicken Bowl",
    image: "/images/bowl-chicken.png",
    description:
      "Grilled all-white chicken over rice and crisp steamed veggies with our signature sauce.",
    price: "$10.49",
    calories: "490 Cals",
  },
  {
    name: "Chicken & Steak",
    image: "/images/bowl-chicken-steak.png",
    description:
      "The best of both worlds — fire-grilled chicken and steak piled high on a fresh base.",
    price: "$12.99",
    calories: "610 Cals",
    popular: true,
  },
  {
    name: "Grilled Bowl",
    image: "/images/bowl-grilled.png",
    description:
      "Flame-kissed, glazed protein with broccoli, carrots and rice for a bold, balanced bite.",
    price: "$11.29",
    calories: "530 Cals",
  },
];
