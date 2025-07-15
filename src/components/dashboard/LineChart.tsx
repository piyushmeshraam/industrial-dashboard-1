import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LineChartProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  height?: number;
}

export const LineChart = ({ title, data, height = 200 }: LineChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  const getY = (value: number) => {
    return height - ((value - minValue) / range) * (height - 40);
  };

  const pathData = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxValue - point.value) / range) * 100;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative" style={{ height: `${height}px` }}>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[20, 40, 60, 80].map(y => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="rgb(51 65 85)"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Area under curve */}
            <path
              d={`${pathData} L 100 100 L 0 100 Z`}
              fill="url(#gradient)"
              opacity="0.3"
            />
            
            {/* Line */}
            <path
              d={pathData}
              fill="none"
              stroke="rgb(34 197 94)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Value labels */}
          <div className="absolute top-2 right-2 text-right">
            <div className="text-lg font-bold text-white">
              {data[data.length - 1]?.value.toFixed(1)}
            </div>
            <div className="text-sm text-slate-400">
              Current
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};