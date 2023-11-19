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
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{props.item.title}</Text>
          <Text style={styles.text}>{props.item.description}</Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});
