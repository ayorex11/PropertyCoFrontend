export const handleNegative = (e:  React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "-" ||
      e.key === "e" ||
      e.key === "E"
    ) {
      e.preventDefault(); // Block negative and scientific notation
    }
}

