import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { VoiceCapture } from "@/components/voice/VoiceCapture";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { RoutePlanner } from "@/components/routes/RoutePlanner";
import { DriverView } from "@/components/driver/DriverView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Phone, 
  Users, 
  Route, 
  Truck,
  Zap,
  ArrowRight
} from "lucide-react";

type ActiveTab = "voice" | "orders" | "routes" | "driver";

const Index = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("voice");

  const tabs = [
    { id: "voice" as const, label: "Voice Capture", icon: Phone, component: VoiceCapture },
    { id: "orders" as const, label: "Orders", icon: Users, component: OrdersTable },
    { id: "routes" as const, label: "Route Planning", icon: Route, component: RoutePlanner },
    { id: "driver" as const, label: "Driver View", icon: Truck, component: DriverView },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || VoiceCapture;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Demo Flow Navigation */}
        <Card className="shadow-medium">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h2 className="text-xl font-bold mb-2">VanRoute AI Demo Flow</h2>
                <p className="text-muted-foreground text-sm">
                  Voice Call → AI Processing → Order Management → Route Optimization → Driver Navigation
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Follow the demo sequence</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCompleted = tabs.findIndex(t => t.id === activeTab) > index;
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "accent" : isCompleted ? "success" : "outline"}
                className={`p-4 h-auto flex flex-col items-center space-y-2 transition-smooth ${
                  !isActive && !isCompleted ? "hover:border-accent" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs opacity-75">
                  <span>Step {index + 1}</span>
                  {index < tabs.length - 1 && <ArrowRight className="w-3 h-3" />}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Active Component */}
        <div className="transition-smooth">
          <ActiveComponent />
        </div>

        {/* Demo Instructions */}
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-sm">Demo Instructions</h3>
              <div className="grid md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                <div>
                  <strong>Step 1:</strong> Use "Simulate Call" to generate a voice order
                </div>
                <div>
                  <strong>Step 2:</strong> Review and confirm orders in the Orders tab
                </div>
                <div>
                  <strong>Step 3:</strong> Generate optimized routes with AI
                </div>
                <div>
                  <strong>Step 4:</strong> View mobile driver interface
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;