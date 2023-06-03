import { Meteor } from 'meteor/meteor'
import { fetch, Headers } from 'meteor/fetch'

const NewsUtil = {
  _apiKey: Meteor.settings.newsApi.apiKey,
  _baseUrl: Meteor.settings.newsApi.baseUrl,

  _getAuthorization: function () {
    return `apikey ${NewsUtil._apiKey}`
  },

  call: function (method, url, options = {}) {
    const _call = async function (method, url, options, callback = function () {}) {
      const headers = options.headers || {}
      const body = options.body || null

      try {
        const response = await fetch(url, {
          method: method,
          headers: new Headers(headers),
          body: body,
        })

        const data = await response.json()

        callback(null, data)
      } catch (err) {
        callback(new Meteor.Error('error', err.message), null)
      }
    }

    return Meteor.wrapAsync(_call)(method, url, options)
  },

  api: {
    getNews: function (country, tag) {
      const url = `${NewsUtil._baseUrl}/news/getNews?country=${country}&tag=${tag}`

      const options = {
        headers: {
          authorization: NewsUtil._getAuthorization(),
          'content-type': 'application/json',
        },
      }

      return NewsUtil.call('GET', url, options)
    }
  },
}

export default NewsUtil
