import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import RestaurantListMap from "./RestaurantListMap";
import RestaurantList from "./RestaurantList";

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
    <Tab.Screen
      name="Restaurant List Map"
      component={RestaurantListMap}
      options={{ title: "Map" }}
    />
      <Tab.Screen
        name="Restaurant List"
        component={RestaurantList}
        options={{ title: "List" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
