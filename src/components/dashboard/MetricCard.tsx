import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export const MetricCard = ({ title, value, change, trend }: MetricCardProps) => {
  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="text-sm text-slate-400 uppercase tracking-wide">
            {title}
          </div>
          <div className="text-2xl font-bold text-white">
            {value}
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            trend === "up" ? "text-green-400" : "text-red-400"
          }`}>
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};