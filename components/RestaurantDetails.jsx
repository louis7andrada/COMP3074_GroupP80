import { useEffect, useState } from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import data from "../Bootstrap";
import UserItem from "./UserItem";
import { Rating } from "react-native-ratings";
import Share  from "react-native-share";

export default function RestaurantDetails({ navigation, route }) {
	const { item } = route.params;
	const [reviews, setReviews] = useState([]);

	const sharing = async () => {
		const options = {
			message: 'This is my message'
		}

		try{
			const sharingRes = await Share.open(options)
  
		}catch(err){
			console.log(err)
		}
	}
	useEffect(() => {
		const restaurant = data.find((restaurant) => restaurant.id === item.id);
		if (restaurant) {
			const restaurantReviews = restaurant.reviews || [];
			setReviews(restaurantReviews);
		} else {
			// error handling where restaurant is not found
			console.error(`Restaurant with id ${item.id} not found`);

			// set reviews to an empty array
			setReviews([]);
		}
	}, [item]);

	return (
		<ScrollView style={{ padding: 10 }}>
			<Text
				style={{
					textAlign: "center",
					fontSize: 35,
					fontWeight: "bold",
					marginTop: 20,
					marginBottom: 20,
				}}
			>
				{item.name}
			</Text>
			<View
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Image
					source={{ uri: item.image }}
					style={[
						{
							backgroundColor: "white",
							borderRadius: 8,
							paddingVertical: 45,
							paddingHorizontal: 25,
							marginVertical: 10,
							height: 200,
							width: "100%",
							margin: "auto",
						},
						{
							shadowColor: "#171717",
							shadowOffset: { width: -2, height: 4 },
							shadowOpacity: 0.2,
							shadowRadius: 3,
						},
					]}
				/>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
			<View style={{flexDirection: "row",}}>
			<Text style={{ fontWeight: "bold", fontSize: 15 }}>Ratings: </Text>
				<Rating
					tintColor='#F0F4F3'
					readonly
					imageSize={25}
					startingValue={item.rating}
				/>
			</View>

				<TouchableOpacity
				style={{
					marginRight: 5,
					paddingVertical: 5,
					paddingHorizontal: 10,
					backgroundColor: "#50C2C9",
					borderRadius: 5,
				}}
				onPress={sharing}
				>
				<Text style={{ color: "white", fontWeight: "bold" }}>Share</Text>
				</TouchableOpacity>

			</View>

			<View>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 20,
						margin: 15,
						marginLeft: 0,
					}}
				>
					Description
				</Text>
				<Text>{item.description}</Text>
			</View>
			<View
				style={{
					borderBottomColor: "#A9A9A9",
					borderBottomWidth: 1,
					marginTop: 15,
				}}
			/>
			<View>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 20,
						margin: 20,
						marginLeft: 0,
					}}
				>
					What <Text style={{ color: "#50C2C9" }}>our customers</Text> have to
					say?
				</Text>
			</View>
			<View>
				<FlatList
					data={reviews}
					renderItem={({ item }) => <UserItem item={item} />}
					keyExtractor={(item) => item.userId}
				/>
			</View>
		</ScrollView>
	);
}
