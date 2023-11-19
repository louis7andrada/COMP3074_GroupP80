import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Row from "./Row";
import ResturantIcon from "../assets/restaurant-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ListItem(props) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < props.item.stars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          size={20}
          color="gold"
          style={{ marginRight: 5 }}
        />
      );
    }
    return stars;
  };
  return (
    <TouchableOpacity
      key={props.item.id}
      onPress={() => {
        props.navigation.navigate("Details", { item: props.item });
      }}
    >
      <Row>
        <Image source={ResturantIcon} style={{ height: 100, width: 100, marginRight: 10 }} />
        <View style={styles.container}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.item.title}</Text>
          <Row>
            <Text>Location: </Text>
            <Text>{props.item.location}</Text>
          </Row>
          <Row>
            <Text>Stars: </Text>
            {renderStars()}
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
