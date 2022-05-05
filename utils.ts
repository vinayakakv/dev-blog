import moment from 'dayjs'

export const formatDate = (date: string) => moment(date).format('DD MMM YYYY')
