import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function App() {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);

  const colorScheme = useColorScheme();

  useEffect(() => {
    let interval;
    if (paused) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => setTime((t) => t + 10), 10);
    }

    return () => clearInterval(interval);
  }, [paused]);

  const togglePause = () => setPaused(!paused);

  const clear = () => {
    if (paused) {
      setTime(0);
    }
  };

  const lightBgColor = time === 0 ? "white" : paused ? "#f5675d" : "#5df574";
  const darkBgColor = time === 0 ? "black" : paused ? "#850a01" : "#018506";

  const minutes = `${Math.floor(time / 60000)}`.padStart(2, "0");
  const seconds = `${Math.floor(time / 1000) % 60}`.padStart(2, "0");
  const milliseconds = `${Math.floor(time / 10) % 100}`.padStart(2, "0");

  return (
    <Pressable
      onPress={togglePause}
      onLongPress={clear}
      style={{
        ...styles.container,
        backgroundColor: colorScheme === "light" ? lightBgColor : darkBgColor,
      }}
    >
      <Text
        style={{
          ...styles.display,
          color: colorScheme === "light" ? "black" : "white",
        }}
      >
        {minutes}:{seconds}.{milliseconds}
      </Text>
      <StatusBar style="auto" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  display: {
    fontSize: 60,
    fontVariant: ["tabular-nums"],
  },
});
