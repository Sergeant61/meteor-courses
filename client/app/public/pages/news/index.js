import { Loading } from 'notiflix/build/notiflix-loading-aio';

Template.pagesNews.onCreated(function () {
  this.state = new ReactiveDict(null, {
    news: [],
    country: 'tr',
    tag: 'general',
  });

  console.log("onCreated");
  this.counties = [
    {key: 'tr', title: 'Türkiye'},
    {key: 'ru', title: 'Rusya'},
    {key: 'en', title: 'İngiltere'},
    {key: 'de', title: 'Almanya'},
  ]
  this.tags = [
    {key: 'general', title: 'Genel'},
    {key: 'sport', title: 'Spor'},
    {key: 'economy', title: 'Ekonomi'},
    {key: 'technology', title: 'Teknoloji'},
  ]
});

Template.pagesNews.helpers({
  counties: function() {
    return Template.instance().counties
  },
  tags: function() {
    return Template.instance().tags
  }
});

Template.pagesNews.onRendered(function () {
  const self = this;

  console.log("onRendered");

  this.autorun(function () {
    const country = self.state.get('country')
    const tag = self.state.get('tag')
    
    console.log("autorun");

    const obj = {
      country,
      tag,
    }

    Loading.dots();
    Meteor.call('news.list', obj, function(error, result) { 
      Loading.remove();
      if (error) { 
        ErrorHandler.show(error, self)
        return
      } 

      console.log(result);
      self.state.set('news', result.result)
    });
  });
});

Template.pagesNews.events({
  'change #brdPagesNewsCountrySelect': function (event, template) {
    console.log(event.target.value);
    template.state.set('country', event.target.value)
  },
  'change #brdPagesNewsTagSelect': function (event, template) {
    console.log(event.target.value);
    template.state.set('tag', event.target.value)
  }
});