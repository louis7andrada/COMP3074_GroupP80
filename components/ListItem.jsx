import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Row from "./Row";
import ResturantIcon from "../assets/restaurant-icon.png";

export default function ListItem(props) {
  return (
    <TouchableOpacity
      key={props.item.id}
      onPress={() => {
        props.navigation.navigate("Details", { item: props.item });
      }}
    >
      <Row>
        <Image source={ResturantIcon} style={{ height: 100, width: 100 }} />
        <View style={styles.container}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.item.title}</Text>
          <Row>
            <Text>Location: </Text>
            <Text>{props.item.location}</Text>
          </Row>
          <Row>
            <Text>Stars: </Text>
            <Text>{props.item.stars}</Text>
          </Row>
        </View>
      </Row>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",

  },
});
