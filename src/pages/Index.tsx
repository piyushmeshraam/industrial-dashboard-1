import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BarChart3, Factory, Zap, FlaskConical, Cpu, Building2, Wrench } from "lucide-react";

const Index = () => {
  const industries = [
    { id: "electrical", name: "Electrical Systems", icon: Zap, description: "Power generation, grid management, and electrical infrastructure monitoring" },
    { id: "chemical", name: "Chemical Processing", icon: FlaskConical, description: "Reactor monitoring, quality control, and process optimization" },
    { id: "manufacturing", name: "Manufacturing", icon: Factory, description: "Production line efficiency, OEE tracking, and quality metrics" },
    { id: "automotive", name: "Automotive", icon: Wrench, description: "Vehicle diagnostics, assembly line monitoring, and quality assurance" },
    { id: "technology", name: "Technology", icon: Cpu, description: "System performance, uptime monitoring, and infrastructure analytics" },
    { id: "construction", name: "Construction", icon: Building2, description: "Project tracking, safety monitoring, and resource management" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BarChart3 className="h-12 w-12 text-blue-400" />
            <h1 className="text-5xl font-bold text-white">Industrial Analytics Hub</h1>
          </div>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Comprehensive monitoring and analytics platform for various industrial sectors. 
            Track KPIs, monitor performance, and gain insights across different industries.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Launch Dashboard
            </Button>
          </Link>
          <Link to="/smart-city">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 ml-4">
              Smart City Dashboard
            </Button>
          </Link>
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {industries.map((industry) => (
            <Card key={industry.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <industry.icon className="h-8 w-8 text-blue-400" />
                  <CardTitle className="text-white">{industry.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  {industry.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Analytics</h3>
              <p className="text-slate-400">Live monitoring of key performance indicators</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Factory className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Multi-Industry Support</h3>
              <p className="text-slate-400">Customized dashboards for different sectors</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Performance Tracking</h3>
              <p className="text-slate-400">Comprehensive metrics and trend analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Cpu className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Insights</h3>
              <p className="text-slate-400">AI-powered recommendations and alerts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
