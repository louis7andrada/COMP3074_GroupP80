import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeIcon from "./../assets/home-icon.png";

export default function Home(props) {
	const navigation = useNavigation();

	const navigateRestaurant = () => {
		navigation.navigate("Restaurant List");
	};

	const navigateAddRestaurant = () => {
		navigation.navigate("Add Restaurant");
	};

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				{/* Title */}
				<Text style={styles.titleText}>Restaurant Track</Text>

				{/* User Greeting */}
				<Text style={styles.welcomeText}>
					Welcome to your Restaurant Guide.
				</Text>
				<Text style={styles.welcomeText}>
					Because Every Bite Counts! Navigate a world of flavours, appreciate
					each moment, and make every bite an adventure!
				</Text>
			</View>

			{/* Icon */}
			<Image source={HomeIcon} style={styles.icon} />

			<View style={styles.row}>
				{/* Buttons */}
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
		backgroundColor: "#F0F4F3",
		justifyContent: "space-between",
		padding: 16,
	},
	topContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 80,
	},
	addBtn: {
		backgroundColor: "#50C2C9",
		padding: 12,
		width: 160,
		height: 45,
		justifyContent: "center",
	},
	viewBtn: {
		backgroundColor: "black",
		padding: 12,
		width: 160,
		height: 45,
		justifyContent: "center",
	},
	btnText: {
		alignSelf: "center",
		color: "white",
		fontWeight: "500",
	},
	titleText: {
		fontSize: 35,
		fontWeight: "bold",
		marginBottom: 70,
	},
	welcomeText: {
		display: "flex",
		justifyContent: "center",
		textAlign: "center",
		margin: 10,
		fontSize: 15,
	},
	icon: {
		width: 200,
		height: 200,
		alignSelf: "center",
	},
});
