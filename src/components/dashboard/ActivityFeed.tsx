import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle, Info, Wrench } from "lucide-react";

interface ActivityFeedProps {
  industry: string;
}

interface ActivityItem {
  id: string;
  type: "info" | "success" | "warning" | "maintenance";
  title: string;
  description: string;
  timestamp: string;
}

export const ActivityFeed = ({ industry }: ActivityFeedProps) => {
  const getActivityData = (industry: string): ActivityItem[] => {
    switch (industry) {
      case "electrical":
        return [
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
        ];
      case "chemical":
        return [
          {
            id: "1",
            type: "success",
            title: "Batch Process Completed",
            description: "Reactor R-101 batch finished successfully",
            timestamp: "3 min ago",
          },
          {
            id: "2",
            type: "warning",
            title: "Temperature Spike",
            description: "Vessel V-205 exceeded safe range briefly",
            timestamp: "8 min ago",
          },
          {
            id: "3",
            type: "maintenance",
            title: "Pump Maintenance",
            description: "P-302 requires bearing replacement",
            timestamp: "15 min ago",
          },
          {
            id: "4",
            type: "info",
            title: "Quality Check Passed",
            description: "All samples within specification",
            timestamp: "22 min ago",
          },
        ];
      default:
        return [
          {
            id: "1",
            type: "success",
            title: "System Update Complete",
            description: "All modules updated successfully",
            timestamp: "1 min ago",
          },
          {
            id: "2",
            type: "warning",
            title: "Performance Alert",
            description: "CPU usage above 85% threshold",
            timestamp: "7 min ago",
          },
          {
            id: "3",
            type: "maintenance",
            title: "Scheduled Maintenance",
            description: "Weekly system maintenance completed",
            timestamp: "20 min ago",
          },
          {
            id: "4",
            type: "info",
            title: "Backup Complete",
            description: "Daily backup finished successfully",
            timestamp: "45 min ago",
          },
        ];
    }
  };

  const activities = getActivityData(industry);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case "maintenance":
        return <Wrench className="h-4 w-4 text-blue-400" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-slate-400" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-400 text-green-400";
      case "warning":
        return "border-yellow-400 text-yellow-400";
      case "maintenance":
        return "border-blue-400 text-blue-400";
      case "info":
      default:
        return "border-slate-400 text-slate-400";
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-300 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium text-white truncate">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs whitespace-nowrap ${getActivityBadge(activity.type)}`}
                  >
                    {activity.type}
                  </Badge>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <button className="w-full text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All Activities →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};