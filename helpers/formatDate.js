const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are zero indexed
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  return `${day}/${month}/${year}`;
};

const getWeekStartAndEnd = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // if today is Sunday, set to last Monday, else calculate diff to this week's Monday
  const diffToSunday = 7 - dayOfWeek; // Difference to next Sunday

  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0); // Set to start of the day

  const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToSunday);
  endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

  return { startOfWeek, endOfWeek };
};

module.exports = {formatDate, getWeekStartAndEnd};