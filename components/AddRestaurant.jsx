import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";


export default function AddRestaurant() {
 

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Add your fav restaurant to your list!</Text>
        <TextInput
            style={styles.input}
            placeholder="    Enter restaurant name..."
        />
        <TextInput
            style={styles.input}
            placeholder="    Enter location..."
        />
         <TextInput
            style={styles.input}
            placeholder="    Description..."
        />
        
        <TouchableOpacity style={styles.upBtn}>
            <Text style={styles.upText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.btnText}>Add Restaurant</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F4F3",
      justifyContent: "center",
      padding: 16,
    },

    addBtn: {
      backgroundColor: "#50C2C9",
      padding: 12,
      alignSelf: "center",
      justifyContent: "center",  
      width: "95%",
      height: 50,
      marginBottom: 65,
      bottom: 0,
      position: "absolute",
   
    },
    btnText: {
      alignSelf: "center",
      fontWeight: "500",
      color: "white",
      fontSize: 17
    },
    input: {
      height: 50,
      borderWidth: 0.3,
      borderColor: "grey",
      borderRadius: 20,
      marginBottom: 16,
      marginTop: 16,
      padding: 8,
      width: '95%',
      alignSelf: "center",
    },
    upBtn: {
        
        borderColor: "grey",
        borderRadius: 20,
        width: '30%',
        backgroundColor: "rgba(217, 217, 217, 0.7)",
        padding: 10,
        alignSelf: "flex-end"
    },
    upText: {
      alignSelf: "center",
      fontWeight: "400",
      fontSize: 13
    },
    welcomeText:{
        alignSelf: "center",
        margin: 10,
        fontSize:15
      },
  });
