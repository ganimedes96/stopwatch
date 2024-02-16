export const formatTime = (millisecond: number) => {
  const milliseconds = Math.floor((millisecond % 100) / 1)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((millisecond / 100) % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((millisecond / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
};