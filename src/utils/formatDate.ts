// 날짜 포맷팅 함수
export default function formatDate(targetDate: Date | string, fullDate?: boolean) {
  if (typeof targetDate === 'string') {
    targetDate = new Date(targetDate);
  }
  if (fullDate) {
    return targetDate?.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  return targetDate?.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
