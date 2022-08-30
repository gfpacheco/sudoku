export default function formatTime(seconds?: number): string {
  return seconds
    ? `${Math.floor(seconds / 60)}:${(seconds % 60)
        .toString()
        .padStart(2, '0')}`
    : '';
}
