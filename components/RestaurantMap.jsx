import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantMap({ route, navigation }) {
  const { onLocationChange } = route.params;

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
        initialRegion={TORONTO_CITY_HALL}
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
      />
    </View>
  );
}
