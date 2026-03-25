import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddCustomWaterModal } from './AddCustomWaterModal';

interface WaterActionButtonsProps {
  onAddWater: (amount: number) => void;
}

export function WaterActionButtons({ onAddWater }: WaterActionButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickAmounts = [
    { amount: 100, label: '+100ml' },
    { amount: 250, label: '+250ml' },
    { amount: 500, label: '+500ml' },
  ];

  const handleCustomAdd = (amount: number) => {
    onAddWater(amount);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-sky-900 mb-4">Quick Add Water</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {quickAmounts.map((item) => (
            <button
              key={item.amount}
              onClick={() => onAddWater(item.amount)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Custom Amount</span>
          </button>
        </div>
      </div>

      <AddCustomWaterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWater={handleCustomAdd}
      />
    </>
  );
}
