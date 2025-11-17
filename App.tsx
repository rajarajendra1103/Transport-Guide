import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Page, TransportMode, Route, SearchMode, MapMode, Stop, Filters } from './types';
import { MOCK_ROUTES, POPULAR_CITIES, FILTER_OPTIONS } from './constants';
import { 
  BusIcon, TrainIcon, SearchIcon, FilterIcon, MapIcon, ArrowLeftIcon, 
  ChevronRightIcon, ClockIcon, TicketIcon, RouteIcon, PinIcon, GpsIcon, SwapIcon, CloseIcon, CityIcon
} from './components/icons';

// App component and all sub-components (pages, panels) are defined in this file for conciseness.

// Helper Components
const PageHeader: React.FC<{ title: string; onBack?: () => void; rightContent?: React.ReactNode }> = ({ title, onBack, rightContent }) => (
  <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
    <div className="flex items-center">
      {onBack && (
        <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-xl md:text-2xl font-bold text-cyan-600">{title}</h1>
    </div>
    <div>{rightContent}</div>
  </header>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => (
  <div 
    onClick={onClick} 
    className={`bg-white rounded-lg shadow-md ${className} ${onClick ? 'cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]' : ''}`}
  >
    {children}
  </div>
);


// Footer Component
const Footer: React.FC = () => (
  <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
    &copy; 2025 Tourism Website
  </footer>
);


// Page Components
const HomePage: React.FC<{ setCity: (city: string) => void; onContinue: () => void }> = ({ setCity, onContinue }) => {
  const [inputValue, setInputValue] = useState('');

  const handleContinue = () => {
    if (inputValue.trim()) {
      setCity(inputValue.trim());
      onContinue();
    }
  };

  const handlePopularCityClick = (city: string) => {
    setCity(city);
    onContinue();
  };
  
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        {/* 1. Top Section */}
        <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <RouteIcon className="w-12 h-12 text-white" />
            </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Transport Guide
        </h1>
        <p className="text-gray-600 mt-2 mb-10">Find bus & train travel details instantly</p>
        
        {/* 2. Middle Section */}
        <div className="space-y-4">
            <div className="relative">
                <CityIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your City / Town / Village"
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 rounded-full py-4 pl-12 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
            </div>
            <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-full py-4 text-lg hover:opacity-90 disabled:bg-gray-400 disabled:bg-none disabled:cursor-not-allowed transition-all transform hover:scale-105"
                disabled={!inputValue.trim()}
            >
                Continue
            </button>
        </div>
        
        {/* 3. Suggested Cities */}
        <div className="mt-10">
          <h2 className="text-gray-600 font-semibold mb-4">Popular Cities</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {POPULAR_CITIES.map(city => (
              <button 
                key={city} 
                onClick={() => handlePopularCityClick(city)}
                className="bg-white text-gray-700 border border-gray-300 rounded-full px-4 py-2 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all text-sm font-medium"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Bottom Section */}
        <p className="text-gray-500 mt-12 text-sm">
            Find Transport instantly for any city.
        </p>
      </div>
    </div>
  );
};


const ModeSelectionPage: React.FC<{
  city: string;
  onSelectMode: (mode: TransportMode) => void;
  onBack: () => void;
}> = ({ city, onSelectMode, onBack }) => {
  return (
    <div className="flex flex-col flex-grow">
      <PageHeader title={`Traveling in ${city}`} onBack={onBack} />
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
        <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Choose your mode of transport</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div
                onClick={() => onSelectMode(TransportMode.BUS)}
                className="group relative bg-white rounded-lg shadow-xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-cyan-50 border-2 border-transparent hover:border-cyan-400"
              >
                <BusIcon className="w-24 h-24 mx-auto text-cyan-500 transition-transform group-hover:scale-110" />
                <h3 className="text-4xl font-bold mt-4">BUS</h3>
              </div>
              <div
                onClick={() => onSelectMode(TransportMode.TRAIN)}
                className="group relative bg-white rounded-lg shadow-xl p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-teal-50 border-2 border-transparent hover:border-teal-400"
              >
                <TrainIcon className="w-24 h-24 mx-auto text-teal-500 transition-transform group-hover:scale-110" />
                <h3 className="text-4xl font-bold mt-4">TRAIN</h3>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

const FilterPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  initialFilters: Filters;
}> = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [localFilters, setLocalFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters, isOpen]);

  const handleToggle = (category: keyof Filters, value: string) => {
    setLocalFilters(prev => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            {Object.entries(FILTER_OPTIONS).map(([key, values]) => (
              <div key={key} className="mb-6">
                <h3 className="text-lg font-semibold capitalize mb-3 text-cyan-600">{key}</h3>
                <div className="flex flex-wrap gap-2">
                  {values.map(value => {
                    const isSelected = localFilters[key as keyof Filters].includes(value);
                    return (
                      <button
                        key={value}
                        onClick={() => handleToggle(key as keyof Filters, value)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isSelected ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 grid grid-cols-2 gap-4">
            <button
              onClick={() => setLocalFilters({ type: [], time: [], session: [] })}
              className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="w-full bg-cyan-500 text-white font-bold py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchPage: React.FC<{
  transportMode: TransportMode;
  onSelectRoute: (route: Route) => void;
  onViewRouteOnMap: (route: Route) => void;
  onOpenMap: () => void;
  onBack: () => void;
}> = ({ transportMode, onSelectRoute, onViewRouteOnMap, onOpenMap, onBack }) => {
  const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.NUMBER);
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({ type: [], time: [], session: [] });

  const routesForMode = useMemo(() => MOCK_ROUTES.filter(r => r.mode === transportMode), [transportMode]);

  const filteredRoutes = useMemo(() => {
    return routesForMode.filter(route => {
      // Search query filter
      const lowerQuery = query.toLowerCase();
      const queryMatch = searchMode === SearchMode.NUMBER
        ? route.number.toLowerCase().includes(lowerQuery)
        : route.destination.toLowerCase().includes(lowerQuery) || route.startLocation.toLowerCase().includes(lowerQuery);

      if (!queryMatch) return false;

      // Active filters
      const typeMatch = activeFilters.type.length === 0 || activeFilters.type.includes(route.type);
      const timeMatch = activeFilters.time.length === 0 || activeFilters.time.includes(route.timeOfDay);
      const sessionMatch = activeFilters.session.length === 0 || activeFilters.session.includes(route.session);

      return typeMatch && timeMatch && sessionMatch;
    });
  }, [routesForMode, query, searchMode, activeFilters]);

  const modeName = transportMode.charAt(0) + transportMode.slice(1).toLowerCase();

  return (
    <div className="flex flex-col flex-grow">
      <PageHeader
        title={`${modeName} Search`}
        onBack={onBack}
        rightContent={
          <button onClick={onOpenMap} className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            <MapIcon className="w-5 h-5" />
            <span className="hidden md:inline">Search Map</span>
          </button>
        }
      />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Controls */}
          <div className="mb-6">
            <div className="flex bg-gray-200 rounded-full p-1 mb-4">
              <button 
                onClick={() => setSearchMode(SearchMode.NUMBER)}
                className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${searchMode === SearchMode.NUMBER ? 'bg-cyan-500 text-white' : 'text-gray-600 hover:bg-gray-300'}`}>
                Search by Number
              </button>
              <button 
                onClick={() => setSearchMode(SearchMode.DESTINATION)}
                className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${searchMode === SearchMode.DESTINATION ? 'bg-cyan-500 text-white' : 'text-gray-600 hover:bg-gray-300'}`}>
                Search by Destination
              </button>
            </div>
            <div className="relative flex items-center gap-2">
              <SearchIcon className="absolute left-4 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={searchMode === SearchMode.NUMBER ? `Enter ${modeName.toLowerCase()} number...` : 'Enter destination...'}
                className="w-full bg-white border-2 border-gray-300 text-gray-900 rounded-full py-3 pl-12 pr-16 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button onClick={() => setIsFilterOpen(true)} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                <FilterIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Search Results */}
          <div className="space-y-4">
            {filteredRoutes.length > 0 ? filteredRoutes.map(route => (
              <Card key={route.id} className="!p-0 overflow-hidden">
                <div className="flex items-center justify-between">
                    <div 
                        onClick={() => onSelectRoute(route)} 
                        className="flex-grow p-4 cursor-pointer transition-colors hover:bg-gray-50/50"
                    >
                        {searchMode === SearchMode.NUMBER ? (
                        <>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${transportMode === TransportMode.BUS ? 'bg-cyan-500 text-white' : 'bg-teal-500 text-white'}`}>{route.number}</span>
                                <p className="text-gray-600">{route.type}</p>
                            </div>
                            <p className="text-lg font-semibold mt-1">{route.startLocation} &rarr; {route.destination}</p>
                        </>
                        ) : (
                        <>
                            <h3 className="text-xl font-bold text-cyan-500">{route.destination}</h3>
                            <p className="text-gray-600">{route.startLocation} &rarr; {route.destination}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${transportMode === TransportMode.BUS ? 'bg-cyan-100 text-cyan-800' : 'bg-teal-100 text-teal-800'}`}>{route.number}</span>
                                <p className="text-sm text-gray-500">{route.type}</p>
                            </div>
                        </>
                        )}
                    </div>
                    <div className="text-right flex items-center gap-2 p-4">
                        <div className="text-lg font-semibold">{route.startTime}</div>
                        <button 
                            onClick={() => onViewRouteOnMap(route)} 
                            className="p-2 rounded-full hover:bg-cyan-100 text-cyan-500 transition-colors"
                            aria-label="View on map"
                        >
                            <MapIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
              </Card>
            )) : (
              <div className="text-center py-16">
                <p className="text-gray-500">No routes found. Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={setActiveFilters} initialFilters={activeFilters} />
    </div>
  );
};


const DetailsPage: React.FC<{
  route: Route;
  onBack: () => void;
  onViewFullRoute: () => void;
}> = ({ route, onBack, onViewFullRoute }) => {
    const modeName = route.mode.charAt(0) + route.mode.slice(1).toLowerCase();
    
    return (
        <div className="flex flex-col flex-grow">
            <PageHeader title={`${modeName} Details`} onBack={onBack} />
            <main className="flex-grow p-4 md:p-8">
                <Card className="max-w-2xl mx-auto p-6">
                    <div className="text-center mb-6">
                        <h2 className={`text-4xl font-extrabold ${route.mode === TransportMode.BUS ? 'text-cyan-500' : 'text-teal-500'}`}>{route.number}</h2>
                        <p className="text-xl text-gray-700 mt-1">{route.startLocation} to {route.destination}</p>
                    </div>

                    <div className="space-y-4 text-lg">
                        <div className="flex items-center justify-between bg-gray-200/60 p-3 rounded-lg">
                            <span className="font-semibold text-gray-500 flex items-center gap-2"><ClockIcon className="w-5 h-5"/> Time</span>
                            <span className="font-bold">{route.startTime} &rarr; {route.endTime}</span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-200/60 p-3 rounded-lg">
                            <span className="font-semibold text-gray-500 flex items-center gap-2"><RouteIcon className="w-5 h-5"/> Via</span>
                            <span className="text-right">{route.via.join(', ')}</span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-200/60 p-3 rounded-lg">
                            <span className="font-semibold text-gray-500 flex items-center gap-2"><TicketIcon className="w-5 h-5"/> Ticket Price</span>
                            <span className="font-bold text-xl text-cyan-600">${route.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button 
                            onClick={onViewFullRoute}
                            className="w-full max-w-xs bg-cyan-500 text-white font-bold py-4 rounded-lg text-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
                        >
                            View Full Route
                        </button>
                    </div>
                </Card>
            </main>
        </div>
    );
};

const FullRoutePage: React.FC<{ route: Route; onBack: () => void }> = ({ route, onBack }) => {
  return (
    <div className="flex flex-col flex-grow">
      <PageHeader title="Full Route" onBack={onBack} />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{route.startLocation} &rarr; {route.destination}</h2>
            <p className="text-gray-600">{route.number} | {route.type}</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-5 md:left-6 top-0 h-full w-0.5 bg-gray-300"></div>

            {route.stops.map((stop, index) => (
              <div key={index} className="relative pl-12 md:pl-16 py-4">
                {/* Timeline Dot */}
                <div className={`absolute top-1/2 -translate-y-1/2 left-3 md:left-4 w-4 h-4 rounded-full border-4 border-gray-100 ${index === 0 || index === route.stops.length - 1 ? 'bg-cyan-500 scale-125' : 'bg-gray-400'}`}></div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{stop.name}</h3>
                    <p className="text-sm text-gray-500">
                      {stop.arrivalTime !== '-' && `Arrival: ${stop.arrivalTime}`}
                      {stop.arrivalTime !== '-' && stop.departureTime !== '-' && ' / '}
                      {stop.departureTime !== '-' && `Departure: ${stop.departureTime}`}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 md:text-right">
                    {stop.priceFromPrevious > 0 && (
                      <span className="text-md font-semibold text-cyan-600">
                        +${stop.priceFromPrevious.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const MapPage: React.FC<{ route: Route | null; onBack: () => void }> = ({ route, onBack }) => {
  const [mapMode, setMapMode] = useState<MapMode>(MapMode.CURRENT_LOCATION);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string, time: string} | null>(null);

  useEffect(() => {
    if (route) {
      setMapMode(MapMode.PLACE_TO_PLACE);
      setFrom(route.startLocation);
      setTo(route.destination);
      setRouteInfo({ distance: `${(Math.random() * 15 + 5).toFixed(1)} km`, time: `${Math.floor(Math.random() * 20 + 15)} mins` });
    }
  }, [route]);

  const handleGetLocation = useCallback(() => {
    setLoadingLocation(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locString = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
        setCurrentLocation(locString);
        if (mapMode === MapMode.CURRENT_LOCATION) {
          setFrom(locString);
        }
        setLoadingLocation(false);
      },
      (err) => {
        setError(err.message);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [mapMode]);

  const handleSearch = () => {
    if ((mapMode === MapMode.CURRENT_LOCATION && from && to) || (mapMode === MapMode.PLACE_TO_PLACE && from && to)) {
      setRouteInfo({ distance: `${(Math.random() * 15 + 5).toFixed(1)} km`, time: `${Math.floor(Math.random() * 20 + 15)} mins` });
    } else {
        setRouteInfo(null);
    }
  };
  
  return (
    <div className="flex-grow flex flex-col">
      <PageHeader title="Map Navigation" onBack={onBack} />
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Controls Panel */}
        <aside className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white/60 border-r border-gray-200">
          <div className="flex bg-gray-200 rounded-full p-1 mb-4">
            <button 
              onClick={() => setMapMode(MapMode.CURRENT_LOCATION)}
              className={`w-1/2 py-2 rounded-full font-semibold transition-colors text-sm ${mapMode === MapMode.CURRENT_LOCATION ? 'bg-cyan-500 text-white' : 'text-gray-600 hover:bg-gray-300'}`}>
              Current Location
            </button>
            <button 
              onClick={() => setMapMode(MapMode.PLACE_TO_PLACE)}
              className={`w-1/2 py-2 rounded-full font-semibold transition-colors text-sm ${mapMode === MapMode.PLACE_TO_PLACE ? 'bg-cyan-500 text-white' : 'text-gray-600 hover:bg-gray-300'}`}>
              Place to Place
            </button>
          </div>

          <div className="space-y-3">
            {mapMode === MapMode.CURRENT_LOCATION ? (
              <>
                <div className="flex items-center gap-2">
                  <button onClick={handleGetLocation} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors" disabled={loadingLocation}>
                    <GpsIcon className={`w-6 h-6 ${loadingLocation ? 'animate-pulse' : ''}`}/>
                  </button>
                  <input type="text" value={from || 'Your Location'} readOnly className="w-full bg-gray-200 rounded-lg p-3" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="Destination" className="w-full bg-white border border-gray-300 rounded-lg p-3 placeholder-gray-500" />
              </>
            ) : (
              <>
                <input type="text" value={from} onChange={e => setFrom(e.target.value)} placeholder="From" className="w-full bg-white border border-gray-300 rounded-lg p-3 placeholder-gray-500" />
                <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="To" className="w-full bg-white border border-gray-300 rounded-lg p-3 placeholder-gray-500" />
              </>
            )}
            <button onClick={handleSearch} className="w-full bg-cyan-500 text-white font-bold py-3 rounded-lg hover:bg-cyan-600 transition-colors">Search Route</button>
          </div>

          {routeInfo && (
            <Card className="mt-6 !p-4">
              <h3 className="font-bold text-lg">Route Found</h3>
              <p>From: <span className="font-medium">{from}</span></p>
              <p>To: <span className="font-medium">{to}</span></p>
              <p>Distance: <span className="font-semibold text-cyan-600">{routeInfo.distance}</span></p>
              <p>Est. Time: <span className="font-semibold text-cyan-600">{routeInfo.time}</span></p>
            </Card>
          )}
        </aside>

        {/* Map Display */}
        <main className="flex-grow bg-gray-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/react-simple-maps/react-simple-maps/master/docs/static/media/world-mercator-with-graticules.27e46663.png')] bg-cover opacity-10"></div>
           <svg width="100%" height="100%" viewBox="0 0 400 300" className="absolute inset-0">
             {routeInfo && (
               <>
                 <polyline points="50,250 120,180 250,200 350,50" stroke="#06b6d4" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                 <circle cx="50" cy="250" r="6" fill="#0891b2" stroke="white" strokeWidth="2" />
                 <circle cx="350" cy="50" r="6" fill="#0891b2" stroke="white" strokeWidth="2" />
               </>
             )}
           </svg>
           <p className="z-10 text-gray-500">Map will be displayed here</p>
        </main>
      </div>
    </div>
  );
};


// Main App Component
export default function App() {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [city, setCity] = useState('');
  const [transportMode, setTransportMode] = useState<TransportMode>(TransportMode.BUS);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routeForMap, setRouteForMap] = useState<Route | null>(null);

  const navigateTo = (nextPage: Page) => setPage(nextPage);

  const handleContinueFromHome = () => navigateTo(Page.MODE_SELECTION);
  
  const handleSelectMode = (mode: TransportMode) => {
    setTransportMode(mode);
    navigateTo(Page.SEARCH);
  };
  
  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
    navigateTo(Page.DETAILS);
  };

  const handleViewRouteOnMap = (route: Route) => {
    setRouteForMap(route);
    navigateTo(Page.MAP);
  };

  const handleBackFromMap = () => {
    setRouteForMap(null);
    navigateTo(Page.SEARCH);
  };

  const handleOpenMap = () => {
    setRouteForMap(null);
    navigateTo(Page.MAP);
  }

  const renderPage = () => {
    switch (page) {
      case Page.HOME:
        return <HomePage setCity={setCity} onContinue={handleContinueFromHome} />;
      case Page.MODE_SELECTION:
        return <ModeSelectionPage city={city} onSelectMode={handleSelectMode} onBack={() => navigateTo(Page.HOME)} />;
      case Page.SEARCH:
        return <SearchPage 
                  transportMode={transportMode} 
                  onSelectRoute={handleSelectRoute} 
                  onViewRouteOnMap={handleViewRouteOnMap}
                  onOpenMap={handleOpenMap} 
                  onBack={() => navigateTo(Page.MODE_SELECTION)} 
                />;
      case Page.DETAILS:
        if (!selectedRoute) return null;
        return <DetailsPage route={selectedRoute} onBack={() => navigateTo(Page.SEARCH)} onViewFullRoute={() => navigateTo(Page.FULL_ROUTE)} />;
      case Page.FULL_ROUTE:
        if (!selectedRoute) return null;
        return <FullRoutePage route={selectedRoute} onBack={() => navigateTo(Page.DETAILS)} />;
      case Page.MAP:
        return <MapPage route={routeForMap} onBack={handleBackFromMap} />;
      default:
        return <HomePage setCity={setCity} onContinue={handleContinueFromHome} />;
    }
  };

  return (
    <div className="antialiased flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
