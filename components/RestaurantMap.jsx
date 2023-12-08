import {
  StyleSheet,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function RestaurantMap(props) {
  const GEORGE_BROWN_CASA_LOMA = {
    latitude: 43.677282544300326,
    latitudeDelta: 0.005263631614525366,
    longitude: -79.41111641004682,
    longitudeDelta: 0.006704516708850861,
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={GEORGE_BROWN_CASA_LOMA}
        onRegionChangeComplete={(region) => {
          console.log(region);
        }}
        provider={PROVIDER_GOOGLE}
        onPoiClick={(event) => {
          console.log(event.nativeEvent);
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsBuildings={false}
      />
    </View>
  );
}
