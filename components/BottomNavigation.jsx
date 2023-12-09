import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import RestaurantListMap from "./RestaurantListMap";
import RestaurantList from "./RestaurantList";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap, faList } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function BottomNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Restaurant List"
        component={RestaurantList}
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faList} color={color} />
          ),
          tabBarActiveTintColor: "#50C2C9",
          headerShown: false,
          headerMode: "none",
        }}
      />
      <Tab.Screen
        name="Restaurant List Map"
        component={RestaurantListMap}
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faMap} color={color} />
          ),
          tabBarActiveTintColor: "#50C2C9",
          headerShown: false,
          headerMode: "none",
        }}
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
