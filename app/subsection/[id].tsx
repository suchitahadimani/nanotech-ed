import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { course, Module, Section } from "../../data/course";

export default function SubsectionScreen() {
  const { moduleId, subIndex } = useLocalSearchParams<{
    moduleId: string;
    subIndex: string;
  }>();
  const router = useRouter();

  const module: Module | undefined = course.find((m) => m.id === moduleId);
  if (!module) return <Text style={styles.notFound}>Module not found</Text>;

  const index = parseInt(subIndex, 10);
  const section: Section | undefined = module.sections[index];
  if (!section) return <Text style={styles.notFound}>Section not found</Text>;

  const goNext = () => {
    if (index + 1 < module.sections.length) {
      const next = module.sections[index + 1];
      router.replace({
        pathname: `/subsection/${next.title}` as any,
        params: { moduleId: module.id, subIndex: (index + 1).toString() },
      });
    } else {
      router.back();
    }
  };

  const goBack = () => {
    if (index > 0) {
      const prev = module.sections[index - 1];
      router.replace({
        pathname: `/subsection/${prev.title}` as any,
        params: { moduleId: module.id, subIndex: (index - 1).toString() },
      });
    } else {
      router.back();
    }
  };

  const renderContent = (text: string) => {
    const boldKeywords = [
      "Advantages",
      "Limitations",
      "Resists",
      "Feature Resolution",
    ];
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      const renderBoldBeforeColon = (str: string) => {
        const colonIndex = str.indexOf(":");
        if (colonIndex > 0) {
          return (
            <Text key={idx} style={styles.bullet}>
              <Text style={styles.bold}>{str.slice(0, colonIndex + 1)}</Text>
              {str.slice(colonIndex + 1)}
            </Text>
          );
        }
        return (
          <Text key={idx} style={styles.bullet}>
            {str}
          </Text>
        );
      };

      if (trimmed.startsWith("-  ")) {
        const content = trimmed.slice(3).trim();
        return (
          renderBoldBeforeColon(content) && (
            <Text key={idx} style={styles.subBullet}>
              ◦ {renderBoldBeforeColon(content)}
            </Text>
          )
        );
      } else if (trimmed.startsWith("- ")) {
        const content = trimmed.slice(2).trim();
        return (
          renderBoldBeforeColon(content) && (
            <Text key={idx} style={styles.bullet}>
              • {renderBoldBeforeColon(content)}
            </Text>
          )
        );
      } else {
        return (
          <Text key={idx} style={styles.content}>
            {trimmed}
          </Text>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{section.title}</Text>

        {section.content && renderContent(section.content)}

        {section.links?.length && (
          <View style={styles.sectionBlock}>
            {section.links.map((link, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => Linking.openURL(link.url)}
              >
                <Text style={styles.link}>• {link.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {section.videos?.length && (
          <View style={styles.sectionBlock}>
            <Text style={styles.subheading}>Videos:</Text>
            {section.videos.map((video, idx) => {
              // Extract YouTube video ID
              const match = video.url.match(/v=([a-zA-Z0-9_-]{11})/);
              const videoId = match ? match[1] : null;
              const thumbnail = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : undefined;

              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.videoCard}
                  onPress={() => Linking.openURL(video.url)}
                >
                  {thumbnail && (
                    <Image
                      source={{ uri: thumbnail }}
                      style={styles.videoThumbnail}
                    />
                  )}
                  <Text style={styles.video}>▶ {video.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.navText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={goNext}>
          <Text style={styles.navText}>
            {index + 1 < module.sections.length ? "Next →" : "Back to Module"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  scrollContent: { padding: 16, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#222" },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 6,
    color: "#444",
    paddingLeft: 10,
  },
  subBullet: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
    color: "#444",
    paddingLeft: 24,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: "#444",
  },

  bold: { fontWeight: "600", color: "#222" },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
  },
  sectionBlock: { marginBottom: 16 },
  link: {
    fontSize: 15,
    color: "#007AFF",
    marginBottom: 6,
    lineHeight: 22,
    paddingLeft: 6,
  },
  videoCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  videoThumbnail: {
    width: "100%",
    height: 180,
  },
  video: {
    fontSize: 15,
    color: "#28A745",
    padding: 8,
    fontWeight: "600",
  },
  navContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  nextButton: {
    backgroundColor: "#4f8ef7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  navText: {
    color: "#222",
    fontWeight: "600",
    fontSize: 14,
  },
  backText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },

  nextText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  notFound: { textAlign: "center", marginTop: 40, fontSize: 16, color: "#999" },
});
