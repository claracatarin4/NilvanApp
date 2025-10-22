export default function TabBar({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex bg-[#1a3a5c] px-4">
      {tabs.map((tab, index) => {
        const tabKey = tab.toLowerCase()
        const isActive = activeTab === tabKey

        return (
          <button key={index} className="relative flex-1 py-3 text-center" onClick={() => onTabChange(tabKey)}>
            <span className={`text-sm text-white ${isActive ? "opacity-100 font-semibold" : "opacity-70"}`}>{tab}</span>
            {isActive && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ffd700]" />}
          </button>
        )
      })}
    </div>
  )
}

export const styles = StyleSheet.create({
  
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
  activeTab: {
    // Active state handled by indicator
  },
  tabText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.7,
  },
  activeTabText: {
    opacity: 1,
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#ffd700",
  },
})

