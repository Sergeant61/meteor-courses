import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutsDefault', { page: 'pagesHome' });
  }
});

FlowRouter.route('/about', {
  name: 'public.about',
  action: function (params, queryParams) {
    this.render('publicLayoutsDefault', { page: 'pagesAbout' });
  }
});

FlowRouter.route('/working', {
  name: 'public.working',
  action: function (params, queryParams) {
    this.render('publicLayoutsDefault', { page: 'pagesWorking' });
  }
});

FlowRouter.route('/Todos', {
  name: 'public.todos',
  action: function (params, queryParams) {
    this.render('publicLayoutsDefault', { page: 'pagesTodos' });
  }
});

FlowRouter.route('*', {
  action() {
    this.render('notFound');
  }
});

