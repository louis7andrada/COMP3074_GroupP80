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
  const tagsColor = {
    Vegan: "#8CC084",
    Ethnic: "yellow",
    "Fast Food": "#FF1654",
    Buffet: "#00E8FC",
    Cafe: "#E0C1B3",
    Other: "grey",
  };

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
    const fetchLocation = () => {
      db.transaction((txn) => {
        txn.executeSql("SELECT * FROM restaurants", [], (txtObj, resultSet) => {
          setMarkers(
            resultSet.rows._array.map((row) => JSON.parse(row.location))
          );
          setTags(resultSet.rows._array.map((row) => row.tag));
          // console.log(resultSet.rows._array);
          setIsLoading(false);
        });
      });
    };
    fetchLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={TORONTO_CITY_HALL}
        onRegionChangeComplete={(region) => {}}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsBuildings={false}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.placeId}
            coordinate={marker.coordinate}
            title={marker.name}
            onSelect={() => {
              navigateDescription();
            }}
            pinColor={tagsColor[tags[index]]}
          />
        ))}
      </MapView>
      <View style={styles.legendContainer}>
        {Object.entries(tagsColor).map(([tag, color]) => (
          <View key={tag} style={styles.legendItem}>
            <Text style={{ color: color }}>● </Text>
            <Text> {tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "white",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: "space-around",
  },
});
