"use client";

import { useState, useEffect, useRef } from "react";
import { type Coffee } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CoffeeIcon } from "lucide-react";
import CoffeeOrderForm from "@/components/coffee-order-form";
import OrdersInProgress from "@/components/orders-in-progress";
import QueueVisualization from "@/components/queue-visualization";
import Pusher from "pusher-js";
import axios from "axios";

export default function CoffeeMachine() {
  const [orders, setOrders] = useState<Coffee[]>([]);
  const [inProgress, setInProgress] = useState<Coffee | null>(null);
  const [isMachineRunning, setIsMachineRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const addOrder = (order: Coffee) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const startMachine = async () => {
    if (ordersRef.current.length === 0) return;

    const nextOrder = ordersRef.current[0];
    setIsMachineRunning(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/start-coffee",

        {
          type: nextOrder.type.toLowerCase(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );

      setInProgress(nextOrder);
      setOrders((prevOrders) => prevOrders.slice(1));
    } catch (error) {
      console.error(error);
      setIsMachineRunning(false);
    }
  };

  const ordersRef = useRef(orders);

  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  useEffect(() => {
    const pusher = new Pusher("0cb73dbd54701bd8b369", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("coffee-status");
    channel.bind("coffee-status-update", (data: { timeRemaining: string }) => {
      const remainingTime = +data.timeRemaining;
      setTimer(remainingTime);

      if (remainingTime === 0) {
        setInProgress(null);
        setIsMachineRunning(false);

        if (ordersRef.current.length > 0) {
          setTimeout(() => {
            startMachine();
          }, 500);
        }
      }
    });

    return () => {
      pusher.unsubscribe("coffee-channel");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0] p-4">
      <Card className="w-full max-w-3xl shadow-lg border-0">
        <CardHeader className="bg-[#c08552] text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <CoffeeIcon size={28} />
            Machine à caffé
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CoffeeOrderForm onAddOrder={addOrder} />
            <OrdersInProgress order={inProgress} timeRemaining={timer} />
          </div>

          <QueueVisualization queue={orders} />

          <div className="grid gap-4 mt-6">
            <Button
              onClick={startMachine}
              className={`${isMachineRunning ? "bg-[#a06a38]" : "bg-[#c08552] hover:bg-[#a06a38]"} text-white`}
              disabled={isMachineRunning}
            >
              Démarrer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
