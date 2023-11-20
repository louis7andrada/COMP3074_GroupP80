import { Image, View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Row from "./Row";

export default function UserItem(props) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < props.item.starsGiven; i++) {
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
    <Row>
      <Image
        source={require("../assets/customer-icon.png")}
        style={{ height: 100, width: 100, borderRadius: 25 }}
      ></Image>
      <View
        style={{
          marginLeft: 10,
          display: "flex",
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft: 0, margin: 5 }}>
          {props.item.name}
        </Text>
        <Row>{renderStars()}</Row>
        <Text>{props.item.comment}</Text>
      </View>
    </Row>
  );
}
