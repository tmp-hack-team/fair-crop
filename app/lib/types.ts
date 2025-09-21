import {
  AppleIcon,
  CarrotIcon,
  EggIcon,
  LeafyGreenIcon,
  MilkIcon,
} from "lucide-react";

export const BASKET_TYPES = {
  milk: {
    label: "Milk",
    icon: MilkIcon,
  },
  eggs: {
    label: "Eggs",
    icon: EggIcon,
  },
  fruit: {
    label: "Fruit",
    icon: AppleIcon,
  },
  greens: {
    label: "Leafy Greens",
    icon: LeafyGreenIcon,
  },
  vegetables: {
    label: "Vegetables",
    icon: CarrotIcon,
  },
};

export type BasketType = keyof typeof BASKET_TYPES;

export type BasketSubscription = { [k in BasketType]: number };
export type Subscription = {
  baskets: BasketSubscription;
  fullName: string;
  email: string;
  address: string;
  phone: string;
};
