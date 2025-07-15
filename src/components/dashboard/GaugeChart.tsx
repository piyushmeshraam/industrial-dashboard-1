import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GaugeChartProps {
  title: string;
  value: number;
  max: number;
  unit: string;
}

export const GaugeChart = ({ title, value, max, unit }: GaugeChartProps) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  const getColor = (percent: number) => {
    if (percent >= 90) return "stroke-green-400";
    if (percent >= 70) return "stroke-yellow-400";
    if (percent >= 50) return "stroke-orange-400";
    return "stroke-red-400";
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-slate-300 text-sm uppercase tracking-wide">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgb(51 65 85)"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className={`transition-all duration-1000 ${getColor(percentage)}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-white">
              {value}{unit}
            </div>
            <div className="text-sm text-slate-400">
              {percentage.toFixed(1)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};