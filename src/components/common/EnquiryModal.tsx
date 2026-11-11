'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import {
  X,
  Send,
  Phone,
  User,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Car,
  Bike,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: {
    id: string;
    type: 'provider' | 'business' | 'property';
    name: string;
    villageId: string;
    villageName: string;
    defaultService?: string;
  };
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, target }) => {
  const { t, isTelugu } = useLanguage();
  const { addEnquiry, vehicles, activeVehicle } = useMarketplace();
  const { currentUser } = useAuth();

  const [customerName, setCustomerName] = useState(currentUser?.name || 'Ravi Teja');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '9848111222');
  const [selectedVehicleId, setSelectedVehicleId] = useState(activeVehicle?.id || vehicles[0]?.id || 'veh_splendor');
  const [customVehicle, setCustomVehicle] = useState('');
  const [serviceRequested, setServiceRequested] = useState(target.defaultService || 'Standard Periodic Service');
  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [preferredTime, setPreferredTime] = useState('Morning (9:00 AM - 12:00 PM)');
  const [locationType, setLocationType] = useState<'workshop' | 'doorstep'>('workshop');
  const [address, setAddress] = useState('Door 2-45, Main Road, Kaza');
  const [message, setMessage] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState('');

  if (!isOpen) return null;

  const currentVeh = vehicles.find((v) => v.id === selectedVehicleId);
  const vehicleText = currentVeh ? `${currentVeh.make} ${currentVeh.model} (${currentVeh.regNumber})` : (customVehicle || 'Hero Splendor Plus (AP-39-ER-2024)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!customerName.trim()) {
      setError(isTelugu ? 'దయచేసి మీ పేరు నమోదు చేయండి' : 'Please enter your full name');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError(isTelugu ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి' : 'Please enter a valid 10-digit mobile number');
      return;
    }

    const newId = addEnquiry({
      customerId: currentUser?.id || 'cust_101',
      customerName,
      customerPhone: cleanPhone,
      targetType: target.type,
      targetId: target.id,
      targetName: target.name,
      villageId: target.villageId,
      villageName: target.villageName,
      serviceRequested: serviceRequested || (isTelugu ? 'జనరల్ సర్వీస్' : 'General Vehicle Service'),
      bookingDate,
      preferredTime,
      location: locationType === 'doorstep' ? address : `At Workshop (${target.name})`,
      message: message || (isTelugu ? 'వాహనం చెక్ చేసి సర్వీస్ చేయగలరు' : 'Please check vehicle condition and perform service'),
      urgent,
      vehicleId: selectedVehicleId,
      vehicleDetails: vehicleText,
      amount: '₹450 est.',
    });

    setCreatedBookingId(newId);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-indigo-900 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                Automotive Booking
              </span>
              <span className="text-xs text-white/80">{target.villageName}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              {isTelugu ? 'వాహన సర్వీస్ బుకింగ్' : 'Book Vehicle Service'}
            </h3>
            <p className="text-white/80 text-xs mt-0.5 font-medium">
              Workshop: {target.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3 my-auto">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Booking ID: #{createdBookingId}
            </span>
            <h4 className="text-lg font-black text-slate-900">
              {isTelugu ? 'సర్వీస్ బుకింగ్ విజయవంతమైంది!' : 'Vehicle Service Booked Successfully!'}
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {target.name} has been notified and scheduled your appointment. Once completed by the provider, it will automatically count toward your **Monthly 10-Service Reward counter**!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 overflow-y-auto flex-1">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Vehicle Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-primary" />
                <span>{isTelugu ? 'వాహనం ఎంచుకోండి' : 'Select Vehicle'} *</span>
              </label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.type === 'car' ? '🚗' : '🏍️'} {v.make} {v.model} ({v.regNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-primary" />
                <span>{isTelugu ? 'సేవ రకం' : 'Service Requested'} *</span>
              </label>
              <input
                type="text"
                value={serviceRequested}
                onChange={(e) => setServiceRequested(e.target.value)}
                placeholder="Standard Periodic Service / Oil Change / Water Wash"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            {/* Step 3: Date & Preferred Time */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Booking Date
                </label>
                <select
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Day After Tomorrow">Day After Tomorrow</option>
                  <option value="This Weekend">This Weekend</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Time Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
                >
                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9AM - 12PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1PM - 4PM)</option>
                  <option value="Evening (4:00 PM - 7:00 PM)">Evening (4PM - 7PM)</option>
                </select>
              </div>
            </div>

            {/* Service Location: Workshop vs Doorstep */}
            <div>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setLocationType('workshop')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    locationType === 'workshop'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Visit Workshop
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('doorstep')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    locationType === 'doorstep'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Doorstep Pickup / Home
                </button>
              </div>

              {locationType === 'doorstep' && (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Door No, Street, Village"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              )}
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  required
                />
              </div>
            </div>

            {/* Reward Program notice */}
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Completing this service counts towards your **Monthly 10-Service Reward Program** (unlock Free Bike Wash, 1L Engine Oil, or AC Clean).
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Book Appointment</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
