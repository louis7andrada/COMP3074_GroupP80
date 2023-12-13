import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import * as SQLite from "expo-sqlite";
import * as ImagePicker from "expo-image-picker";
import { Rating } from "react-native-ratings";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const db = SQLite.openDatabase("restaurant.db");

export default function UpdateScreen({ route, navigation }) {
	const { item, updateCallback } = route.params;

	const [updatedName, setUpdatedName] = useState(item.name);
	const [updatedLocation, setUpdatedLocation] = useState(item.location);
	const [updatedLatitude, setUpdatedLatitude] = useState(0);
	const [updatedLongitude, setUpdatedLongitude] = useState(0);
	const [updatedDescription, setUpdatedDescription] = useState(
		item.description,
	);
	const [updatedImage, setUpdatedImage] = useState(item.image);
	const [updatedRating, setUpdatedRating] = useState(item.rating);
	const [mapVisible, setMapVisible] = useState(false);

	useEffect(() => {
		setUpdatedLocation(JSON.parse(item.location).name);
		setUpdatedLatitude(JSON.parse(item.location).coordinate.latitude);
		setUpdatedLongitude(JSON.parse(item.location).coordinate.longitude);
		setUpdatedImage(item.image);
		setUpdatedRating(item.rating);
	}, [item.location, item.image, item.rating]);

	const updateRestaurant = () => {
		if (!updatedName || !updatedLocation || !updatedDescription) {
			alert("Please fill in all the empty fields.");
			return;
		}

		db.transaction((txn) => {
			txn.executeSql(
				"UPDATE restaurants SET name = ?, location = ?, description = ?, image = ?, rating = ? WHERE id = ?",
				[
					updatedName,
					JSON.stringify({
						coordinate: {
							latitude: updatedLatitude,
							longitude: updatedLongitude,
						},
						name: updatedLocation,
					}),
					updatedDescription,
					updatedImage,
					updatedRating,
					item.id,
				],
				(txtObj, resultSet) => {
					alert("Restaurant updated successfully!");
					updateCallback();
					navigation.goBack();
				},
				(txtObj, error) => {
					console.log("Error updating restaurant: ", error);
				},
			);
		});
	};

	const onMapPress = (e) => {
		setUpdatedLatitude(e.nativeEvent.coordinate.latitude);
		setUpdatedLongitude(e.nativeEvent.coordinate.longitude);
	};

	const uploadImg = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			setUpdatedImage(result.uri);
		} else {
			alert("You did not select any image.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Update Restaurant</Text>

			<TextInput
				style={styles.input}
				placeholder='Enter updated name...'
				value={updatedName}
				onChangeText={(text) => setUpdatedName(text)}
			/>

			<TextInput
				style={styles.input}
				placeholder='Enter updated description...'
				value={updatedDescription}
				onChangeText={(text) => setUpdatedDescription(text)}
			/>

			<TouchableOpacity
				style={styles.upBtn}
				onPress={() => setMapVisible(true)}
			>
				<Text style={styles.upText}>Choose new location</Text>
			</TouchableOpacity>

			{mapVisible && (
				<MapView
					provider={PROVIDER_GOOGLE}
					style={{ height: 200, width: "100%", marginTop: 10 }}
					region={{
						latitude: updatedLatitude,
						longitude: updatedLongitude,
						latitudeDelta: 0.0022,
						longitudeDelta: 0.0021,
					}}
					onPress={onMapPress}
				>
					<Marker
						coordinate={{
							latitude: updatedLatitude,
							longitude: updatedLongitude,
						}}
					/>
				</MapView>
			)}

			<TouchableOpacity style={styles.upBtn} onPress={uploadImg}>
				<Text style={styles.upText}>Update Image</Text>
			</TouchableOpacity>

			{updatedImage && (
				<Image
					source={{ uri: updatedImage }}
					style={{
						width: 100,
						height: 100,
						alignSelf: "center",
						marginTop: 10,
					}}
				/>
			)}

			<Rating
				style={{
					alignSelf: "center",
					width: "90%",
					borderRadius: 20,
					height: 90,
					marginTop: 10,
				}}
				showRating
				type='custom'
				ratingColor='gold'
				tintColor='#F0F4F3'
				imageSize={40}
				startingValue={updatedRating}
				onFinishRating={(value) => setUpdatedRating(value)}
			/>

			<TouchableOpacity style={styles.updateBtn} onPress={updateRestaurant}>
				<Text style={styles.btnText}>Update Restaurant</Text>
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
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
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
	upBtn: {
		borderColor: "grey",
		borderRadius: 20,
		width: "100%",
		backgroundColor: "rgba(217, 217, 217, 0.7)",
		padding: 15,
		marginTop: 10,
		marginBottom: 10,
		alignSelf: "flex-end",
	},
	upText: {
		alignSelf: "center",
		fontWeight: "400",
		fontSize: 13,
	},
	updateBtn: {
		backgroundColor: "#50C2C9",
		padding: 14,
		borderRadius: 5,
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
