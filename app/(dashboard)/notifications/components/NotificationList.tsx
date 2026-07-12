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
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card 
            key={notification.id} 
            className={`shadow-sm border transition-all duration-200 hover:shadow-md hover:border-blue-100 rounded-xl overflow-hidden group ${
              notification.isUnread ? 'border-blue-100 bg-blue-50/30' : 'border-gray-100 bg-white'
            }`}
        >
          <CardContent className="p-5 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getBgColor(notification.type)} group-hover:scale-105 transition-transform`}>
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0 pt-1">
               <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {notification.title}
                        </h3>
                        {notification.isUnread && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                        )}
                    </div>
                    <span className="text-xs font-medium text-gray-400 shrink-0 whitespace-nowrap">{notification.time}</span>
               </div>
               <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notification.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
