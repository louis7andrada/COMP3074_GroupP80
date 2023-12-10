import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import AddRestaurant from "./components/AddRestaurant";
import RestaurantDetails from "./components/RestaurantDetails";
import Home from "./components/Home";
import RestaurantList from "./components/RestaurantList";
import UpdateRestaurant from "./components/UpdateRestaurant";
import RestaurantMap from "./components/RestaurantMap";
import About from "./components/About"
import BottomNavigation from "./components/BottomNavigation";

export default function App() {
  const navigation = createStackNavigator();

  return (
    <NavigationContainer>
      <navigation.Navigator>
        <navigation.Screen
          name="Home Page"
          component={Home}
          options={{ title: "Home" }}
        />
        <navigation.Screen
          name="Restaurants"
          component={BottomNavigation}
        />
        <navigation.Screen
          name="Add Restaurant"
          component={AddRestaurant}
          options={{ title: "Add Restaurant" }}
        />
        <navigation.Screen
          name="Restaurant Details"
          component={RestaurantDetails}
          option={{ title: "Details" }}
        />
        <navigation.Screen
          name="Update Restaurant"
          component={UpdateRestaurant}
          option={{ title: "Update Restaurant" }}
        />
        <navigation.Screen
          name="Map"
          component={RestaurantMap}
          options={{ title: "Map" }}
        />

        <navigation.Screen
          name="About Us"
          component={About}
          
        />
      </navigation.Navigator>
    </NavigationContainer>
  );
}
