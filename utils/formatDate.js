export const formatDate = (date) => {
  return new Date(date).toDateString().substring(3);
};
