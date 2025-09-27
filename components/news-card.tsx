import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface NewsCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Alert.alert(`${title} was clicked`)}
      activeOpacity={0.8}
    >
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    marginHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 0, // no extra padding if you want flush
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});

export default NewsCard;
