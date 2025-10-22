import { ScanBarcode } from "lucide-react-native"

export default function BarcodeInput({ label, value, onChange }) {

  const handleScan = () => {
    console.log("[v0] Abrir scanner de código de barras")
  }

  return (
    <div className="mb-4">
      <label className="block mb-1.5 text-xs text-gray-600">{label}</label>
      <div className="flex items-center border border-gray-300 rounded bg-white">
        <input
          type="text"
          className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent border-none outline-none"
          placeholder=""
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={handleScan} className="p-2.5 pr-3">
          <ScanBarcode size={24} className="text-gray-700" />
        </button>
      </div>
    </div>
  )
}

export const styles = StyleSheet.create({
    
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  scanButton: {
    padding: 10,
    paddingRight: 12,
  },
})

