export default function createNineObjects() {
  return Array.from(
    { length: 9 },
    () =>
      ({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
      } as { [key: number]: number }),
  );
}
