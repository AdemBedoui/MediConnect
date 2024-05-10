import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    // Implement reset password logic
    console.log(email);
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email to reset password"
      />
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
}
