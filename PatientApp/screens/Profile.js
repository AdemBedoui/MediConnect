import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Fetch user info from backend
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("your-api-endpoint/user-info");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put("your-api-endpoint/update-user-info", userInfo);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        value={userInfo.name}
        onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        placeholder="Name"
        style={styles.input}
      />
      <Text>Email:</Text>
      <TextInput
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        placeholder="Email"
        style={styles.input}
      />
      <Text>Phone:</Text>
      <TextInput
        value={userInfo.phone}
        onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
        placeholder="Phone"
        style={styles.input}
      />
      <Button title="Update Profile" onPress={handleUpdate} />
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
});
