import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { course, Module, Section } from "../../data/course";

export default function ModuleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const module: Module | undefined = course.find((m) => m.id === id);
  if (!module) return <Text style={styles.notFound}>Module not found</Text>;

  const renderSection = ({ item, index }: { item: Section; index: number }) => (
    <TouchableOpacity
      style={styles.sectionCard}
      onPress={() =>
        router.push({
          pathname: `/subsection/${item.title}` as any,
          params: { moduleId: module.id, subIndex: index.toString() },
        })
      }
    >
      <View style={styles.sectionNumberWrapper}>
        <Text style={styles.sectionNumber}>{index + 1}</Text>
      </View>
      <Text style={styles.sectionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{module.title}</Text>
      {module.image && (
        <Image
          source={{ uri: module.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      {module.description && (
        <Text style={styles.description}>{module.description}</Text>
      )}

      <FlatList
        data={module.sections}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderSection}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fdfdfd" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  sectionNumberWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4f8ef7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionNumber: { color: "#fff", fontWeight: "bold" },
  sectionTitle: { fontSize: 16, fontWeight: "600", flexShrink: 1 },
  notFound: { fontSize: 16, textAlign: "center", marginTop: 40, color: "#999" },
});
