export function formatDate(date: string | Date, format: string = 'YYYY-MM-DD HH:mm:ss') {
  const year = new Date(date).getFullYear()
  // 不足两位补0
  const month = new Date(date).getMonth() + 1
  const day = new Date(date).getDate()
  const hour = new Date(date).getHours()
  const minute = new Date(date).getMinutes()
  const second = new Date(date).getSeconds()
  return format
    .replace('YYYY', year.toString().padStart(4, '0'))
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('HH', hour.toString().padStart(2, '0'))
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('ss', second.toString().padStart(2, '0'))
}
