import Util from "./isActive"

Template.registerHelper('lt', function(a, b) {
  return a < b;
});

Util.name