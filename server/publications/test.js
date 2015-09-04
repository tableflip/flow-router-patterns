Meteor.publish('test', function (opts) {
  var match = {
    type: Match.Optional(String)
  }
  if (!Match.test(opts, match)) return this.ready()
  return Test.find(opts)
})
