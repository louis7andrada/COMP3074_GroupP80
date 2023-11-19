import { StyleSheet, Text, TouchableOpacity, View , Image} from "react-native";
import HomeIcon from "./../assets/home-icon.png";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home(props) {

    {/*-------- Navigating by using 'useNavigation()' --------*/}
    const navigation = useNavigation();

    const navigateRestaurant = () => {
        navigation.navigate("Restaurant List");
      };

    const navigateAddRestaurant = () => {
    navigation.navigate("Add Restaurant");
    };  
      


  return (
    <View style={styles.container}>

        {/*-------- Title --------*/}
      <Text style={styles.titleText}>Restaurant Track</Text>

        {/*-------- User Greeting --------*/}
      <Text style={styles.welcomeText}>Welcome to your Restaurant Guide.</Text>
      <Text style={styles.welcomeText}>Because Every Bite Counts! Navigate a world of flavours, 
        appreciate each moment, and make every bite an adventure!</Text>

        {/*-------- Icon --------*/}
      <Image source={HomeIcon} style={styles.icon} />

      <View style={styles.row}>
         {/*-------- Buttons --------*/}
        <TouchableOpacity style={styles.addBtn} onPress={navigateAddRestaurant}>
          <Text style={styles.btnText}>Add Restaurants</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewBtn} onPress={navigateRestaurant}>
          <Text style={styles.btnText}>View Restaurant</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "F0F4F3",
    justifyContent: "space-between", 
    padding: 16 
  },
  row: {
    flexDirection: "row", 
    justifyContent: "space-between",
    marginTop: 60,
  },
  addBtn: {
    backgroundColor: "#50C2C9",
    padding: 12,
    alignSelf: "flex-end",
    width: 150
  },
  viewBtn: {
    backgroundColor: "black",
    padding: 12,
    alignSelf: "flex-end",
    width: 150
  },
  btnText: {
    alignSelf: "center",
    color: "white",
    //add font style later
  },
  titleText: {
    alignSelf: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20
  },
  welcomeText:{
    margin: 10,
    fontSize:15
  },
  icon: {
    width: 200, 
    height: 200, 
    alignSelf: "center",
  }
});
