import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantList from "./components/RestaurantList";
import Details from "./components/Details";
import Home from "./components/Home";
import AddRestaurant from "./components/AddRestaurant";
import { Button } from "react-native-web";


export default function App() {
  const navigation = createStackNavigator();

  return (
    <NavigationContainer>
      <navigation.Navigator>
        <navigation.Screen
          name="Home Page"
          component={Home}

        />
        <navigation.Screen
          name="Restaurant List"
          component={RestaurantList}
          options={{ title: "Restaurant List" }}
        />
        <navigation.Screen
          name="Add Restaurant"
          component={AddRestaurant}
          options={{ title: "Add Restaurant" }}
        />
        <navigation.Screen
          name="Details"
          component={Details}
        />
      </navigation.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    color: 'red'
  }
});
