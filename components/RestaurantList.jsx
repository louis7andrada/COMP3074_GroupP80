import { FlatList, SafeAreaView } from "react-native";
import ListItem from "./ListItem";
// todo: remove dummy data later
import { useState } from "react";
import bootstrap from "../Bootstrap";

export default function RestaurantList(props) {
	const [data, setData] = useState(bootstrap);

	return (
		<SafeAreaView>
			<FlatList
				data={data}
				renderItem={(item) => (
					<ListItem item={item} navigation={props.navigation} />
				)}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
}
