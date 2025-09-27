import PersonCard from "@/components/person-card";
import { ThemedView } from "@/components/themed-view";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function People() {
  const people = [
    {
      name: "Ethan Ahn",
      title: "Associate Professor",
      imageUrl: "https://picsum.photos/400/206",
    },
    {
      name: "Alice",
      title: "Researcher",
      imageUrl: "https://picsum.photos/400/207",
    },
    {
      name: "Bob",
      title: "Lecturer",
      imageUrl: "https://picsum.photos/400/208",
    },
    {
      name: "Diana",
      title: "Scientist",
      imageUrl: "https://picsum.photos/400/209",
    },
  ];

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={{fontSize:15, margin:6, marginBottom:10}}>These are the GMU Faculty</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        
        {people.map((person, index) => (
          <PersonCard key={index} {...person} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    flexGrow: 1,
  },
});
