import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Activity, 
  MapPin, 
  Plus, 
  Upload, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  Info,
  Wrench,
  Zap,
  Car,
  Droplets,
  Thermometer,
  Wind,
  Users,
  Building
} from "lucide-react";

interface KPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: "up" | "down";
  change: number;
  category: string;
  icon: any;
}

interface ActivityItem {
  id: string;
  type: "success" | "warning" | "maintenance" | "info";
  title: string;
  description: string;
  timestamp: string;
}

interface FacilityLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  status: "operational" | "maintenance" | "alert";
  value: string;
}

const SmartCityDashboard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [kpis, setKpis] = useState<KPI[]>([
    { id: "1", name: "Energy Consumption", value: 2847, unit: "MW", trend: "down", change: -5.2, category: "Energy", icon: Zap },
    { id: "2", name: "Traffic Flow", value: 94.2, unit: "%", trend: "up", change: 2.1, category: "Transport", icon: Car },
    { id: "3", name: "Water Usage", value: 78.9, unit: "ML", trend: "down", change: -1.3, category: "Utilities", icon: Droplets },
    { id: "4", name: "Air Quality", value: 156, unit: "AQI", trend: "up", change: 5.7, category: "Environment", icon: Wind },
    { id: "5", name: "Population", value: 1.2, unit: "M", trend: "up", change: 0.8, category: "Demographics", icon: Users },
    { id: "6", name: "Building Permits", value: 342, unit: "", trend: "up", change: 12.3, category: "Development", icon: Building },
  ]);

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "success",
      title: "Grid Synchronization Complete",
      description: "All substations successfully synchronized",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      type: "warning",
      title: "Load Imbalance Detected",
      description: "Phase C showing 15% higher load",
      timestamp: "5 min ago",
    },
    {
      id: "3",
      type: "maintenance",
      title: "Transformer Maintenance",
      description: "Unit T-204 scheduled for routine check",
      timestamp: "12 min ago",
    },
    {
      id: "4",
      type: "info",
      title: "Peak Demand Forecast",
      description: "Expected 3.2 GW demand at 18:00",
      timestamp: "25 min ago",
    },
  ]);

  const [facilities, setFacilities] = useState<FacilityLocation[]>([
    { id: "1", name: "Power Plant A", x: 20, y: 30, status: "operational", value: "2,847 MW" },
    { id: "2", name: "Water Treatment", x: 60, y: 20, status: "maintenance", value: "456 ML" },
    { id: "3", name: "Traffic Hub", x: 40, y: 70, status: "operational", value: "94.2%" },
    { id: "4", name: "Air Monitor", x: 80, y: 50, status: "alert", value: "156 AQI" },
  ]);

  const [performanceData, setPerformanceData] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: 80 + Math.random() * 20,
    }))
  );

  const [isAddKpiOpen, setIsAddKpiOpen] = useState(false);
  const [newKpi, setNewKpi] = useState({
    name: "",
    value: "",
    unit: "",
    category: "",
  });

  const dashboardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for gradient background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dashboardRef.current) {
        const rect = dashboardRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const dashboard = dashboardRef.current;
    if (dashboard) {
      dashboard.addEventListener("mousemove", handleMouseMove);
      return () => dashboard.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        value: kpi.value + (Math.random() - 0.5) * (kpi.value * 0.02),
        change: (Math.random() - 0.5) * 10,
        trend: Math.random() > 0.5 ? "up" : "down",
      })));

      setPerformanceData(prev => [
        ...prev.slice(1),
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: 80 + Math.random() * 20,
        }
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />;
      case "maintenance":
        return <Wrench className="h-4 w-4 text-blue-400 flex-shrink-0" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-slate-400 flex-shrink-0" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-400 text-green-400 bg-green-400/10";
      case "warning":
        return "border-yellow-400 text-yellow-400 bg-yellow-400/10";
      case "maintenance":
        return "border-blue-400 text-blue-400 bg-blue-400/10";
      case "info":
      default:
        return "border-slate-400 text-slate-400 bg-slate-400/10";
    }
  };

  const getFacilityStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-400 border-green-400";
      case "maintenance":
        return "bg-yellow-400 border-yellow-400";
      case "alert":
        return "bg-red-400 border-red-400";
      default:
        return "bg-slate-400 border-slate-400";
    }
  };

  const handleAddKpi = () => {
    if (newKpi.name && newKpi.value && newKpi.unit && newKpi.category) {
      const kpi: KPI = {
        id: Date.now().toString(),
        name: newKpi.name,
        value: parseFloat(newKpi.value),
        unit: newKpi.unit,
        trend: "up",
        change: 0,
        category: newKpi.category,
        icon: TrendingUp,
      };
      setKpis(prev => [...prev, kpi]);
      setNewKpi({ name: "", value: "", unit: "", category: "" });
      setIsAddKpiOpen(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          let data;
          
          if (file.name.endsWith('.json')) {
            data = JSON.parse(content);
          } else if (file.name.endsWith('.csv')) {
            const lines = content.split('\n');
            const headers = lines[0].split(',');
            data = lines.slice(1).map(line => {
              const values = line.split(',');
              return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index]?.trim();
                return obj;
              }, {} as any);
            });
          }
          
          console.log('Uploaded data:', data);
          // Process the uploaded data here
        } catch (error) {
          console.error('Error parsing file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div 
      ref={dashboardRef}
      className="min-h-screen bg-slate-950 text-white relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(147, 51, 234, 0.1) 25%, 
            rgba(236, 72, 153, 0.05) 50%, 
            transparent 70%
          ),
          linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
        `,
        transition: 'background 0.3s ease-out',
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Smart City Dashboard
                </h1>
                <p className="text-sm text-slate-400">Real-time city analytics</p>
              </div>
              <Badge variant="outline" className="text-green-400 border-green-400 bg-green-400/10 animate-pulse">
                LIVE
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Dialog open={isAddKpiOpen} onOpenChange={setIsAddKpiOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 backdrop-blur-sm transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add KPI
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add New KPI</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300">Name</Label>
                      <Input
                        id="name"
                        value={newKpi.name}
                        onChange={(e) => setNewKpi(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-slate-800/50 border-slate-600 text-white"
                        placeholder="e.g., Air Quality Index"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="value" className="text-slate-300">Value</Label>
                        <Input
                          id="value"
                          type="number"
                          value={newKpi.value}
                          onChange={(e) => setNewKpi(prev => ({ ...prev, value: e.target.value }))}
                          className="bg-slate-800/50 border-slate-600 text-white"
                          placeholder="123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit" className="text-slate-300">Unit</Label>
                        <Input
                          id="unit"
                          value={newKpi.unit}
                          onChange={(e) => setNewKpi(prev => ({ ...prev, unit: e.target.value }))}
                          className="bg-slate-800/50 border-slate-600 text-white"
                          placeholder="AQI"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-slate-300">Category</Label>
                      <Select value={newKpi.category} onValueChange={(value) => setNewKpi(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="Energy">Energy</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Demographics">Demographics</SelectItem>
                          <SelectItem value="Development">Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddKpi} className="w-full bg-blue-600 hover:bg-blue-700">
                      Add KPI
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <div className="relative">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 backdrop-blur-sm transition-all duration-300">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {kpis.map((kpi) => (
            <Card key={kpi.id} className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300 rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className="h-5 w-5 text-blue-400" />
                  <div className={`flex items-center gap-1 text-sm ${
                    kpi.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}>
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(kpi.change).toFixed(1)}%
                  </div>
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wide mb-1 truncate">
                  {kpi.name}
                </div>
                <div className="text-xl font-bold text-white">
                  {kpi.value.toFixed(kpi.unit === "%" ? 1 : 0)}{kpi.unit}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed - Fixed overflow issues */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 rounded-2xl h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-slate-300 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-3 p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium text-white truncate flex-1">
                          {activity.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs whitespace-nowrap flex-shrink-0 ${getActivityBadgeColor(activity.type)}`}
                        >
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="text-xs text-slate-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-3 border-t border-slate-700/50">
                  <button className="w-full text-sm text-blue-400 hover:text-blue-300 transition-colors py-2 rounded-lg hover:bg-slate-700/30">
                    View All Activities →
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Facility Locations - Fixed bounds and padding */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-300 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Facility Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-slate-900/50 rounded-xl p-6 mb-4 overflow-hidden" style={{ height: "300px" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-900/50 rounded-xl"></div>
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-4 opacity-20">
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
                  
                  {/* Facility points - Properly bounded */}
                  {facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className={`absolute w-4 h-4 rounded-full border-2 ${getFacilityStatusColor(facility.status)} animate-pulse cursor-pointer group`}
                      style={{
                        left: `calc(${Math.max(5, Math.min(95, facility.x))}% - 8px)`,
                        top: `calc(${Math.max(5, Math.min(95, facility.y))}% - 8px)`,
                      }}
                    >
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800/95 backdrop-blur-sm p-2 rounded-lg shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <div className="font-medium text-white">{facility.name}</div>
                        <div className="text-slate-400">{facility.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Facility list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getFacilityStatusColor(facility.status)}`} />
                        <span className="text-sm text-white truncate">{facility.name}</span>
                      </div>
                      <div className="text-sm text-slate-300 flex-shrink-0">{facility.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart - Fixed label overlap */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-slate-300">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative" style={{ height: "300px" }}>
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[20, 40, 60, 80].map(y => (
                      <line
                        key={y}
                        x1="5"
                        y1={y}
                        x2="95"
                        y2={y}
                        stroke="rgb(51 65 85)"
                        strokeWidth="0.2"
                      />
                    ))}
                    
                    {/* Performance line */}
                    <path
                      d={performanceData.map((point, index) => {
                        const x = 5 + (index / (performanceData.length - 1)) * 85; // 5% left margin, 85% width
                        const y = 90 - ((point.value - 60) / 40) * 80; // 10% margins top/bottom
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="rgb(34 197 94)"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Area under curve */}
                    <path
                      d={`${performanceData.map((point, index) => {
                        const x = 5 + (index / (performanceData.length - 1)) * 85;
                        const y = 90 - ((point.value - 60) / 40) * 80;
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')} L 90 90 L 5 90 Z`}
                      fill="url(#gradient)"
                      opacity="0.3"
                    />
                    
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Current value label - Positioned to avoid overlap */}
                  <div className="absolute top-4 right-4 text-right bg-slate-800/80 backdrop-blur-sm rounded-lg p-2">
                    <div className="text-lg font-bold text-white">
                      {performanceData[performanceData.length - 1]?.value.toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-400">
                      Current
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCityDashboard;