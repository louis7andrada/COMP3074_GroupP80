import { FlatList, SafeAreaView } from "react-native";
import RestaurantItem from "./RestaurantItem";
// todo: remove dummy data later
import { useState } from "react";
import bootstrap from "../Bootstrap";

export default function RestaurantList(props) {
  const [data, setData] = useState(bootstrap);

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
        data={data}
        renderItem={({ item }) => (
          <RestaurantItem item={item} navigation={props.navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
