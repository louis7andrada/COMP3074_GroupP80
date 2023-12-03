import { FlatList, Text, Image, View } from "react-native";
import UserItem from "./UserItem";
import { ScrollView } from "react-native-virtualized-view";

export default function RestaurantDetails({ navigation, route }) {
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
        {route.params.item.title}
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/restaurant-details.jpg")}
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
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            margin: 20,
            marginLeft: 0,
          }}
        >
          Description
        </Text>
        <Text>{route.params.item.description}</Text>
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
          data={route.params.item.reviews}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item.userId}
        />
      </View>
    </ScrollView>
  );
}
