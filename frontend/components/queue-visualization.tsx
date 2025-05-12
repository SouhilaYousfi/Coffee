import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListIcon } from "lucide-react";
import type { Coffee } from "@/lib/types";

interface QueueVisualizationProps {
  queue: Coffee[];
}

export default function QueueVisualization({ queue }: QueueVisualizationProps) {
  return (
    <Card className="border-[#e8d0b9]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-[#3c2415] flex items-center gap-2">
          <ListIcon size={18} />
          File d'attente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {queue.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {queue.map((order, index) => (
              <div
                key={order.id}
                className="flex items-center gap-1 bg-[#f8ece1] p-2 rounded-lg border border-[#e8d0b9]"
              >
                <span className="text-[#c08552]">☕</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{order.type}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic flex items-center justify-center h-[80px]">
            La file d'attente est vide
          </div>
        )}
      </CardContent>
    </Card>
  );
}
