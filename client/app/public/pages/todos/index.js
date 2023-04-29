Template.pagesTodos.onCreated(function () {
  this.state = new ReactiveDict(null, {
    todos: [],
    notFound: false
  })

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 1,
    totalCount: 0,
    totalPages: 0
  })

  this.sorting = new ReactiveDict(null, {
    sortField: 'name',
    sortOrder: 'asc'
  })

  this.filtering = new ReactiveDict(null, {})
})

Template.pagesTodos.onRendered(function () {
  const self = this

  this.autorun(function () {
    AppUtil.refreshTokens.get('todos')
    const currentPage = self.pagination.get('currentPage');
    const pageItems = self.pagination.get('pageItems');

    const obj = {
      options: {
        pagination: {
          currentPage,
          pageItems
        }
      }
    }

    Meteor.call('todos.list', obj, function (error, result) {

      if (error) {
        // todo error handling
        return
      }

      self.state.set('todos', result.todos)
      self.state.set('notFound', result.options.pagination.totalCount === 0)
      self.pagination.set('currentPage', result.options.pagination.currentPage)
      self.pagination.set('pageItems', result.options.pagination.pageItems)
      self.pagination.set('totalCount', result.options.pagination.totalCount)
      self.pagination.set('totalPages', result.options.pagination.totalPages)
    })
  })
})

Template.pagesTodos.events({
  'click .brd-todo-create': function (event, template) {
    template.$('#brdPublicModalsTodoCreateModal').modal('show')
  }
})
