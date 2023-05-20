Meteor.startup(function () {
  if (Meteor.isCordova) {
    // Wait for the device to be ready
    document.addEventListener(
      'deviceready',
      function () {
        // Autostart plugin
        console.log(window);
        const permissions = cordova.plugins.permissions;

        permissions.checkPermission(permissions.RECEIVE_BOOT_COMPLETED, function (status) {
          console.log(status);
        }, function (error) {
          console.log(error);
        });

        cordova.plugins.autoStart.enable();
      },
      false
    )
  }
})
