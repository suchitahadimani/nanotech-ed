import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { course } from "../data/course";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={course}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/module/[id]" as any,
                params: { id: item.id },
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 150,
                borderRadius: 12,
                marginBottom: 8,
              }}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.sections.length} lessons</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: "#e5e5ddff",
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#555" },
});
