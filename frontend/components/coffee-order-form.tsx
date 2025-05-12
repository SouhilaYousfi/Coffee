"use client";

import { useState } from "react";
import { type Coffee, CoffeeType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface CoffeeOrderFormProps {
  onAddOrder: (order: Coffee) => void;
}

export default function CoffeeOrderForm({ onAddOrder }: CoffeeOrderFormProps) {
  const [coffeeType, setCoffeeType] = useState<CoffeeType>(CoffeeType.ESPRESSO);

  const handleAddOrder = () => {
    const newOrder: Coffee = {
      id: Math.random().toString(36).substring(2, 9),
      type: coffeeType,

      timestamp: new Date(),
    };

    onAddOrder(newOrder);
  };

  return (
    <Card className="border-[#e8d0b9]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-[#3c2415] flex items-center gap-2">
          <PlusIcon size={18} />
          Ajouter une commande
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-4">
          <Select
            value={coffeeType}
            onValueChange={(value) => setCoffeeType(value as CoffeeType)}
          >
            <SelectTrigger className="w-full border-[#e8d0b9]">
              <SelectValue placeholder="Select coffee type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CoffeeType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleAddOrder}
            className="w-full bg-[#c08552] hover:bg-[#a06a38] text-white"
          >
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
