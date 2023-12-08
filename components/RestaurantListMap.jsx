import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

// todo: when a marker is clicked, it goes to restaurantDetails.jsx

export default function RestaurantListMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [tags, setTags] = useState([]);

  const db = SQLite.openDatabase("restaurant.db");
  const navigation = useNavigation();
  
  const navigateDescription = (restaurant) => () => {
    navigation.navigate("Restaurant Details", { item: restaurant });
  };

  const TORONTO_CITY_HALL = {
    latitude: 43.653439728780945,
    longitude: -79.3840903043747,
    latitudeDelta: 0.1263631614525366,
    longitudeDelta: 0.1704516708850861,
  };

  useEffect(() => {
    const fetchLocation = async () => {
      db.transaction((txn) => {
        txn.executeSql(
          "SELECT * FROM restaurants",
          [],
          (txtObj, resultSet) => {
            setMarkers(
              resultSet.rows._array.map((row) => JSON.parse(row.location))
            );
            setIsLoading(false);
          }
        );
      });
    };

    fetchLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={TORONTO_CITY_HALL}
        onRegionChangeComplete={(region) => {
          //   console.log(region);
        }}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsBuildings={false}
      >
        <View>{/* <Text>lorem*9</Text> */}</View>
        {markers.map((marker, index) => (
          <Marker
            key={marker.placeId}
            coordinate={marker.coordinate}
            title={marker.name}
            onSelect={() => {
                navigateDescription()
            }}
          />
        ))}
      </MapView>
    </View>
  );
}
