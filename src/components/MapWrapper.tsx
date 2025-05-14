import React, { useEffect, useState } from 'react';
import { Platform, View, ActivityIndicator, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { Overlay, Map as WebMap, Marker as WebMarker } from 'pigeon-maps';

const { width } = Dimensions.get('window');

interface FoodBankData {
  Name: string;
  State: string;
  Address: string;
  Contact: string;
  latitude: number;
  longitude: number;
  geocoding_status: string;
}

interface MapWrapperProps {
  selectedFood: FoodBankData | null;
  setSelectedFood: (food: FoodBankData | null) => void;
  foodBanks: FoodBankData[];
}

const MapWrapper: React.FC<MapWrapperProps> = ({ 
  selectedFood, 
  setSelectedFood,
  foodBanks 
}) => {
  const [MapView, setMapView] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Add coordinate validation helper
  const validateCoordinates = (bank: FoodBankData) => {
    const lat = Number(bank.latitude);
    const lng = Number(bank.longitude);
    return {
      isValid: !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180,
      lat,
      lng
    };
  };

  // Filter valid food banks
  const validFoodBanks = foodBanks.filter(bank => validateCoordinates(bank).isValid);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const maps = await import('react-native-maps');
        setMapView(() => maps.default);
        setMarker(() => maps.Marker);
      })();
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <WebMap
        defaultCenter={[39.8283, -98.5795]} // Center of US
        defaultZoom={4}
        center={
          selectedFood ? 
            [Number(selectedFood.latitude), Number(selectedFood.longitude)] : 
            [39.8283, -98.5795]
        }
        width={width}
        height={300}
      >
        {validFoodBanks.map((bank, idx) => {
          const coords = validateCoordinates(bank);
          return (
            <WebMarker
              key={idx}
              anchor={[coords.lat, coords.lng]}
              onClick={() => setSelectedFood(bank)}
            />
          );
        })}

        {selectedFood && validateCoordinates(selectedFood).isValid && (
          <Overlay 
            anchor={[Number(selectedFood.latitude), Number(selectedFood.longitude)]} 
            offset={[0, 50]}
          >
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8,
                borderColor: '#ccc',
                borderWidth: 1,
                maxWidth: 200,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {selectedFood.Name}
              </Text>
              <Text style={{ fontSize: 12 }}>{selectedFood.Address}</Text>
              <Text style={{ fontSize: 12 }}>{selectedFood.State}</Text>
              <Text style={{ fontSize: 12 }}>{selectedFood.Contact}</Text>
            </View>
          </Overlay>
        )}
      </WebMap>
    );
  }

  if (!MapView || !Marker || loading) {
    return (
      <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MapView
      style={{ width: '100%', height: 300 }}
      initialRegion={{
        latitude: 39.8283,
        longitude: -98.5795,
        latitudeDelta: 40,
        longitudeDelta: 40,
      }}
      region={
        selectedFood && validateCoordinates(selectedFood).isValid
          ? {
              latitude: Number(selectedFood.latitude),
              longitude: Number(selectedFood.longitude),
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }
          : undefined
      }
    >
      {validFoodBanks.map((bank, idx) => {
        const coords = validateCoordinates(bank);
        return (
          <Marker
            key={idx}
            coordinate={{
              latitude: coords.lat,
              longitude: coords.lng,
            }}
            title={bank.Name}
            description={bank.Address}
            onPress={() => setSelectedFood(bank)}
          />
        );
      })}
    </MapView>
  );
};

export default MapWrapper;
