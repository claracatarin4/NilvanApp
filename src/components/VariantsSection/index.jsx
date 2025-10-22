import { Plus } from "lucide-react-native"

export default function VariantsSection() {
  const handleAddVariant = () => {
    console.log("[v0] Adicionar variante")
  }

  return (
    <div className="px-4 pt-2 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Variantes</h2>
        <button onClick={handleAddVariant} className="p-1">
          <Plus size={24} className="text-gray-700" />
        </button>
      </div>
    </div>
  )
}

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
})
