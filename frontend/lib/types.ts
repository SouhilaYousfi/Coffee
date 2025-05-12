export enum CoffeeType {
  ESPRESSO = "Espresso",
  LATTE = "Latte",
  CAPPUCCINO = "Cappuccino",
}

export interface Coffee {
  id: string;
  type: CoffeeType;
  timestamp: Date;
}
