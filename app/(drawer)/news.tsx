import NewsCard from "@/components/news-card";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function News() {
  const [search, setSearch] = useState("");
  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{ flexDirection: "row", width: "100%", padding: 12, gap: 8 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <Button
          title="Search"
          onPress={() => Alert.alert("Searching .. ")}
          buttonStyle={{ borderRadius: 8, height: 40, paddingHorizontal: 16 }}
        />
      </View>

      <ScrollView>
        <NewsCard
          title="New Design Packs Two Qubits into One Superconducting Junction"
          subtitle="Quantum computers are potentially revolutionary devices and the basis of a growing industry."
          imageUrl="https://picsum.photos/400/206"
        />
        <NewsCard
          title="Breaking News: Expo Router is Amazing"
          subtitle="Learn how to build nested Drawer + Tabs navigators."
          imageUrl="https://picsum.photos/400/207"
        />
        <NewsCard
          title="Another Article"
          subtitle="Subtitle goes here."
          imageUrl="https://picsum.photos/400/208"
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    flex: 1,
    height: 40,
  },
});
