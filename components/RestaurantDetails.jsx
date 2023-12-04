import { FlatList, Text, Image, View } from "react-native";
import UserItem from "./UserItem";
import { ScrollView } from "react-native-virtualized-view";
import { useState } from "react";
import bootstrap from "../Bootstrap";
export default function RestaurantDetails({ navigation, route }) {
  const { item } = route.params
  const [data, setData] = useState(bootstrap);

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
          source={{ uri: item.image}}
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
          data={data}
          renderItem={({ item }) => <UserItem item={item} />}
          keyExtractor={(item) => item.userId}
        />
      </View>
    </ScrollView>
  );
}
