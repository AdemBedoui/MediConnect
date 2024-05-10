import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("your-api-endpoint/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `your-api-endpoint/search-doctors?query=${search}`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to search doctors", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search doctors"
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.name} - {item.specialty}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
