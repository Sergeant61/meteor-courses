import dayjs from 'dayjs'

Template.registerHelper('formatDateTime', function (a) {
  return a ? dayjs(a).format('MM/DD/YYYY - HH:mm:ss') : '~'
})

Template.registerHelper('formatDate', function (a) {
  return a ? dayjs(a).format('MM/DD/YYYY') : '~'
})

Template.registerHelper('formatDateForInput', function (a) {
  return a ? dayjs(a).format('YYYY-MM-DD') : '~'
})
