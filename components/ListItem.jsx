import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ListItem(props) {
	return (
		<TouchableOpacity
			key={props.item.id}
			onPress={() => {
				props.navigation.navigate("Details", { item: props.item });
			}}
		>
			<Image source={props.item.imageUrl} />
			<Text style={styles.text}>{/*props.item.description*/}test</Text>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	text: {
		color: "red",
		backgroundColor: "blue",
		padding: 60,
		margin: "0 5px",
		border: "solid red 2px",
	},
});
