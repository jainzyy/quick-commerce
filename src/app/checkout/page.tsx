'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useCartStore } from '@/store/cartStore';
import { useAppStore } from '@/store/appStore';
import { trackEvent } from '@/analytics/tracker';
import dynamic from 'next/dynamic';

const DeliveryMap = dynamic(() => import('@/components/map/DeliveryMap'), { ssr: false });
import { SAMPLE_LOCATIONS, RECOMMENDATION_WEIGHTS } from '@/config/delivery';
import { MapPin, CheckCircle, Navigation, AlertCircle, Clock, Zap, Leaf, Truck, Shield, Cloud, Car } from 'lucide-react';

type Step = 'ADDRESS' | 'DELIVERY' | 'PAYMENT' | 'CONFIRMATION';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, getCartWeight, getCartVolume, clearCart, getItemCount } = useCartStore();
  const { deliveryLocation, setDeliveryLocation, deliveryPreference, setDeliveryPreference, sessionId } = useAppStore();
  
  const [currentStep, setCurrentStep] = useState<Step>('ADDRESS');
  const [isCalculating, setIsCalculating] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<any>(null);
  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Redirect if cart is empty (unless on confirmation step)
  useEffect(() => {
    if (items.length === 0 && currentStep !== 'CONFIRMATION') {
      router.push('/cart');
    }
  }, [items.length, currentStep, router]);

  const handleLocationSelect = (loc: any) => {
    setDeliveryLocation({ lat: loc.lat, lon: loc.lon, address: loc.name });
    trackEvent('address_selected', { address: loc.name, distance_approx: loc.distanceApprox });
  };

  const calculateDelivery = async () => {
    if (!deliveryLocation) return;
    
    setIsCalculating(true);
    try {
      const currentPreference = useAppStore.getState().deliveryPreference;
      const response = await fetch('/api/delivery/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: items,
          orderValue: getCartTotal(),
          customerLocation: deliveryLocation,
          preference: currentPreference,
          demoOverrides: useAppStore.getState().demoOverrides
        })
      });
      
      const data = await response.json();
      
      if (data.serviceable) {
        setDeliveryResult(data);
        if (data.recommendation?.modeId) {
          setSelectedModeId(data.recommendation.modeId);
        }
        setCurrentStep('DELIVERY');
        trackEvent('delivery_modes_viewed', { 
          modes_count: data.options?.length || 0,
          recommended_mode: data.recommendation?.modeId
        });
      } else {
        alert('Sorry, this location is outside our 15km service area.');
      }
    } catch (error) {
      console.error('Calculation failed', error);
      alert('Failed to calculate delivery options. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleModeSelection = (modeId: string) => {
    setSelectedModeId(modeId);
    trackEvent('delivery_mode_selected', { mode_id: modeId });
  };

  const handlePreferenceChange = (pref: any) => {
    setDeliveryPreference(pref);
    trackEvent('preference_selected', { preference: pref });
    // Recalculate immediately with new preference
    if (deliveryResult) {
      calculateDelivery();
    }
  };

  const processPayment = async () => {
    if (!selectedModeId || !deliveryResult) return;
    
    const selectedOption = deliveryResult.options.find((o: any) => `${o.mode}-${o.subType || 'default'}` === selectedModeId);
    if (!selectedOption) return;

    setIsProcessingPayment(true);
    trackEvent('payment_initiated', { mode: selectedModeId, amount: getCartTotal() + selectedOption.customerFee });
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalValue: getCartTotal(),
          deliveryFee: selectedOption.customerFee,
          operatingCost: selectedOption.internalCost,
          deliveryMode: selectedOption.mode,
          droneType: selectedOption.subType,
          estimatedEta: selectedOption.etaMinutes,
          estimatedCo2: selectedOption.carbonEmissionsGrams,
          distanceKm: deliveryResult.distanceKm,
          customerLat: deliveryLocation?.lat,
          customerLong: deliveryLocation?.lon,
          weatherCondition: deliveryResult.weather?.condition,
          trafficCondition: deliveryResult.trafficState,
          customerPreference: useAppStore.getState().deliveryPreference,
          sessionId
        })
      });
      
      const orderData = await response.json();
      setOrderId(orderData.orderId);
      
      trackEvent('order_completed', { 
        order_id: orderData.orderId,
        delivery_mode: selectedOption.mode,
        drone_type: selectedOption.subType,
        estimated_eta: selectedOption.etaMinutes,
        estimated_co2: selectedOption.carbonEmissionsGrams,
        cart_value: getCartTotal(),
        customer_preference: useAppStore.getState().deliveryPreference,
        estimated_operating_cost: selectedOption.internalCost,
        delivery_cost: selectedOption.customerFee
      });
      
      clearCart();
      setCurrentStep('CONFIRMATION');
    } catch (error) {
      console.error('Order creation failed', error);
      alert('Payment succeeded but order creation failed. Please contact support.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          
          {['ADDRESS', 'DELIVERY', 'PAYMENT', 'CONFIRMATION'].map((step, index) => {
            const steps = ['ADDRESS', 'DELIVERY', 'PAYMENT', 'CONFIRMATION'];
            const currentIndex = steps.indexOf(currentStep);
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 
                  ${isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' : 
                    isCurrent ? 'bg-white border-indigo-600 text-indigo-600' : 
                    'bg-white border-gray-300 text-gray-400'}`}
                >
                  {isCompleted ? <CheckCircle size={16} /> : index + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block
                  ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: ADDRESS */}
        {currentStep === 'ADDRESS' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Where are we delivering?</h2>
              <p className="text-gray-600 mb-6">Select a demo location below. Our dark store is located in Andheri East, Mumbai.</p>
              
              <div className="space-y-3">
                {SAMPLE_LOCATIONS.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => handleLocationSelect(loc)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4
                      ${deliveryLocation?.address === loc.name 
                        ? 'border-indigo-600 bg-indigo-50' 
                        : 'border-gray-200 bg-white hover:border-indigo-300'}`}
                  >
                    <div className={`p-2 rounded-full ${deliveryLocation?.address === loc.name ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                      <MapPin size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{loc.name}</div>
                      <div className="text-sm text-gray-500">Approx. {loc.distanceApprox} km from store</div>
                    </div>
                    {loc.distanceApprox > 5 && (
                      <div className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">Out of zone</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Delivery Guidelines</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2"><CheckCircle size={18} className="text-green-500 flex-shrink-0" /> Service radius is exactly 15km from the dark store.</li>
                  <li className="flex gap-2"><CheckCircle size={18} className="text-green-500 flex-shrink-0" /> Real route distance is calculated via OSRM.</li>
                  <li className="flex gap-2"><CheckCircle size={18} className="text-green-500 flex-shrink-0" /> Weather and traffic will be fetched automatically.</li>
                </ul>
                
                <button
                  onClick={calculateDelivery}
                  disabled={!deliveryLocation || isCalculating}
                  className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition"
                >
                  {isCalculating ? (
                    <>Calculating Options...</>
                  ) : (
                    <>Find Delivery Options <Navigation size={18} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DELIVERY SELECTION */}
        {currentStep === 'DELIVERY' && deliveryResult && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
              <div>
                <h2 className="text-2xl font-bold mb-2">Choose your delivery mode</h2>
                <div className="flex gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {deliveryResult.distanceKm?.toFixed(1) || 0} km route</span>
                  <span className="flex items-center gap-1"><Cloud size={14} /> {deliveryResult.weather?.condition}</span>
                  <span className="flex items-center gap-1"><Car size={14} /> {deliveryResult.trafficState} Traffic</span>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentStep('ADDRESS')}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Change Address
              </button>
            </div>

            {/* Recommendation Engine Banner */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={100} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-indigo-800 font-bold mb-4 flex items-center gap-2">
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">AI RECOMMENDED</span>
                  Why we suggest this
                </h3>
                
                <div className="mb-4">
                  <p className="text-gray-700 font-medium">
                    {deliveryResult.recommendation?.explanation}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mr-2 self-center">Optimize for:</span>
                  {Object.keys(RECOMMENDATION_WEIGHTS).map((pref) => (
                    <button
                      key={pref}
                      onClick={() => handlePreferenceChange(pref)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition
                        ${deliveryPreference === pref 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'}`}
                    >
                      {pref.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Options Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliveryResult.options?.map((option: any, index: number) => {
                const optionId = `${option.mode}-${option.subType || 'default'}`;
                const isSelected = selectedModeId === optionId;
                const isRecommended = deliveryResult.recommendation?.mode === option.mode && deliveryResult.recommendation?.subType === option.subType;
                
                // Determine icon based on mode
                let Icon = Truck;
                if (option.mode === 'EV') Icon = Leaf;
                if (option.mode === 'DRONE') Icon = Navigation;

                return (
                  <div 
                    key={index}
                    onClick={() => handleModeSelection(optionId)}
                    className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200 flex flex-col
                      ${isSelected 
                        ? 'border-indigo-600 shadow-[0_0_0_4px_rgba(79,70,229,0.1)] bg-white' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}`}
                  >
                    {isRecommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Recommended
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={18} className={option.mode === 'EV' ? 'text-green-500' : 'text-indigo-600'} />
                          <h3 className="font-bold text-lg">{option.mode === 'ICE' ? 'Standard Delivery' : option.mode === 'EV' ? 'Eco Delivery' : 'Sky Delivery'}</h3>
                        </div>
                        {option.subType && (
                          <div className="text-xs font-semibold text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">
                            {option.subType} Class Drone
                          </div>
                        )}
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div>
                        <div className="text-3xl font-extrabold text-indigo-600 leading-none">
                          {Math.round(option.etaMinutes || 0)} <span className="text-lg font-bold">MINS</span>
                        </div>
                        <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Delivery Time</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold leading-none">
                          {option.customerFee === 0 ? <span className="text-green-500">FREE</span> : `₹${Math.round(option.customerFee)}`}
                        </div>
                        <div className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">Delivery Fee</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-1">
                        <Leaf size={14} className={option.mode === 'ICE' ? 'text-gray-400' : 'text-green-500'} /> 
                        {Math.round(option.carbonEmissionsGrams || 0)}g CO₂ emissions
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Shield size={14} className="text-blue-500" /> 
                        {Math.round((option.reliabilityScore || 0) * 100)}% Reliability score
                      </div>
                    </div>
                    
                  </div>
                );
              })}
            </div>
            
            {/* Ineligible Modes */}
            {(deliveryResult.ineligibleModes?.length || 0) > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-bold text-gray-500 mb-4 text-sm uppercase tracking-wider">Unavailable Options</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {deliveryResult.ineligibleModes.map((mode: any, i: number) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-70">
                      <h4 className="font-bold text-gray-600 mb-2">{mode.mode}</h4>
                      <ul className="text-xs text-red-600 space-y-1">
                        {mode.reasons.map((r: string, idx: number) => (
                          <li key={idx} className="flex gap-1 items-start">
                            <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
              <div className="container mx-auto max-w-5xl flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Cart Total</div>
                  <div className="font-bold text-lg">₹{getCartTotal().toFixed(2)}</div>
                </div>
                
                <button
                  onClick={() => setCurrentStep('PAYMENT')}
                  disabled={!selectedModeId}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {currentStep === 'PAYMENT' && deliveryResult && selectedModeId && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Payment Simulation</h2>
            
            <div className="bg-white rounded-2xl border p-6 mb-6">
              <h3 className="font-bold border-b pb-2 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({getItemCount()})</span>
                  <span className="font-medium">₹{getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Delivery Fee 
                    <span className="ml-1 text-xs bg-gray-100 px-1 rounded">
                      {deliveryResult.options.find((o:any)=>`${o.mode}-${o.subType || 'default'}`===selectedModeId)?.mode}
                    </span>
                  </span>
                  <span className="font-medium">
                    ₹{deliveryResult.options.find((o:any)=>`${o.mode}-${o.subType || 'default'}`===selectedModeId)?.customerFee?.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-indigo-600">
                  ₹{(getCartTotal() + (deliveryResult.options.find((o:any)=>`${o.mode}-${o.subType || 'default'}`===selectedModeId)?.customerFee || 0)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={processPayment}
                disabled={isProcessingPayment}
                className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex justify-center items-center gap-2 transition disabled:opacity-70"
              >
                {isProcessingPayment ? 'Processing...' : 'Pay with UPI (Demo)'}
              </button>
              <button
                onClick={processPayment}
                disabled={isProcessingPayment}
                className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition disabled:opacity-70"
              >
                Pay on Delivery
              </button>
            </div>
            
            <div className="text-center mt-6">
              <button 
                onClick={() => setCurrentStep('DELIVERY')}
                className="text-sm font-medium text-gray-500 hover:text-gray-800"
              >
                ← Back to Delivery Options
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {currentStep === 'CONFIRMATION' && (
          <div className="max-w-md mx-auto text-center py-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">Your order #{orderId} has been successfully placed.</p>
            
            {(() => {
              const selectedOption = deliveryResult?.options.find((o:any)=>`${o.mode}-${o.subType || 'default'}`===selectedModeId);
              const iceOption = deliveryResult?.options.find((o:any)=>o.mode === 'ICE');
              if (selectedOption && iceOption && selectedOption.carbonEmissionsGrams < iceOption.carbonEmissionsGrams) {
                const saved = Math.round(iceOption.carbonEmissionsGrams - selectedOption.carbonEmissionsGrams);
                if (saved > 0) {
                  return (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8 flex items-center gap-4 text-green-800 text-left">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Leaf size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Eco-friendly Choice!</h4>
                        <p className="text-sm opacity-90">You saved <strong>{saved}g of CO₂</strong> compared to regular delivery.</p>
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })()}
            
            <div className="mb-8">
              <DeliveryMap 
                storeLat={19.1192214}
                storeLon={72.8436312}
                customerLat={deliveryLocation?.lat || 0}
                customerLon={deliveryLocation?.lon || 0}
                mode={deliveryResult?.options.find((o:any)=>`${o.mode}-${o.subType || 'default'}`===selectedModeId)?.mode || 'ICE'}
              />
            </div>

            <div className="bg-white rounded-2xl border p-6 text-left mb-8">
              <h3 className="font-bold text-gray-800 mb-4">What happens next?</h3>
              
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Preparing Order</h4>
                  <p className="text-sm text-gray-500">Your items are being packed at our Andheri East dark store.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Navigation size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Out for Delivery</h4>
                  <p className="text-sm text-gray-500">Your order will arrive via {deliveryResult?.options.find((o:any)=>`${o.mode}-${o.subType || 'default'}`===selectedModeId)?.mode === 'ICE' ? 'REGULAR' : deliveryResult?.options.find((o:any)=>`${o.mode}-${o.subType || 'default'}`===selectedModeId)?.mode} shortly.</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}

