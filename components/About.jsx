import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function About() {
  const teamMembers = [
    { name: "Sarah Moustafa", id: "101376641" },
    { name: "Jayden Nguyen", id: "101363755" },
    { name: "Jerome Delos Reyes", id: "101324620" },
    { name: "Louis Procopio Andrada", id: "101356043" },
 
  ];

  return (
    <View style={styles.container}>

      <View style={styles.table}>
  
        <View style={styles.row}>
          <Text style={styles.head}>Name</Text>
          <Text style={styles.head}>Student ID</Text>
        </View>

        {teamMembers.map((student, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.cell}>{student.name}</Text>
            <Text style={styles.cell}>{student.id}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F3",
    padding: 16,
    justifyContent: "center",
  },
  table: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 10,
  },
  head: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
});
