import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CoffeeIcon, TimerIcon } from "lucide-react";
import type { Coffee } from "@/lib/types";

interface OrdersInProgressProps {
  order: Coffee | null;
  timeRemaining: number;
}

export default function OrdersInProgress({
  order,
  timeRemaining,
}: OrdersInProgressProps) {
  const getProgressPercentage = (order: Coffee, timeRemaining: number) => {
    const totalTime =
      order.type === "Espresso"
        ? 15
        : order.type === "Latte"
          ? 30
          : order.type === "Cappuccino"
            ? 20
            : 15;

    return Math.min(
      100,
      Math.max(0, ((totalTime - timeRemaining) / totalTime) * 100),
    );
  };

  return (
    <Card className="border-[#e8d0b9]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-[#3c2415] flex items-center gap-2">
          <CoffeeIcon size={18} />
          Commandes en cours
        </CardTitle>
      </CardHeader>
      <CardContent>
        {order ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#c08552] text-2xl">☕</span>
              <span className="text-lg font-medium">{order.type}</span>
            </div>

            <Progress
              value={getProgressPercentage(order, timeRemaining)}
              className="h-2 bg-[#e8d0b9]"
            />

            <div className="flex items-center gap-2 text-[#3c2415]">
              <TimerIcon size={16} />
              <span className="text-lg">{timeRemaining}s</span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic flex items-center justify-center h-[100px]">
            Aucun caffé en cours de préparation
          </div>
        )}
      </CardContent>
    </Card>
  );
}
