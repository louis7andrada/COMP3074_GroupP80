import { useNavigation } from "@react-navigation/native";
import {
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
// todo: remove dummy data later
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

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
								style={{ height: 100, width: 100, marginRight: 10 }}
							/>
							<View>
								<Text style={styles.restaurantName}>{item.name}</Text>
								<Text style={styles.restaurantLocation}>
									Location: {item.location}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
			/>
			{/*   
    <FlatList
        data={data}
        renderItem={({ item }) => (
          <RestaurantItem item={item} navigation={props.navigation} />
        )}
        keyExtractor={(item) => item.id}
      /> */}
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
	},
});
