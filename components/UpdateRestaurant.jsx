// UpdateScreen.jsx

import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("restaurant.db");

export default function UpdateRestaurant({ route, navigation }) {
	const { item, updateCallback } = route.params;

	// all updateing states
	const [updatedName, setUpdatedName] = useState(item.name);
	const [updatedLocation, setUpdatedLocation] = useState(item.location);
	const [updatedDescription, setUpdatedDescription] = useState(
		item.description,
	);

	const updateRestaurant = () => {
		// error handling if user didn't type sh
		if (!updatedName || !updatedLocation || !updatedDescription) {
			alert("Please fill in all the empty fields.");
			return;
		}

		db.transaction((txn) => {
			txn.executeSql(
				"UPDATE restaurants SET name = ?, location = ?, description = ? WHERE id = ?",
				[updatedName, updatedLocation, updatedDescription, item.id],
				(txtObj, resultSet) => {
					alert("Restaurant updated successfully!");
					// refresh the restaurant list
					updateCallback();

					// navigate back to the restaurant list
					navigation.goBack();
				},

				// error handling
				(txtObj, error) => {
					console.log("Error updating restaurant: ", error);
				},
			);
		});
	};

	return (
		<View style={styles.container}>
			{/* heading */}
			<Text style={styles.heading}>Update Restaurant</Text>

			{/* updateing information */}
			<TextInput
				style={styles.input}
				placeholder='Enter updated name...'
				value={updatedName}
				onChangeText={(text) => setUpdatedName(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder='Enter updated location...'
				value={updatedLocation}
				onChangeText={(text) => setUpdatedLocation(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder='Enter updated description...'
				value={updatedDescription}
				onChangeText={(text) => setUpdatedDescription(text)}
			/>

			{/* button */}
			<TouchableOpacity style={styles.updateBtn} onPress={updateRestaurant}>
				<Text style={styles.btnText}>Update!</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 16,
	},
	heading: {
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},
	input: {
		height: 50,
		borderWidth: 0.3,
		borderColor: "grey",
		borderRadius: 20,
		marginBottom: 16,
		padding: 8,
	},
	updateBtn: {
		backgroundColor: "#50C2C9",
		padding: 14,
		borderRadius: 5,
		// alignSelf: "center",
		alignItems: "center",
		width: "100%",
		height: 50,
		marginTop: 20,
	},
	btnText: {
		alignSelf: "center",
		fontWeight: "500",
		color: "white",
		fontSize: 17,
	},
});
