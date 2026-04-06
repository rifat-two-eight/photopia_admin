import { User, Bell, AlertCircle, Crown, CreditCard, Flag, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { NotificationItem } from '../types';

interface NotificationListProps {
  notifications: NotificationItem[];
}

const getIcon = (type: NotificationItem['type']) => {
  switch (type) {
    case 'user': return <User className="w-5 h-5 text-blue-600" />;
    case 'report': return <Flag className="w-5 h-5 text-red-600" />;
    case 'payment': return <CreditCard className="w-5 h-5 text-emerald-600" />;
    case 'subscription': return <Crown className="w-5 h-5 text-purple-600 hover:text-purple-600" />;
    case 'alert': return <AlertCircle className="w-5 h-5 text-red-600" />;
    case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    default: return <Bell className="w-5 h-5 text-gray-600" />;
  }
};

const getBgColor = (type: NotificationItem['type']) => {
    switch (type) {
        case 'user': return 'bg-blue-50';
        case 'report': return 'bg-red-50';
        case 'payment': return 'bg-emerald-50';
        case 'subscription': return 'bg-purple-50'; // Using purple for Subscription
        case 'alert': return 'bg-red-50';
        case 'success': return 'bg-emerald-50';
        default: return 'bg-gray-50';
    }
};

export const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card 
            key={notification.id} 
            className="shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
        >
          <CardContent className="p-4 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0 pt-0.5">
               <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-gray-900">
                        {notification.title}
                    </h3>
               </div>
               <p className="text-sm text-gray-600 mt-0.5">{notification.description}</p>
               <p className="text-xs text-gray-400 mt-1.5">{notification.time}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
