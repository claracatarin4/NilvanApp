export default function TextArea({ label, placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1.5 text-xs text-gray-600">{label}</label>
      <textarea
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400 min-h-[80px]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
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
  textArea: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#ffffff",
    minHeight: 80,
  },
})
