
export default function Input({ label, placeholder, value, onChange, className }) {
  return (
    <div className={`mb-4 ${className || ""}`}>
      <label className="block mb-1.5 text-xs text-gray-600">{label}</label>
      <input
        type="text"
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#ffffff",
  },
})

