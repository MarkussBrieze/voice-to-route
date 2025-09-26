import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Route,
  Truck,
  X,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  clientName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  status: "unconfirmed" | "confirmed" | "in_route" | "delivered";
  priority: "normal" | "urgent";
}

const mockOrders: Order[] = [
  {
    id: "1",
    clientName: "Anna Berzina",
    phone: "+371 2234 5678",
    address: "Brīvības iela 123, Riga, LV-1001",
    date: "2024-01-15",
    time: "10:00",
    status: "unconfirmed",
    priority: "normal"
  },
  {
    id: "2",
    clientName: "Jānis Kalnins",
    phone: "+371 9876 5432",
    address: "Elizabetes iela 45, Riga, LV-1010",
    date: "2024-01-15",
    time: "14:00",
    status: "confirmed",
    priority: "urgent"
  },
  {
    id: "3",
    clientName: "Marta Liepa",
    phone: "+371 5555 1234",
    address: "Valdemāra iela 88, Riga, LV-1013",
    date: "2024-01-15",
    time: "16:30",
    status: "confirmed",
    priority: "normal"
  }
];

export const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { toast } = useToast();

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "unconfirmed": return "warning";
      case "confirmed": return "success";
      case "in_route": return "accent";
      case "delivered": return "muted";
      default: return "muted";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "unconfirmed": return Clock;
      case "confirmed": return CheckCircle;
      case "in_route": return Truck;
      case "delivered": return CheckCircle;
      default: return Clock;
    }
  };

  const handleConfirmOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "confirmed" as const }
        : order
    ));
    toast({
      title: "Order Confirmed",
      description: "The delivery order has been confirmed and is ready for route planning.",
    });
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    toast({
      title: "Order Rejected",
      description: "The delivery order has been removed from the system.",
      variant: "destructive",
    });
  };

  const confirmedOrders = orders.filter(order => order.status === "confirmed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="gradient-hero text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Orders Management</CardTitle>
          <CardDescription className="text-primary-foreground/80 text-lg">
            Review and confirm delivery orders from voice calls
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === "unconfirmed").length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-2xl font-bold">{confirmedOrders.length}</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-accent" />
              <div>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === "in_route").length}</p>
                <p className="text-sm text-muted-foreground">In Route</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Route className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{confirmedOrders.length > 0 ? "1" : "0"}</p>
                <p className="text-sm text-muted-foreground">Routes Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="shadow-medium">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Delivery Orders</CardTitle>
            <CardDescription>Manage incoming delivery requests</CardDescription>
          </div>
          <Button 
            variant="accent" 
            disabled={confirmedOrders.length === 0}
            className="flex items-center space-x-2"
          >
            <Route className="w-4 h-4" />
            <span>Plan Route ({confirmedOrders.length})</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.clientName}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone className="w-3 h-3" />
                          <span>{order.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 text-sm max-w-xs">
                          <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{order.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{order.date}</p>
                          <p className="text-muted-foreground">{order.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status) as any} className="flex items-center space-x-1">
                          <StatusIcon className="w-3 h-3" />
                          <span className="capitalize">{order.status.replace('_', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={order.priority === "urgent" ? "destructive" : "secondary"}>
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {order.status === "unconfirmed" && (
                            <>
                              <Button 
                                variant="success" 
                                size="sm"
                                onClick={() => handleConfirmOrder(order.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleRejectOrder(order.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};