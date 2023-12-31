import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import HomeIcon from "./../assets/home-icon.png";

export default function Home() {
	const navigation = useNavigation();

	const navigateRestaurants = () => {
		navigation.navigate("Restaurants");
	};

	const navigateAddRestaurant = () => {
		navigation.navigate("Add Restaurant");
	};

	const navigateAbout = () => {
		navigation.navigate("About Us");
	  };

	return (
		<View style={{ flex: 1 }}>
		<ScrollView>
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
					<TouchableOpacity
						style={styles.addBtn}
						onPress={navigateAddRestaurant}
					>
						<Text style={styles.btnText}>Add Restaurant</Text>

						
					</TouchableOpacity>

					<TouchableOpacity style={styles.viewBtn} onPress={navigateRestaurants}>
						<Text style={styles.btnText}>View Restaurants</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
		<TouchableOpacity style={styles.about} onPress={navigateAbout}>
				<Text style={styles.aboutLink}>About Us</Text>
			</TouchableOpacity>
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
		marginTop: 130,
	},
	addBtn: {
		backgroundColor: "#50C2C9",
		padding: 12,
		width: 170,
		height: 50,
		justifyContent: "center",
	},
	viewBtn: {
		backgroundColor: "black",
		padding: 12,
		width: 165,
		height: 50,
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
	about: {
		marginBottom: 50,
	},
	aboutLink: {
		color: "blue",
		marginTop: 15,
		textAlign: "center",
		fontSize: 18,
	}
});
