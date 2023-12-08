import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { Rating } from "react-native-ratings";
import UpdateRestaurant from "./UpdateRestaurant";

export default function RestaurantList() {
  // ================== STATES ==================
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const db = SQLite.openDatabase("restaurant.db");
  const navigation = useNavigation();

  // ================== fetch data from DB ==================
  const fetchRestaurants = () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM restaurants", [], (txtObj, resultSet) => {
        setRestaurants(resultSet.rows._array);
        setIsLoading(false);
      });
    });
  };

  // ================== NAVIGATIONS ==================
  const navigateToAddRestaurant = () => {
    navigation.navigate("Add Restaurant");
  };
  const navigateDescription = (restaurant) => () => {
    navigation.navigate("Restaurant Details", { item: restaurant });
  };
  const navigateUpdate = (restaurant) => {
    navigation.navigate("Update Restaurant", {
      item: restaurant,
      updateCallback: fetchRestaurants,
    });
  };

  // ================== delete restaurant ==================
  const deleteRestaurant = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this restaurant?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            db.transaction(
              (txn) => {
                txn.executeSql(
                  "DELETE FROM restaurants WHERE id = ?",
                  [id],
                  (txtObj, resultSet) => {
                    fetchRestaurants();
                  },
                  (txtObj, error) => {
                    console.log("Error deleting restaurant: ", error);
                  }
                );
              },
              (error) => {
                console.log("Error: ", error);
              }
            );
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ecf0f1",
        padding: 8,
      }}
    >
      {/* loading state.... */}
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : restaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          {/* if user's list is empty, display nothing but add restaurant navigation */}
          <Text style={styles.emptyText}>Your restaurant list is empty!</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={navigateToAddRestaurant}
          >
            <Text style={styles.buttonText}>Add a Restaurant</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={navigateDescription(item)}>
              <View style={styles.restaurantItem}>
                <Image
                  source={require("../assets/restaurant-icon.png")}
                  style={{
                    height: 100,
                    width: 100,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                />
                <View>
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <Text style={styles.restaurantLocation}>
                    Location: {JSON.parse(item.location).name}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Ratings: </Text>
                    <Rating
                      tintColor="#F0F4F3"
                      readonly
                      imageSize={25}
                      startingValue={item.rating}
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 8 }}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { backgroundColor: "#50C2C9", marginRight: 8 },
                      ]}
                      onPress={() => navigateUpdate(item)}
                    >
                      <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={() => deleteRestaurant(item.id)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 18,
    color: "#333",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 22,
    color: "#555",
    textAlign: "center",
  },

  addButton: {
    marginTop: 16,
    backgroundColor: "#50C2C9",
    padding: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  restaurantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    borderBottomWidth: 0.2,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  restaurantLocation: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ed2939",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
});
