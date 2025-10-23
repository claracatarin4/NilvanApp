import { View, Text, Pressable, StyleSheet } from "react-native"

export const TabBar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const tabKey = tab.toLowerCase()
        const isActive = activeTab === tabKey

        return (
          <Pressable key={index} style={styles.tab} onPress={() => onTabChange(tabKey)}>
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
            {isActive && <View style={styles.activeIndicator} />}
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1a3a5c",
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
  },
  tabTextActive: {
    opacity: 1,
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#ffd700",
  },
})
