import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Route, 
  MapPin, 
  Clock, 
  Navigation, 
  Truck,
  Zap,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RouteStop {
  id: string;
  order: number;
  clientName: string;
  address: string;
  time: string;
  estimatedDuration: string;
  priority: "normal" | "urgent";
}

const mockRoute: RouteStop[] = [
  {
    id: "1",
    order: 1,
    clientName: "Anna Berzina",
    address: "Brīvības iela 123, Riga",
    time: "10:00",
    estimatedDuration: "10 min",
    priority: "normal"
  },
  {
    id: "2",
    order: 2,
    clientName: "Jānis Kalnins", 
    address: "Elizabetes iela 45, Riga",
    time: "14:00",
    estimatedDuration: "8 min",
    priority: "urgent"
  },
  {
    id: "3",
    order: 3,
    clientName: "Marta Liepa",
    address: "Valdemāra iela 88, Riga",
    time: "16:30",
    estimatedDuration: "12 min",
    priority: "normal"
  }
];

export const RoutePlanner = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [route, setRoute] = useState<RouteStop[]>([]);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const { toast } = useToast();

  const handleOptimizeRoute = async () => {
    setIsOptimizing(true);
    
    // Simulate AI route optimization
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setRoute(mockRoute);
    setIsRouteGenerated(true);
    setIsOptimizing(false);

    toast({
      title: "Route Optimized Successfully",
      description: "AI has generated the most efficient delivery sequence.",
    });
  };

  const totalDistance = "24.5 km";
  const totalTime = "2h 15min";
  const savings = "35min saved";

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="gradient-hero text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Route Planning</CardTitle>
          <CardDescription className="text-primary-foreground/80 text-lg">
            AI-powered route optimization for efficient deliveries
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Route Optimization */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>AI Route Optimization</span>
            </CardTitle>
            <CardDescription>
              Generate the most efficient delivery sequence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isRouteGenerated ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Route className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Ready to Optimize</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {mockRoute.length} confirmed orders ready for route planning
                </p>
                <Button 
                  variant="accent" 
                  size="lg"
                  onClick={handleOptimizeRoute}
                  disabled={isOptimizing}
                  className="w-full"
                >
                  {isOptimizing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mr-2" />
                      Optimizing Route...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Optimize Route with AI
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Route Summary */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-success-light rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{totalDistance}</p>
                    <p className="text-xs text-success/80">Total Distance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{totalTime}</p>
                    <p className="text-xs text-success/80">Est. Duration</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{savings}</p>
                    <p className="text-xs text-success/80">Time Saved</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button variant="success" className="w-full">
                    <Navigation className="w-4 h-4 mr-2" />
                    Open in Google Maps
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Truck className="w-4 h-4 mr-2" />
                    Send to Driver
                  </Button>
                  
                  <Button variant="ghost" className="w-full" onClick={handleOptimizeRoute}>
                    <Zap className="w-4 h-4 mr-2" />
                    Re-optimize Route
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Route Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {isRouteGenerated ? "Interactive route map would appear here" : "Generate a route to see the map"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Details */}
      {isRouteGenerated && (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Route className="w-5 h-5" />
              <span>Optimized Delivery Sequence</span>
            </CardTitle>
            <CardDescription>
              Follow this sequence for the most efficient delivery route
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {route.map((stop, index) => (
                <div key={stop.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center text-accent-foreground font-bold flex-shrink-0">
                    {stop.order}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{stop.clientName}</h4>
                      {stop.priority === "urgent" && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{stop.address}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Scheduled: {stop.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Navigation className="w-3 h-3" />
                        <span>Duration: {stop.estimatedDuration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <Button variant="outline" size="sm">
                      <Navigation className="w-3 h-3 mr-1" />
                      Navigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};