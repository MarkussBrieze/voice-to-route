import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mic, 
  MicOff, 
  Phone, 
  Play, 
  Upload,
  Loader2,
  CheckCircle,
  User,
  MapPin,
  Clock,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ParsedOrder {
  clientName: string;
  phone?: string;
  address: string;
  date: string;
  time: string;
  notes?: string;
  originalText: string;
}

export const VoiceCapture = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [parsedOrder, setParsedOrder] = useState<ParsedOrder | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const { toast } = useToast();

  // Simulate recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const simulateVoiceProcessing = async (text: string) => {
    setIsProcessing(true);
    setTranscription(text);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock parsed result
    const mockParsedOrder: ParsedOrder = {
      clientName: "Anna Berzina",
      phone: "+371 2234 5678",
      address: "Brīvības iela 123, Riga, LV-1001",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // tomorrow
      time: "10:00",
      notes: "Please call upon arrival.",
      originalText: text
    };

    setParsedOrder(mockParsedOrder);
    setIsProcessing(false);

    toast({
      title: "Order Parsed Successfully",
      description: "New delivery order has been created and added to the orders table.",
    });
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscription("");
    setParsedOrder(null);
    toast({
      title: "Recording Started",
      description: "Speak clearly to capture the delivery order details.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const mockTranscription = "Hi, this is Anna. Please deliver to Brīvības iela 123 in Riga tomorrow at 10 in the morning. My phone number is +371 2234 5678.";
    simulateVoiceProcessing(mockTranscription);
  };

  const handleSimulateCall = () => {
    const mockTranscription = "Hello, this is Jānis from ABC Company. I need a delivery to Elizabetes iela 45, Riga today at 2 PM. You can reach me at +371 9876 5432.";
    simulateVoiceProcessing(mockTranscription);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="gradient-hero text-primary-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Voice Call Capture</CardTitle>
          <CardDescription className="text-primary-foreground/80 text-lg">
            Convert voice calls and audio messages into structured delivery orders
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Voice Recording Section */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5" />
              <span>Live Voice Recording</span>
            </CardTitle>
            <CardDescription>
              Record a voice message or simulate an incoming call
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="relative">
                <Button
                  size="lg"
                  variant={isRecording ? "destructive" : "default"}
                  className={`w-20 h-20 rounded-full ${isRecording ? 'animate-pulse shadow-accent' : 'shadow-medium'}`}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  disabled={isProcessing}
                >
                  {isRecording ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </Button>
                {isRecording && (
                  <div className="absolute -top-2 -right-2">
                    <Badge variant="destructive" className="animate-bounce">
                      {formatTime(recordingTime)}
                    </Badge>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {isRecording ? "Recording... Click to stop" : "Click to start recording"}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSimulateCall}
                disabled={isRecording || isProcessing}
              >
                <Phone className="w-4 h-4 mr-2" />
                Simulate Incoming Call
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                disabled={isRecording || isProcessing}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Audio File
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Processing & Results Section */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>AI Processing Results</span>
            </CardTitle>
            <CardDescription>
              Real-time transcription and order parsing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Transcription */}
            {transcription && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Transcription:</h4>
                <div className="p-3 bg-muted rounded-lg text-sm">
                  {transcription}
                </div>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is parsing the order details...</span>
              </div>
            )}

            {/* Parsed Order */}
            {parsedOrder && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-semibold text-sm">Order Parsed Successfully</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Client:</span>
                    </div>
                    <p className="text-sm ml-6">{parsedOrder.clientName}</p>
                    {parsedOrder.phone && (
                      <p className="text-xs text-muted-foreground ml-6">{parsedOrder.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Address:</span>
                    </div>
                    <p className="text-sm ml-6">{parsedOrder.address}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Date:</span>
                    </div>
                    <p className="text-sm ml-6">{parsedOrder.date}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Time:</span>
                    </div>
                    <p className="text-sm ml-6">{parsedOrder.time}</p>
                  </div>
                </div>

{/*                 <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Time:</span>
                    </div>
                    <p className="text-sm ml-6">{parsedOrder.notes}</p>
                  </div>
                </div> */}


                <Button className="w-full gradient-success text-success-foreground"> {/*TODO: Must dissapear after click*/}
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Add to Orders Table
                </Button>
              </div>
            )}

            {!transcription && !isProcessing && (
              <div className="text-center text-muted-foreground text-sm py-8">
                Start recording or simulate a call to see AI processing in action
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};