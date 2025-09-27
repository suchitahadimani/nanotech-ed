import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

interface PersonCardProps {
  title?: string;
  name: string;
  imageUrl?: string;
}

const screenWidth = Dimensions.get("window").width;

const PersonCard: React.FC<PersonCardProps> = ({ title, name, imageUrl }) => {
  return (
    <TouchableOpacity
      style={styles.card} 
      onPress={() => Alert.alert(`${name} was clicked`)}
      activeOpacity={0.8}
    >
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        {title && <Text style={styles.name}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    width: screenWidth / 2 - 12 
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: "#666",
  },
});

export default PersonCard;
