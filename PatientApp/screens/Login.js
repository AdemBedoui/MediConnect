import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic
    console.log(email, password);
    // On success:
    navigation.navigate("Profile");
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        autoCapitalize="none"
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Forgot Password"
        onPress={() => navigation.navigate("ForgotPassword")}
      />
    </View>
  );
}
