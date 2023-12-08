import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function RestaurantMap({ route, navigation }) {
  const { onLocationChange, location } = route.params;

  const TORONTO_CITY_HALL = {
    latitude: 43.653439728780945,
    longitude: -79.3840903043747,
    latitudeDelta: 0.005263631614525366,
    longitudeDelta: 0.006704516708850861,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={
          location === ""
            ? TORONTO_CITY_HALL
            : {
                longitude: location.coordinate.longitude,
                latitude: location.coordinate.latitude,
                latitudeDelta: 0.005263631614525366,
                longitudeDelta: 0.006704516708850861,
              }
        }
        onRegionChangeComplete={(region) => {
          console.log(region);
        }}
        provider={PROVIDER_GOOGLE}
        onPoiClick={(event) => {
          console.log(event.nativeEvent);
          onLocationChange(event.nativeEvent);
          navigation.goBack();
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsBuildings={false}
      >
        {location && (
          <Marker
            key={location.placeId}
            coordinate={location.coordinate}
            title={location.name}
          />
        )}
      </MapView>
    </View>
  );
}
