import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from "react-native";
import FoodIcon from "./../assets/food.png";
import * as SQLite from "expo-sqlite";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {  Rating} from "react-native-ratings"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function AddRestaurant() {
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [restaurants, setRestaurants] = useState([]);

  const db = SQLite.openDatabase("restaurant.db");

  useEffect(() => {
	db.transaction((txn) => {
	  txn.executeSql(
		`CREATE TABLE IF NOT EXISTS restaurants (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  name TEXT,
		  location TEXT,
		  description TEXT,
		  image TEXT,
      rating INTEGER
		)`
	  );
	  // txn.executeSql(`DROP TABLE restaurants`);
	  // todo delete, for tests only
	//   txn.executeSql(`DELETE FROM restaurants`);
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
      alert('Please fill in all the empty fields.');
      return;
    }
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO restaurants (name, location, description, image, rating) VALUES (?, ?, ?, ?, ?)",
        [restaurantName, location, description, image, rating],
        (txtObj, resultSet) => {
          console.log("Restaurant added successfully!");
          setRestaurantName("");
          setLocation("");
          setDescription("");
		      setImage("")
		      setRating(0)
        },
        (txtObj, error) => {
          console.log("Error adding restaurant:", error);
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
		alert('You did not select any image.');
	  }
  };
  

  const showRestaurants = () => {
    return restaurants.map((element, index) => (
      <View key={index}>
        <Text>{element.name} {element.location} {element.description}</Text>
      </View>
    ));
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
		<TouchableOpacity style={styles.upBtn} onPress={uploadImg}>
          <Text style={styles.upText}>Upload Image</Text>
        </TouchableOpacity>

		{image && (
          <Image source={{ uri: image }} 
		  style={{ width: 100, height: 100, alignSelf: "center", marginTop: 10 }} />
        )}

      <Rating
          style={{alignSelf: "center", width: "90%", 
          borderRadius:20, height: 90,  marginTop: 10}}
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
});
