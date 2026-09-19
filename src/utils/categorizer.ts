function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = key(item);
    (acc[group] ||= []).push(item);
    return acc;
  }, {} as Record<string, T[]>);
}
export default groupBy;