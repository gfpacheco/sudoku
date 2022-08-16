export default function shouldResetSelection(
  event: React.MouseEvent | MouseEvent,
) {
  return !event.ctrlKey && !event.metaKey && !event.shiftKey;
}
