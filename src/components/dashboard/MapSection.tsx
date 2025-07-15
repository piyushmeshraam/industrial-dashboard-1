import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface MapSectionProps {
  industry: string;
}

export const MapSection = ({ industry }: MapSectionProps) => {
  const getLocationData = (industry: string) => {
    switch (industry) {
      case "electrical":
        return [
          { name: "Power Plant A", status: "operational", lat: 40, lng: -74, value: "2,847 MW" },
          { name: "Substation B", status: "maintenance", lat: 41, lng: -73, value: "456 MW" },
          { name: "Grid Node C", status: "operational", lat: 39, lng: -75, value: "1,234 MW" },
          { name: "Transformer D", status: "alert", lat: 42, lng: -72, value: "789 MW" },
        ];
      case "chemical":
        return [
          { name: "Reactor Unit 1", status: "operational", lat: 40, lng: -74, value: "89.7%" },
          { name: "Distillation Tower", status: "operational", lat: 41, lng: -73, value: "94.2%" },
          { name: "Storage Tank A", status: "maintenance", lat: 39, lng: -75, value: "76.3%" },
          { name: "Processing Unit B", status: "alert", lat: 42, lng: -72, value: "82.1%" },
        ];
      default:
        return [
          { name: "Facility A", status: "operational", lat: 40, lng: -74, value: "98.5%" },
          { name: "Facility B", status: "operational", lat: 41, lng: -73, value: "94.2%" },
          { name: "Facility C", status: "maintenance", lat: 39, lng: -75, value: "87.1%" },
          { name: "Facility D", status: "alert", lat: 42, lng: -72, value: "91.3%" },
        ];
    }
  };

  const locations = getLocationData(industry);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "maintenance":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <MapPin className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "border-green-400 bg-green-400/20";
      case "maintenance":
        return "border-yellow-400 bg-yellow-400/20";
      case "alert":
        return "border-red-400 bg-red-400/20";
      default:
        return "border-slate-400 bg-slate-400/20";
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-300 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Facility Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simplified map visualization */}
        <div className="relative bg-slate-900 rounded-lg p-4 mb-4" style={{ height: "200px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg opacity-50"></div>
          
          {/* Simulated map points */}
          {locations.map((location, index) => (
            <div
              key={index}
              className={`absolute w-3 h-3 rounded-full border-2 ${getStatusColor(location.status)} animate-pulse`}
              style={{
                top: `${20 + index * 35}%`,
                left: `${15 + index * 20}%`,
              }}
            >
              <div className="absolute top-4 left-4 bg-slate-800 p-2 rounded shadow-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                <div className="font-medium">{location.name}</div>
                <div className="text-slate-400">{location.value}</div>
              </div>
            </div>
          ))}
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                <div
                  className="absolute border-l border-slate-600"
                  style={{ left: `${i * 10}%`, height: "100%" }}
                />
                <div
                  className="absolute border-t border-slate-600"
                  style={{ top: `${i * 10}%`, width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Location list */}
        <div className="space-y-2">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(location.status)}
                <span className="text-sm text-white">{location.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-300">{location.value}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    location.status === "operational"
                      ? "border-green-400 text-green-400"
                      : location.status === "maintenance"
                      ? "border-yellow-400 text-yellow-400"
                      : "border-red-400 text-red-400"
                  }`}
                >
                  {location.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};