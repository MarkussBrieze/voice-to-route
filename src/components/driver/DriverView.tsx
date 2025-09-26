import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Navigation, 
  MapPin, 
  Clock, 
  CheckCircle,
  Phone,
  AlertTriangle,
  Truck,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeliveryStop {
  id: string;
  order: number;
  clientName: string;
  phone: string;
  address: string;
  scheduledTime: string;
  priority: "normal" | "urgent";
  status: "pending" | "completed" | "current";
  notes?: string;
}

const mockRoute: DeliveryStop[] = [
  {
    id: "1",
    order: 1,
    clientName: "Anna Berzina",
    phone: "+371 2234 5678",
    address: "Brīvības iela 123, Riga, LV-1001",
    scheduledTime: "10:00",
    priority: "normal",
    status: "completed"
  },
  {
    id: "2",
    order: 2,
    clientName: "Jānis Kalnins",
    phone: "+371 9876 5432", 
    address: "Elizabetes iela 45, Riga, LV-1010",
    scheduledTime: "14:00",
    priority: "urgent",
    status: "current",
    notes: "Ring doorbell twice"
  },
  {
    id: "3",
    order: 3,
    clientName: "Marta Liepa",
    phone: "+371 5555 1234",
    address: "Valdemāra iela 88, Riga, LV-1013",
    scheduledTime: "16:30", 
    priority: "normal",
    status: "pending"
  }
];

export const DriverView = () => {
  const [deliveries, setDeliveries] = useState<DeliveryStop[]>(mockRoute);
  const { toast } = useToast();

  const completedCount = deliveries.filter(d => d.status === "completed").length;
  const totalCount = deliveries.length;
  const progress = (completedCount / totalCount) * 100;

  const handleMarkDelivered = (deliveryId: string) => {
    setDeliveries(prev => prev.map(delivery => {
      if (delivery.id === deliveryId && delivery.status === "current") {
        // Mark current as completed and move to next
        return { ...delivery, status: "completed" as const };
      }
      if (delivery.order === deliveries.find(d => d.id === deliveryId)!.order + 1 && delivery.status === "pending") {
        // Set next delivery as current
        return { ...delivery, status: "current" as const };
      }
      return delivery;
    }));

    toast({
      title: "Delivery Completed",
      description: "Great job! Moving to the next delivery.",
    });
  };

  const currentDelivery = deliveries.find(d => d.status === "current");

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Header */}
      <Card className="gradient-hero text-primary-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Driver Dashboard</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Mobile route navigation and delivery tracking
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <Card className="shadow-medium">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Route Progress</h3>
              <Badge className="bg-accent text-accent-foreground text-xs">
                {completedCount} of {totalCount} completed
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Started: 09:30</span>
              <span>ETA: 17:45</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Delivery */}
      {currentDelivery && (
        <Card className="shadow-accent border-accent/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Badge className="bg-accent text-accent-foreground text-xs">
                <Truck className="w-3 h-3 mr-1" />
                Current Delivery
              </Badge>
              <span className="text-lg font-bold text-accent">#{currentDelivery.order}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{currentDelivery.clientName}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <Phone className="w-3 h-3" />
                <span>{currentDelivery.phone}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm">{currentDelivery.address}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Scheduled: {currentDelivery.scheduledTime}</span>
                {currentDelivery.priority === "urgent" && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Urgent
                  </Badge>
                )}
              </div>
            </div>

            {currentDelivery.notes && (
              <div className="p-3 bg-warning-light rounded-lg">
                <p className="text-sm text-warning-foreground">
                  <strong>Note:</strong> {currentDelivery.notes}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Button variant="accent" className="w-full" size="lg">
                <Navigation className="w-4 h-4 mr-2" />
                Open in Maps
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Client
                </Button>
                
                <Button 
                  variant="success" 
                  size="sm"
                  onClick={() => handleMarkDelivered(currentDelivery.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Deliveries List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">All Deliveries</CardTitle>
          <CardDescription>Complete route overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {deliveries.map((delivery) => (
            <div 
              key={delivery.id} 
              className={`p-3 rounded-lg border transition-smooth ${
                delivery.status === "current" 
                  ? "border-accent bg-accent-light" 
                  : delivery.status === "completed"
                  ? "border-success bg-success-light"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    delivery.status === "completed" 
                      ? "bg-success text-success-foreground" 
                      : delivery.status === "current"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {delivery.status === "completed" ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      delivery.order
                    )}
                  </div>
                  <h4 className="font-semibold text-sm">{delivery.clientName}</h4>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{delivery.scheduledTime}</p>
                  {delivery.priority === "urgent" && (
                    <Badge variant="destructive" className="text-xs mt-1">
                      Urgent
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">{delivery.address}</p>
              
              {delivery.status === "current" && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Navigation className="w-3 h-3 mr-1" />
                    Navigate
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleMarkDelivered(delivery.id)}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Complete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Route Summary */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-success">{completedCount}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent">{deliveries.filter(d => d.status === "current").length}</p>
              <p className="text-xs text-muted-foreground">Current</p>
            </div>
            <div>
              <p className="text-lg font-bold text-muted-foreground">{deliveries.filter(d => d.status === "pending").length}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};