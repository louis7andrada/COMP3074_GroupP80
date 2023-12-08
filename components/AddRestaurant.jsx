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
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function AddRestaurant() {
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const navigation = useNavigation();
  const db = SQLite.openDatabase("restaurant.db");
  const tags = [
    { label: "Vegan", color: "#8CC084" },
    { label: "Ethnic", color: "yellow" },
    { label: "Fast Food", color: "#FF1654" },
    { label: "Buffet", color: "#00E8FC" },
    { label: "Cafe", color: "#E0C1B3" },
    { label: "Other", color: "grey" },
  ];

  const selectTag = (tag) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS restaurants (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  name TEXT,
		  location TEXT,
		  description TEXT,
		  image TEXT,
      rating INTEGER,
      tag TEXT
		)`
      );
      fetchRestaurants();
    });
  }, []);

  const fetchRestaurants = () => {
    db.transaction((txn) => {
      txn.executeSql("SELECT * FROM restaurants", [], (txtObj, resultSet) => {
        setRestaurants(resultSet.rows._array);
      });
    });
  };

  const addRestaurant = () => {
    if (!restaurantName || !location || !description) {
      alert("Please fill in all the empty fields.");
      return;
    }
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO restaurants (name, location, description, image, rating) VALUES (?, ?, ?, ?, ?)",
        [restaurantName, JSON.stringify(location), description, image, rating],
        (txtObj, resultSet) => {
          alert("Restaurant added successfully!");
          setRestaurantName("");
          setLocation("");
          setDescription("");
          setImage("");
          setRating(0);
        },

        (txtObj, error) => {
          console.log("Error adding restaurant: ", error);
        }
      );
    });
  };
  // uploading Image
  const uploadImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const onLocationChange = (locationName) => {
    setLocation(locationName);
  };

  const navigateToRestaurantMap = () => {
    navigation.navigate("Map", { onLocationChange: onLocationChange, location: location });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={FoodIcon} style={styles.icon} />
        <Text style={styles.welcomeText}>
          Add your fav restaurant to your list!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name..."
          value={restaurantName}
          onChangeText={(text) => setRestaurantName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description..."
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View style={styles.locationView}>
          <Text style={[styles.locationText]}>{location.name}</Text>
          <TouchableOpacity
            style={[styles.locationBtn, { flex: 1 }]}
            onPress={navigateToRestaurantMap}
          >
            <Text style={styles.upText}>Select Location</Text>
          </TouchableOpacity>
        </View>
        {location && (
          <MapView
            provider={PROVIDER_GOOGLE}
            region={{
              longitude: location.coordinate.longitude,
              latitude: location.coordinate.latitude,
              latitudeDelta: 0.00023,
              longitudeDelta: 0.00234,
            }}
            style={{
              height: 100,
              width: "95%",
              alignSelf: "center",
              borderRadius: 10,
            }}
          >
            <Marker
              key={location.placeId}
              coordinate={location.coordinate}
              title={restaurantName}
              description={description}
            />
          </MapView>
        )}
        <View style={styles.locationView}>
          <Text style={[styles.locationText]}>
            {image && image.split("/")[image.split("/").length - 1]}
          </Text>
          <TouchableOpacity
            style={[styles.locationBtn, { flex: 1 }]}
            onPress={uploadImg}
          >
            <Text style={styles.upText}>Upload Image</Text>
          </TouchableOpacity>
        </View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              height: 100,
              width: "95%",
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
        )}
        <View style={styles.tagContainer}>
          {tags.map((tagItem) => (
            <TouchableOpacity
              key={tagItem.label}
              style={[
                styles.tagButton,
                {
                  backgroundColor:
                    selectedTag === tagItem.color ? tagItem.color : "#fff",
                },
              ]}
              onPress={() => selectTag(tagItem.color) }
            >
              <Text
                style={{
                  color: selectedTag === tagItem ? "#fff" : "#000",
                }}
              >
                {tagItem.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Rating
          style={{
            alignSelf: "center",
            width: "90%",
            borderRadius: 20,
            height: 90,
            marginTop: 10,
          }}
          showRating
          type="custom"
          ratingColor="gold"
          tintColor="#F0F4F3"
          imageSize={40}
          startingValue={rating}
          onFinishRating={(value) => setRating(value)}
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
    marginTop: 20,
    marginBottom: 20,
    bottom: 0,
  },
  btnText: {
    alignSelf: "center",
    fontWeight: "500",
    color: "white",
    fontSize: 17,
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
  locationText: {
    alignSelf: "center",
    flex: 2,
    textAlign: "center",
  },
  locationView: {
    height: 50,
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 16,
    textAlign: "center",
    width: "95%",
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  locationBtn: {
    borderColor: "grey",
    borderRadius: 20,
    backgroundColor: "rgba(217, 217, 217, 0.7)",
    padding: 14,
    fontWeight: "bold",
  },
  upBtn: {
    borderColor: "grey",
    borderRadius: 20,
    width: "30%",
    backgroundColor: "rgba(217, 217, 217, 0.7)",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
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
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
  },
  tagButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
});
