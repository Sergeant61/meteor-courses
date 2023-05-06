import Swal from 'sweetalert2'

Template.pagesTodos.onCreated(function () {
  this.state = new ReactiveDict(null, {
    todos: [],
    notFound: false
  })

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 10,
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

  self.subscribeTodos = Meteor.subscribe('todos.list');

  console.log(self.subscribeTodos);

  this.autorun(function () {
    AppUtil.refreshTokens.get('todos')
    const currentPage = self.pagination.get('currentPage')
    const pageItems = self.pagination.get('pageItems')
    const filtering = self.filtering.all()

    const obj = {
      options: {
        pagination: {
          currentPage,
          pageItems
        },
        filtering
      }
    }

    Meteor.call('todos.list', obj, function (error, result) {

      if (error) {
        // todo error handling
        return
      }

      console.log(result)
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
  },
  'click .brd-todo-update': function (event, template) {

    console.log(this);
    AppUtil.temp.set('todo', this)
    template.$('#brdPublicModalsTodoUpdateModal').modal('show')
  },
  'click .brd-todo-delete': function (event, template) {

    const todo = this

    Swal.fire({
      title: 'Emin misin?',
      text: "Veriyi silmek istediğine emin misin?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet',
      cancelButtonText: 'Vazgeç'
    }).then((result) => {
      if (result.isConfirmed) {

        Meteor.call('todos.delete', { _id: todo._id }, function (error, result) {

          if (error) {
            // todo error handling
            return
          }

          AppUtil.refreshTokens.set('todos', Random.id())
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }
})

Template.pagesTodos.onDestroyed(function() { 
  this.subscribeTodos?.stop()
});