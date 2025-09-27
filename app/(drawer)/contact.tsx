import { Button, Card } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput } from "react-native";

export default function ContactUsCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    Alert.alert("Thank you!", `Message sent by ${name}`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Contact Us</Card.Title>
      <Card.Divider />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your message"
        multiline
        numberOfLines={10}
        value={message}
        onChangeText={setMessage}
      />

      <Button
        title="Send Message"
        onPress={handleSubmit}
        buttonStyle={{ borderRadius: 8, marginTop: 12 }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginTop: 0,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
