import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    // Implement registration logic
    console.log(formData);
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        placeholder="Email"
      />
      <Text>Password:</Text>
      <TextInput
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        placeholder="Password"
        secureTextEntry
      />
      <Text>Confirm Password:</Text>
      <TextInput
        value={formData.confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
