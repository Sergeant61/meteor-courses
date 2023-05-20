const { imageUriToBase64 } = require('../../../../../lib/utils/image-uri-to-base64/client/image-uri-to-base64')

Template.pagesWorking.onCreated(function () {
  this.state = new ReactiveDict(null, {
    texts: [],
  })
})

Template.pagesWorking.onRendered(function () {
  const self = this

  // function onDone(err, status) {
  //   if (err) {
  //     // here we can handle errors and clean up any loose ends.
  //     console.error(err)
  //   }
  //   if (status.authorized) {

  //     function displayContents(err, text) {
  //       if (err) {
  //         // an error occurred, or the scan was canceled (error code `6`)
  //       } else {
  //         // The scan completed, display the contents of the QR code:
  //         alert(text)
  //       }
  //     }

  //     QRScanner.scan(displayContents)

  //     // Make the webview transparent so the video preview is visible behind it.
  //     QRScanner.show()
  //     // W00t, you have camera access and the scanner is initialized.
  //     // QRscanner.show() should feel very fast.
  //   } else if (status.denied) {
  //     // The video preview will remain black, and scanning is disabled. We can
  //     // try to ask the user to change their mind, but we'll have to send them
  //     // to their device settings with `QRScanner.openSettings()`.
  //   } else {
  //     // we didn't get permission, but we didn't get permanently denied. (On
  //     // Android, a denial isn't permanent unless the user checks the "Don't
  //     // ask again" box.) We can ask again at the next relevant opportunity.
  //   }
  // }

  // QRScanner.prepare(onDone) // show the prompt
})

Template.pagesWorking.helpers({
  count: function () {
    return Template.instance().count
  },
  maps: function () {
    return Template.instance().maps
  },
  todos: function () {
    return Todos.find().fetch()
  },
})

Template.pagesWorking.events({
  'click #text': function (event, template) {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true,
      sourceType: Camera.PictureSourceType.CAMERA,
    })

    async function onSuccess(imageURI) {
      const base64 = await imageUriToBase64(imageURI)
      const image = document.getElementById('myImage')
      image.src = base64
      window.textocr.recText(0, imageURI, onSuccess1, onFail1) // removed returnType (here 3) from version 2.0.0
      // for sourceType Use 0,1,2,3 or 4
      // for returnType Use 0,1,2 or 3 // 3 returns duplicates[see table]
      function onSuccess1(result) {
        console.log(result)
        template.state.set('texts', result.words.wordtext)
      }
      function onFail1(message) {
        alert('Failed because: ' + message)
      }
    }

    function onFail(message) {
      alert('Failed because: ' + message)
    }
  },
  'click #qr': function (event, template) {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        console.log(result);
        alert('We got a barcode\n' + 'Result: ' + result.text + '\n' + 'Format: ' + result.format + '\n' + 'Cancelled: ' + result.cancelled)
      },
      function (error) {
        console.log(error);
        alert('Scanning failed: ' + error)
      },
      {
        preferFrontCamera: false, // iOS and Android
        showFlipCameraButton: true, // iOS and Android
        showTorchButton: true, // iOS and Android
        torchOn: true, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt: 'Place a barcode inside the scan area', // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: 'QR_CODE,DATA_MATRIX,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,CODABAR,ITF,RSS14,PDF_417,RSS_EXPANDED,MSI,AZTEC', // default: all but PDF_417 and RSS_EXPANDED
        orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true, // iOS
        disableSuccessBeep: false, // iOS and Android
      }
    )
  },
})
