import React, { useEffect, useState } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { Map as WebMap, Marker as WebMarker } from 'pigeon-maps';

const { width } = Dimensions.get('window');

const foodData = [
  {
    name: 'Neapolitan Pizza',
    latitude: 40.8529,
    longitude: 14.2681,
    description: 'A simple pizza from Naples, Italy.',
  },
  {
    name: 'Sushi',
    latitude: 35.6762,
    longitude: 139.6503,
    description: 'Vinegared rice with various ingredients from Japan.',
  },
  {
    name: 'Tacos',
    latitude: 23.6345,
    longitude: -102.5528,
    description: 'A traditional Mexican corn or wheat tortilla wrap.',
  },
];

const MapWrapper = ({ selectedFood, setSelectedFood }) => {
  const [MapView, setMapView] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Dynamically import react-native-maps
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
        defaultCenter={[20, 0]}
        defaultZoom={2}
        center={
          selectedFood ? [selectedFood.latitude, selectedFood.longitude] : [20, 0]
        }
        zoom={selectedFood ? 6 : 2}
        width={width}
        height={300}
      >
        {foodData.map((food, idx) => (
          <WebMarker
            key={idx}
            anchor={[food.latitude, food.longitude]}
            onClick={() => setSelectedFood(food)}
          />
        ))}
      </WebMap>
    );
  }

  if (!MapView || !Marker) {
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
        latitude: 20,
        longitude: 0,
        latitudeDelta: 80,
        longitudeDelta: 80,
      }}
      region={
        selectedFood
          ? {
              latitude: selectedFood.latitude,
              longitude: selectedFood.longitude,
              latitudeDelta: 10,
              longitudeDelta: 10,
            }
          : undefined
      }
    >
      {foodData.map((food, idx) => (
        <Marker
          key={idx}
          coordinate={{
            latitude: food.latitude,
            longitude: food.longitude,
          }}
          title={food.name}
          description={food.description}
          onPress={() => setSelectedFood(food)}
        />
      ))}
    </MapView>
  );
};

export default MapWrapper;
