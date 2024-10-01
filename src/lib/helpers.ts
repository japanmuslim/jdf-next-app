export const timeAgo = (date: string) => {
  const currentDate = new Date();
  const createdAt = new Date(date);
  const diffTime = Math.abs(currentDate.getTime() - createdAt.getTime());

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)); // Estimasi bulan sebagai 30 hari

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  }
};
