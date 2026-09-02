'use client';

import { useAppStore } from '@/store/appStore';
import Header from '@/components/layout/Header';
import { WEATHER_CONFIG, TRAFFIC_CONFIG, ICE_VEHICLE, EV_VEHICLE, DRONE_CLASSES } from '@/config/delivery';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, Settings, TrendingUp, Package, Clock, Leaf, IndianRupee, Users, MousePointerClick, RefreshCcw } from 'lucide-react';

export default function AdminPage() {
  const { demoOverrides, updateDemoOverrides, resetDemoOverrides } = useAppStore();
  const [events, setEvents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'ANALYTICS'>('SIMULATION');

  useEffect(() => {
    fetch('/api/insights/data')
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(err => console.warn('Failed to fetch analytics:', err));
  }, []);

  const orders = events.filter(e => e.event_name === 'order_completed');
  const totalRevenue = orders.reduce((sum, o) => sum + (o.cart_value || 0) + (o.delivery_cost || 0), 0);
  const totalOperatingCost = orders.reduce((sum, o) => sum + (o.estimated_operating_cost || 0), 0);
  const margin = totalRevenue - totalOperatingCost - orders.reduce((sum, o) => sum + (o.cart_value || 0) * 0.7, 0);
  const avgEta = orders.length ? (orders.reduce((sum, o) => sum + (o.estimated_eta || 0), 0) / orders.length).toFixed(1) : '0.0';
  const totalCo2 = orders.reduce((sum, o) => sum + (o.estimated_co2 || 0), 0);
  
  // mode counts
  const modes = orders.reduce((acc, o) => {
    const m = (o.delivery_mode === 'ICE' ? 'REGULAR' : o.delivery_mode) || 'Unknown';
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {} as any);

  // Digital Analytics KPI Mocks (based on real events + reasonable simulation ratios for a prototype)
  const uniqueSessions = events.length === 0 ? 0 : new Set(events.map(e => e.session_id)).size || 1;
  const pageViews = events.length === 0 ? 0 : events.filter(e => e.event_name === 'delivery_modes_viewed').length + (uniqueSessions * 3); // mock views
  const aov = orders.length > 0 ? (totalRevenue / orders.length).toFixed(0) : '0';
  const conversionRate = uniqueSessions === 0 ? '0.0' : ((orders.length / uniqueSessions) * 100).toFixed(1);
  const bounceRate = uniqueSessions === 0 ? '0.0' : Math.max(0, 35.4 - (orders.length * 2)).toFixed(1); // Mock 
  const addToCartRate = uniqueSessions === 0 ? '0.0' : ((events.filter(e => e.event_name === 'cart_add').length || orders.length * 4) / uniqueSessions * 100).toFixed(1);
  const returningUsers = uniqueSessions === 0 ? 0 : Math.floor(uniqueSessions * 0.35); 
  const clv = (parseFloat(aov) * 4.2).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="text-indigo-600" /> Developer Panel
          </h1>
          {activeTab === 'SIMULATION' && (
            <button 
              onClick={resetDemoOverrides}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-bold transition"
            >
              Reset All Overrides
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8 justify-between">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('SIMULATION')}
              className={`px-6 py-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'SIMULATION' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings size={18} /> Environment Simulation
            </button>
            <button 
              onClick={() => setActiveTab('ANALYTICS')}
              className={`px-6 py-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'ANALYTICS' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp size={18} /> Web & Performance Analytics
            </button>
          </div>
          
          {activeTab === 'ANALYTICS' && (
            <button 
              onClick={() => {
                if (confirm('Are you sure you want to clear all analytics data?')) {
                  fetch('/api/insights/data', { method: 'DELETE' }).then(() => setEvents([]));
                }
              }}
              className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
            >
              Clear All Data
            </button>
          )}
        </div>

        {activeTab === 'SIMULATION' && (
          <div className="grid md:grid-cols-2 gap-8 mb-12 animate-fade-in">
            {/* Weather Override */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Leaf size={18}/> Weather Simulation</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="radio" name="weather" checked={demoOverrides.weatherWmoCode === null}
                    onChange={() => updateDemoOverrides({ weatherWmoCode: null })} /> Live API Data (Open-Meteo)
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="radio" name="weather" checked={demoOverrides.weatherWmoCode === 0}
                    onChange={() => updateDemoOverrides({ weatherWmoCode: 0 })} /> Clear Sky
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="radio" name="weather" checked={demoOverrides.weatherWmoCode === 61}
                    onChange={() => updateDemoOverrides({ weatherWmoCode: 61 })} /> Slight Rain (Drone factor +15%)
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="radio" name="weather" checked={demoOverrides.weatherWmoCode === 65}
                    onChange={() => updateDemoOverrides({ weatherWmoCode: 65 })} /> Heavy Rain (Drones Grounded)
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="radio" name="weather" checked={demoOverrides.weatherWmoCode === 95}
                    onChange={() => updateDemoOverrides({ weatherWmoCode: 95 })} /> Thunderstorm (All Drones Grounded)
                </label>
              </div>
            </div>

            {/* Traffic Override */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock size={18}/> Traffic Simulation</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input type="radio" name="traffic" checked={demoOverrides.trafficState === null}
                    onChange={() => updateDemoOverrides({ trafficState: null })} /> Time-of-day Default Model
                </label>
                {Object.keys(TRAFFIC_CONFIG.states).map(state => {
                  const stateConfig = TRAFFIC_CONFIG.states[state as keyof typeof TRAFFIC_CONFIG.states];
                  return (
                  <label key={state} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input type="radio" name="traffic" checked={demoOverrides.trafficState === state}
                      onChange={() => updateDemoOverrides({ trafficState: state })} />
                    {stateConfig.label} (Multiplier: x{stateConfig.multiplier})
                  </label>
                  );
                })}
              </div>
            </div>

            {/* Fleet Limits */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Package size={18}/> Fleet Capacity Simulation</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div>
                  <h3 className="font-semibold mb-2 flex justify-between">
                    <span>REGULAR</span>
                    <span className="text-indigo-600">{demoOverrides.iceAvailable !== null ? demoOverrides.iceAvailable : ICE_VEHICLE.availableFleet} / {ICE_VEHICLE.totalFleet}</span>
                  </h3>
                  <input type="range" min="0" max={ICE_VEHICLE.totalFleet} 
                    value={demoOverrides.iceAvailable !== null ? demoOverrides.iceAvailable : ICE_VEHICLE.availableFleet}
                    onChange={(e) => updateDemoOverrides({ iceAvailable: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600" />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 flex justify-between">
                    <span>EV</span>
                    <span className="text-green-600">{demoOverrides.evAvailable !== null ? demoOverrides.evAvailable : EV_VEHICLE.availableFleet} / {EV_VEHICLE.totalFleet}</span>
                  </h3>
                  <input type="range" min="0" max={EV_VEHICLE.totalFleet} 
                    value={demoOverrides.evAvailable !== null ? demoOverrides.evAvailable : EV_VEHICLE.availableFleet}
                    onChange={(e) => updateDemoOverrides({ evAvailable: parseInt(e.target.value) })}
                    className="w-full accent-green-500" />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 flex justify-between text-sm">
                    <span>Drone: Small</span>
                    <span className="text-blue-500">{demoOverrides.droneSmallAvailable !== null ? demoOverrides.droneSmallAvailable : DRONE_CLASSES.SMALL.availableFleet} / {DRONE_CLASSES.SMALL.totalFleet}</span>
                  </h3>
                  <input type="range" min="0" max={DRONE_CLASSES.SMALL.totalFleet} 
                    value={demoOverrides.droneSmallAvailable !== null ? demoOverrides.droneSmallAvailable : DRONE_CLASSES.SMALL.availableFleet}
                    onChange={(e) => updateDemoOverrides({ droneSmallAvailable: parseInt(e.target.value) })}
                    className="w-full accent-blue-500" />
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex justify-between text-sm">
                    <span>Drone: Med</span>
                    <span className="text-purple-500">{demoOverrides.droneMediumAvailable !== null ? demoOverrides.droneMediumAvailable : DRONE_CLASSES.MEDIUM.availableFleet} / {DRONE_CLASSES.MEDIUM.totalFleet}</span>
                  </h3>
                  <input type="range" min="0" max={DRONE_CLASSES.MEDIUM.totalFleet} 
                    value={demoOverrides.droneMediumAvailable !== null ? demoOverrides.droneMediumAvailable : DRONE_CLASSES.MEDIUM.availableFleet}
                    onChange={(e) => updateDemoOverrides({ droneMediumAvailable: parseInt(e.target.value) })}
                    className="w-full accent-purple-500" />
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex justify-between text-sm">
                    <span>Drone: Heavy</span>
                    <span className="text-red-500">{demoOverrides.droneHeavyAvailable !== null ? demoOverrides.droneHeavyAvailable : DRONE_CLASSES.HEAVY.availableFleet} / {DRONE_CLASSES.HEAVY.totalFleet}</span>
                  </h3>
                  <input type="range" min="0" max={DRONE_CLASSES.HEAVY.totalFleet} 
                    value={demoOverrides.droneHeavyAvailable !== null ? demoOverrides.droneHeavyAvailable : DRONE_CLASSES.HEAVY.availableFleet}
                    onChange={(e) => updateDemoOverrides({ droneHeavyAvailable: parseInt(e.target.value) })}
                    className="w-full accent-red-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ANALYTICS' && (
          <div className="space-y-8 animate-fade-in">
            {/* Business KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white border rounded-xl p-4 shadow-sm border-l-4 border-l-indigo-600">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Package size={14} /> Total Orders
                </div>
                <div className="text-2xl font-black text-gray-900">{orders.length}</div>
              </div>
              <div className="bg-white border rounded-xl p-4 shadow-sm border-l-4 border-l-green-600">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <IndianRupee size={14} /> Total Revenue
                </div>
                <div className="text-2xl font-black text-gray-900">₹{totalRevenue.toFixed(0)}</div>
              </div>
              <div className="bg-white border rounded-xl p-4 shadow-sm border-l-4 border-l-red-500">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Activity size={14} /> Operating Cost
                </div>
                <div className="text-2xl font-black text-gray-900">₹{totalOperatingCost.toFixed(0)}</div>
              </div>
              <div className="bg-white border rounded-xl p-4 shadow-sm border-l-4 border-l-purple-600">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <TrendingUp size={14} /> Net Margin
                </div>
                <div className="text-2xl font-black text-gray-900">₹{margin.toFixed(0)}</div>
              </div>
              <div className="bg-white border rounded-xl p-4 shadow-sm border-l-4 border-l-blue-600">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Clock size={14} /> Avg ETA
                </div>
                <div className="text-2xl font-black text-gray-900">{avgEta} <span className="text-sm font-medium text-gray-500">min</span></div>
              </div>
              <div className="bg-white border rounded-xl p-4 shadow-sm border-l-4 border-l-teal-600">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Leaf size={14} /> CO2 Emitted
                </div>
                <div className="text-2xl font-black text-gray-900">{(totalCo2 / 1000).toFixed(2)} <span className="text-sm font-medium text-gray-500">kg</span></div>
              </div>
            </div>

            {/* Digital Web Analytics KPIs */}
            <h2 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2"><MousePointerClick className="text-indigo-600"/> Digital Web Analytics (Live & Simulated)</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs font-bold text-gray-500 uppercase">Unique Sessions</div>
                <div className="text-xl font-black">{uniqueSessions}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs font-bold text-gray-500 uppercase">Conversion Rate</div>
                <div className="text-xl font-black">{conversionRate}%</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs font-bold text-gray-500 uppercase">Avg Order Value</div>
                <div className="text-xl font-black">₹{aov}</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs font-bold text-gray-500 uppercase">Bounce Rate</div>
                <div className="text-xl font-black">{bounceRate}%</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs font-bold text-gray-500 uppercase">Customer LTV (Sim)</div>
                <div className="text-xl font-black">₹{clv}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><TrendingUp size={18} /> Mode Usage Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(modes).sort((a:any,b:any) => b[1]-a[1]).map(([mode, count]: any) => (
                    <div key={mode}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-gray-700">{mode === 'ICE' ? 'REGULAR' : mode}</span>
                        <span className="text-gray-500">{((count / orders.length) * 100).toFixed(1)}% ({count} orders)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${mode === 'DRONE' ? 'bg-blue-500' : mode === 'EV' ? 'bg-green-500' : 'bg-gray-600'}`} 
                          style={{ width: `${(count / orders.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  {Object.keys(modes).length === 0 && <div className="text-center text-gray-400 py-8">No orders yet</div>}
                </div>
              </div>

              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Activity size={18} /> Recent Order Log (IST Timezone)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Mode Delivered</th>
                        <th className="px-4 py-3">Calc. ETA</th>
                        <th className="px-4 py-3">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 8).map((o, i) => {
                        let formattedTime = '';
                        try {
                          const date = new Date(o.timestamp.replace(' ', 'T') + 'Z'); 
                          formattedTime = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit', hour12: true }).format(date);
                        } catch(e) { formattedTime = o.timestamp }
                        return (
                        <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-500 font-medium">
                            {formattedTime}
                          </td>
                          <td className="px-4 py-3 font-bold">
                            <span className={`px-2 py-1 rounded text-xs ${o.delivery_mode === 'DRONE' ? 'bg-blue-100 text-blue-700' : o.delivery_mode === 'EV' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                              {o.delivery_mode === 'ICE' ? 'REGULAR' : o.delivery_mode}
                            </span>
                          </td>
                          <td className="px-4 py-3">{o.estimated_eta ? Math.round(o.estimated_eta) : '-'}m</td>
                          <td className="px-4 py-3 text-gray-500">₹{o.cart_value || 0}</td>
                        </tr>
                      )})}
                      {orders.length === 0 && (
                        <tr><td colSpan={4} className="text-center py-8 text-gray-400">No recent orders yet (Refresh to load)</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
