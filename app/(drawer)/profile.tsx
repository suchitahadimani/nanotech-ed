import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Card, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function Profile() {
  // HARD CODED VALUES
  const userName = "Suchita Hadimani";

  const weekData = [true, false, true, true, true, false, true];

  let streak = 0;
  for (let i = weekData.length - 1; i >= 0; i--) {
    if (weekData[i]) streak++;
    else break;
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Profile Settings</ThemedText>
      </ThemedView>

      <ThemedText type="default">
        Welcome to your profile section. Here you’ll find your account details
        and settings.
      </ThemedText>
      <Card containerStyle={styles.card}>
        <Card.Title>{userName}</Card.Title>
        <Icon name="person" size={30} color="#000000ff" />
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>Learning Progress</Card.Title>
        <Card.Divider />

        <ThemedView style={styles.progressRow}>
          <AnimatedCircularProgress
            size={120}
            width={12}
            fill={48}
            tintColor="#6200ee"
            backgroundColor="#e0e0e0"
            rotation={0}
          >
            {(fill: number) => (
              <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>
            )}
          </AnimatedCircularProgress>

          <ThemedView style={styles.textBlock}>
            <Text style={styles.title}>Modules Completed</Text>
            <Text style={styles.subtitle}>12 of 25</Text>
          </ThemedView>
        </ThemedView>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>Learning Streak</Card.Title>
        <Card.Divider />

        <ThemedView style={styles.weekRow}>
          {weekData.map((studied, index) => (
            <ThemedView
              key={index}
              style={[
                styles.dayBox,
                { backgroundColor: studied ? "#6200ee" : "#e0e0e0" },
              ]}
            >
              <Text style={[styles.dayText, studied && { color: "white" }]}>
                {daysOfWeek[index].charAt(0)}
              </Text>
            </ThemedView>
          ))}
        </ThemedView>

        <Text style={styles.streakText}>
          🔥 Current Streak: {streak} {streak === 1 ? "day" : "days"}
        </Text>
      </Card>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  card: {
    borderRadius: 12,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  progressText: {
    fontSize: 20,
    fontWeight: "700",
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  dayBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontWeight: "700",
  },
  streakText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
