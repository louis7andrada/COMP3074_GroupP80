import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import AddRestaurant from "./components/AddRestaurant";
import Details from "./components/Details";
import Home from "./components/Home";
import RestaurantList from "./components/RestaurantList";

export default function App() {
	const navigation = createStackNavigator();

	return (
		<NavigationContainer>
			<navigation.Navigator>
				<navigation.Screen
					name='Home Page'
					component={Home}
					options={{ title: "Home" }}
				/>
				<navigation.Screen
					name='Restaurant List'
					component={RestaurantList}
					options={{ title: "Restaurant List" }}
				/>
				<navigation.Screen
					name='Add Restaurant'
					component={AddRestaurant}
					options={{ title: "Add Restaurant" }}
				/>
				<navigation.Screen name='Details' component={Details} />
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
	text: {
		color: "red",
	},
});
