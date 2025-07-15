import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { GaugeChart } from "@/components/dashboard/GaugeChart";
import { LineChart } from "@/components/dashboard/LineChart";
import { MapSection } from "@/components/dashboard/MapSection";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Factory, Zap, FlaskConical, Cpu, Building2, Wrench } from "lucide-react";

const industries = [
  { id: "electrical", name: "Electrical Systems", icon: Zap },
  { id: "chemical", name: "Chemical Processing", icon: FlaskConical },
  { id: "manufacturing", name: "Manufacturing", icon: Factory },
  { id: "automotive", name: "Automotive", icon: Wrench },
  { id: "technology", name: "Technology", icon: Cpu },
  { id: "construction", name: "Construction", icon: Building2 },
];

const Dashboard = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("electrical");

  const getIndustryData = (industry: string) => {
    switch (industry) {
      case "electrical":
        return {
          metrics: [
            { title: "Power Generation", value: "2,847 MW", change: "+12.5%", trend: "up" },
            { title: "Grid Efficiency", value: "94.2%", change: "+2.1%", trend: "up" },
            { title: "Load Factor", value: "78.9%", change: "-1.3%", trend: "down" },
            { title: "Peak Demand", value: "3,156 MW", change: "+5.7%", trend: "up" },
          ],
          gauges: [
            { title: "Voltage", value: 98.5, max: 100, unit: "%" },
            { title: "Frequency", value: 49.95, max: 50, unit: "Hz" },
            { title: "Power Factor", value: 0.92, max: 1, unit: "" },
          ],
        };
      case "chemical":
        return {
          metrics: [
            { title: "Production Rate", value: "1,245 t/h", change: "+8.3%", trend: "up" },
            { title: "Reactor Efficiency", value: "89.7%", change: "+1.8%", trend: "up" },
            { title: "Quality Index", value: "96.4%", change: "+0.5%", trend: "up" },
            { title: "Energy Consumption", value: "2,890 kWh", change: "-3.2%", trend: "down" },
          ],
          gauges: [
            { title: "Temperature", value: 85, max: 100, unit: "°C" },
            { title: "Pressure", value: 12.5, max: 15, unit: "bar" },
            { title: "pH Level", value: 7.2, max: 14, unit: "" },
          ],
        };
      case "manufacturing":
        return {
          metrics: [
            { title: "Production Output", value: "8,542 units", change: "+15.2%", trend: "up" },
            { title: "OEE", value: "87.3%", change: "+4.1%", trend: "up" },
            { title: "Defect Rate", value: "0.23%", change: "-0.05%", trend: "down" },
            { title: "Downtime", value: "2.1 hrs", change: "-1.2 hrs", trend: "down" },
          ],
          gauges: [
            { title: "Efficiency", value: 87, max: 100, unit: "%" },
            { title: "Quality", value: 99.77, max: 100, unit: "%" },
            { title: "Availability", value: 94.2, max: 100, unit: "%" },
          ],
        };
      default:
        return {
          metrics: [
            { title: "Performance", value: "92.4%", change: "+3.7%", trend: "up" },
            { title: "Efficiency", value: "85.6%", change: "+1.9%", trend: "up" },
            { title: "Quality", value: "97.8%", change: "+0.8%", trend: "up" },
            { title: "Output", value: "1,234", change: "+12.3%", trend: "up" },
          ],
          gauges: [
            { title: "Overall", value: 92, max: 100, unit: "%" },
            { title: "Target", value: 85, max: 100, unit: "%" },
            { title: "Status", value: 98, max: 100, unit: "%" },
          ],
        };
    }
  };

  const currentData = getIndustryData(selectedIndustry);
  const currentIndustry = industries.find(i => i.id === selectedIndustry);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {currentIndustry && <currentIndustry.icon className="h-8 w-8 text-blue-400" />}
            <h1 className="text-3xl font-bold">Industrial Analytics Hub</h1>
          </div>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            LIVE
          </Badge>
        </div>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-64 bg-slate-800 border-slate-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {industries.map((industry) => (
              <SelectItem key={industry.id} value={industry.id} className="text-white hover:bg-slate-700">
                <div className="flex items-center gap-2">
                  <industry.icon className="h-4 w-4" />
                  {industry.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Map and Controls */}
        <div className="lg:col-span-1 space-y-6">
          <MapSection industry={selectedIndustry} />
          <ActivityFeed industry={selectedIndustry} />
        </div>

        {/* Right Columns - Metrics and Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {currentData.metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                trend={metric.trend as "up" | "down"}
              />
            ))}
          </div>

          {/* Gauges Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentData.gauges.map((gauge, index) => (
              <GaugeChart
                key={index}
                title={gauge.title}
                value={gauge.value}
                max={gauge.max}
                unit={gauge.unit}
              />
            ))}
          </div>

          {/* Charts Section */}
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">Performance</TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">Trends</TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-slate-700">Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LineChart
                  title="Performance Over Time"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: 80 + Math.random() * 20,
                  }))}
                />
                <LineChart
                  title="Efficiency Metrics"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: 85 + Math.random() * 15,
                  }))}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-6">
              <LineChart
                title="Historical Trends"
                data={Array.from({ length: 30 }, (_, i) => ({
                  time: `Day ${i + 1}`,
                  value: 75 + Math.random() * 25,
                }))}
                height={400}
              />
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2">
                      <li>• Performance indicators show consistent improvement</li>
                      <li>• Efficiency metrics exceed industry standards</li>
                      <li>• Quality control measures are within optimal range</li>
                      <li>• Energy consumption has decreased by 3.2%</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2">
                      <li>• Increase production capacity during peak hours</li>
                      <li>• Optimize maintenance schedules for better efficiency</li>
                      <li>• Implement predictive analytics for quality control</li>
                      <li>• Consider upgrading legacy systems for better performance</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;