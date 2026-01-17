import React, { useState } from 'react';
import { ArrowLeft, Crown, Trash2, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SubscriptionPlan, PlanFeature } from '../types';

interface EditPlanFormProps {
  plan: SubscriptionPlan;
  onBack: () => void;
  onSave: (updatedPlan: SubscriptionPlan) => void;
}

export const EditPlanForm: React.FC<EditPlanFormProps> = ({ plan, onBack, onSave }) => {
  const [formData, setFormData] = useState<SubscriptionPlan>(plan);
  const [newFeatureText, setNewFeatureText] = useState('');

  const handleRemoveFeature = (id: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f.id !== id)
    });
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    const newFeature: PlanFeature = {
      id: Date.now().toString(),
      text: newFeatureText
    };
    setFormData({
      ...formData,
      features: [...formData.features, newFeature]
    });
    setNewFeatureText('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-gray-600 hover:text-gray-900 -ml-2 hover:bg-transparent px-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Subscriptions
      </Button>

      <Card className="border-gray-200 shadow-sm">
         <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
                <Crown className="w-8 h-8 text-black" strokeWidth={1.5} />
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Edit Subscription Plan</h2>
                    <p className="text-sm text-gray-500">Modify plan details and features</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-base font-medium text-gray-900">Basic Information</h3>
                    <div className="space-y-4">
                         <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">Plan Name</label>
                            <Input 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="border-gray-200"
                            />
                         </div>
                         <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">Monthly Price (€)</label>
                            <Input 
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                className="border-gray-200"
                            />
                         </div>
                    </div>
                </div>

                {/* Plan Features */}
                <div className="space-y-4">
                    <h3 className="text-base font-medium text-gray-900">Plan Features</h3>
                    <div className="space-y-3">
                        {formData.features.map((feature) => (
                            <div key={feature.id} className="flex items-center gap-2">
                                <div className="flex-1 p-3 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white">
                                    {feature.text}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveFeature(feature.id)}
                                    className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                         <Input 
                            placeholder="Add new feature..."
                            value={newFeatureText}
                            onChange={(e) => setNewFeatureText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                            className="flex-1 border-gray-200"
                        />
                         <Button 
                            onClick={handleAddFeature}
                            className="bg-[#1C1C1E] hover:bg-gray-800 text-white gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Feature
                        </Button>
                    </div>
                </div>

                 {/* Current Stats */}
                 <div className="space-y-4 pt-4">
                    <h3 className="text-base font-medium text-gray-900">Current Statistics</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Active Subscribers</p>
                            <p className="text-xl font-medium text-gray-900">{formData.stats.subscribers}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                             <p className="text-xs text-gray-500 mb-1">Monthly Revenue</p>
                             <p className="text-xl font-medium text-gray-900">€{formData.stats.monthlyRevenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-100">
                    <Button 
                        onClick={() => onSave(formData)}
                        className="bg-[#1C1C1E] hover:bg-gray-800 text-white gap-2 px-8 flex-1 sm:flex-none"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </Button>
                     <Button 
                        variant="outline"
                        onClick={onBack}
                        className="border-gray-200 text-gray-700 px-8"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
};
