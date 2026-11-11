'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CustomerVehicle } from '@/data/types';
import {
  Car,
  Bike,
  Plus,
  X,
  Check,
  ShieldCheck,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

interface VehicleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VehicleSelectorModal: React.FC<VehicleSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isTelugu } = useLanguage();
  const { vehicles, activeVehicle, setActiveVehicleId, addVehicle, removeVehicle } = useMarketplace();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState<'bike' | 'car'>('bike');
  const [regNumber, setRegNumber] = useState('');
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'ev'>('petrol');
  const [year, setYear] = useState('2023');

  if (!isOpen) return null;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !regNumber) return;

    addVehicle({
      customerId: 'cust_101',
      make,
      model,
      type,
      year: parseInt(year) || 2023,
      regNumber: regNumber.toUpperCase(),
      fuelType,
      isDefault: true,
    });

    setIsAddingNew(false);
    setMake('');
    setModel('');
    setRegNumber('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              {isTelugu ? 'మీ వాహనాన్ని ఎంచుకోండి' : 'Select Your Vehicle'}
            </h3>
            <p className="text-xs text-slate-500">
              {isTelugu ? 'సేవ కోసం యాక్టివ్ వాహనాన్ని సెట్ చేయండి' : 'Service bookings and loyalty rewards will link to this vehicle'}
            </p>
          </div>
        </div>

        {!isAddingNew ? (
          <div className="space-y-4">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {vehicles.map((v) => {
                const isSelected = activeVehicle?.id === v.id;
                const Icon = v.type === 'car' ? Car : Bike;

                return (
                  <div
                    key={v.id}
                    onClick={() => {
                      setActiveVehicleId(v.id);
                      onClose();
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900">{v.make} {v.model}</span>
                          {isSelected && (
                            <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.2 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 block">
                          {v.regNumber} • {v.fuelType.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                      ) : (
                        vehicles.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVehicle(v.id);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                            title="Delete vehicle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-primary text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isTelugu ? 'కొత్త వాహనాన్ని జోడించండి (+)' : '+ Add Another Vehicle'}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleAddNew} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('bike')}
                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border ${
                  type === 'bike' ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Bike / Scooter</span>
              </button>
              <button
                type="button"
                onClick={() => setType('car')}
                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border ${
                  type === 'car' ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Car / 4-Wheeler</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Make / Brand</label>
                <input
                  type="text"
                  placeholder="Hero / Honda / Hyundai"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl font-medium focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Model</label>
                <input
                  type="text"
                  placeholder="Splendor / Creta"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl font-medium focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Registration Plate Number</label>
              <input
                type="text"
                placeholder="AP-39-ER-2024"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-xl font-mono uppercase font-bold focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-primary text-white text-xs font-bold"
              >
                Save Vehicle
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
