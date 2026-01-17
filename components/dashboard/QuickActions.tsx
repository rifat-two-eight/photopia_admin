// components/dashboard/QuickActions.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Shield, DollarSign } from "lucide-react";

const actions = [
  {
    icon: Users,
    label: "Manage Users",
    iconColor: "text-blue-600",
  },
  {
    icon: Shield,
    label: "Moderation Queue",
    iconColor: "text-pink-600",
  },
  {
    icon: DollarSign,
    label: "Transactions",
    iconColor: "text-green-600",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    iconColor: "text-purple-600",
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-gray-900 font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center`}
              >
                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <span className="text-sm font-medium text-gray-900">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}