export default function mapRawToBoxIndex(index: number) {
  return (Math.floor((index % 9) / 3) % 9) + Math.floor(index / 27) * 3;
}
