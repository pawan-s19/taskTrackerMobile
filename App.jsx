import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import Tab from "./components/Tab";
import GlobalProvider from "./contexts/context.jsx";

export default function App() {
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <Header />
        <Tab />
      </GlobalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
