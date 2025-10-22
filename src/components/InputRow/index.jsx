export default function InputRow({ children }) {
  return <div className="flex gap-3">{children}</div>
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
})