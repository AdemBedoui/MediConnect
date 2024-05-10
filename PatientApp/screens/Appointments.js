import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("your-api-endpoint/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`your-api-endpoint/cancel-appointment/${id}`);
      setAppointments(appointments.filter((item) => item.id !== id));
      alert("Appointment canceled successfully!");
    } catch (error) {
      console.error("Failed to cancel appointment", error);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.date} at {item.time} with {item.doctor}
            </Text>
            <Button title="Cancel" onPress={() => handleCancel(item.id)} />
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
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
