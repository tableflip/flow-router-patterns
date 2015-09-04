// ******************* GLOBAL SETTINGS *****************************

function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    redirect('/dashboard')
  }
}

function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId() && !Meteor.loggingIn()) {
    redirect('/')
  }
}
// ************************* ROUTES ********************************

var publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [
    redirectIfLoggedIn
  ]
})

publicRoutes.route('/', {
  name: 'home',
  triggersEnter: [],
  action: function (params, queryParams) {
    BlazeLayout.render('layout', {template: 'home'})
  },
  triggersExit: []
})

publicRoutes.route('/public', {
  name: 'public',
  triggersEnter: [],
  action: function (params, queryParams) {
    BlazeLayout.render('layout', {template: 'public'})
  },
  triggersExit: []
})

var privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [
    checkLoggedIn
  ]
})

privateRoutes.route('/private', {
  name: 'private',
  triggersEnter: [],
  action: function (params, queryParams) {
    BlazeLayout.render('layout', {template: 'private'})
  },
  subscriptions: function (params, queryParams) {
    var opts = {}
    if (queryParams.type) opts.type = queryParams.type
    this.register('test', Meteor.subscribe('test', opts))
  },
  triggersExit: []
})

privateRoutes.route('/dashboard', {
  name: 'dashboard',
  triggersEnter: [],
  action: function (params, queryParams) {
    BlazeLayout.render('layout', {template: 'dashboard'})
  },
  triggersExit: []
})
