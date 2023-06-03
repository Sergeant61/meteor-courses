import SimpleSchema from 'simpl-schema'
import NewsUtil from '../../../../lib/utils/news-util/server/news-util'

new ValidatedMethod({
  name: 'news.list',
  validate: new SimpleSchema({
    country: String,
    tag: String,
  }).validator(),
  run: function (data) {
    this.unblock()
    const { country, tag } = data


    // throw new Meteor.Error('error', 'Karşı sunucuya ulaşılamadı. timeout')
    // throw new Meteor.Error('html', `<span>Karşı sunucuya ulaşılamadı. timeout</span>`)


    return NewsUtil.api.getNews(country, tag)
  },
})
