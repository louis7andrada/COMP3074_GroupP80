import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import FoodIcon from "./../assets/food.png";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

export default function AddRestaurant() {
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const db = SQLite.openDatabase("restaurant.db");

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(`CREATE TABLE IF NOT EXISTS restaurants (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT,
				description TEXT)`);
    });
    // todo delete, for tests only
    fetchRestaurants();
  }, []);

  const fetchRestaurants = () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM restaurants", [], (txtObj, resultSet) => {
        setRestaurants(resultSet.rows._array);
      });
    });
  };

  const addRestaurant = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO restaurants (name, description) VALUES (?, ?)",
        [restaurantName, description],
        (txtObj, resultSet) => {
          console.log("Restaurant added successfully!");
          setRestaurantName("");
          setLocation("");
          setDescription("");
        },
        (txtObj, error) => {
          console.log("Error adding restaurant:", error);
        }
      );
    });
  };

  const showRestaurants = () => {
    return restaurants.map((element, index) => (
      <View key={index}>
        <Text>{element.name} {element.description}</Text>
      </View>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={FoodIcon} style={styles.icon} />
        {/* todo: remove later */}
        {showRestaurants()}
        {/* TODO: remove later */}
        <Text style={styles.welcomeText}>
          Add your fav restaurant to your list!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter restaurant name..."
          value={restaurantName}
          onChangeText={(text) => setRestaurantName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter location..."
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description..."
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity style={styles.addBtn} onPress={addRestaurant}>
          <Text style={styles.btnText}>Add Restaurant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F4F3",
    justifyContent: "center",
    padding: 16,
  },

  addBtn: {
    backgroundColor: "#50C2C9",
    padding: 12,
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    height: 50,
    marginTop: 60,
    bottom: 0,
  },
  btnText: {
    alignSelf: "center",
    fontWeight: "500",
    color: "white",
    fontSize: 17,
    //add font family
  },
  input: {
    height: 50,
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 16,
    padding: 8,
    width: "95%",
    alignSelf: "center",
  },
  upBtn: {
    borderColor: "grey",
    borderRadius: 20,
    width: "30%",
    backgroundColor: "rgba(217, 217, 217, 0.7)",
    padding: 10,
    alignSelf: "flex-end",
  },
  upText: {
    alignSelf: "center",
    fontWeight: "400",
    fontSize: 13,
  },
  welcomeText: {
    alignSelf: "center",
    margin: 20,
    fontSize: 20,
  },
  icon: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
