import {
	FlatList,
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import RestaurantItem from "./RestaurantItem";
import { useNavigation } from "@react-navigation/native";
// todo: remove dummy data later
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import bootstrap from "../Bootstrap";
import { Rating } from "react-native-ratings";

export default function RestaurantList() {
	const [restaurants, setRestaurants] = useState([]);

	const db = SQLite.openDatabase("restaurant.db");

	const fetchRestaurants = () => {
		db.transaction((txn) => {
			txn.executeSql("SELECT * FROM restaurants", [], (txtObj, resultSet) => {
				setRestaurants(resultSet.rows._array);
			});
		});
	};

	const navigation = useNavigation();

	const navigateDescription = (restaurant) => () => {
		navigation.navigate("Restaurant Details", { item: restaurant });
	};

	// ================== delete a restaurant ==================
	const deleteRestaurant = (id) => {
		db.transaction((txn) => {
			txn.executeSql(
				"DELETE FROM restaurants WHERE id = ?",
				[id],
				(txtObj, resultSet) => {
					// ================== refresh the restaurant list after deletion ==================
					fetchRestaurants();
				},
				(txtObj, error) => {
					console.log("Error deleting restaurant: ", error);
				},
			);
		});
	};

	useEffect(() => {
		fetchRestaurants();
	}, []);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				backgroundColor: "#ecf0f1",
				padding: 8,
			}}
		>
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
									Location: {item.location}
								</Text>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Text>Ratings: </Text>
									<Rating
										tintColor='#F0F4F3'
										readonly
										imageSize={25}
										startingValue={item.rating}
									/>
								</View>
								<View style={{ flexDirection: "row", marginTop: 8 }}>
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
				keyExtractor={(item) => item.id.toString()} // use toString() for keyExtractor
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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
		backgroundColor: "#50C2C9",
		padding: 8,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 14,
	},
});
