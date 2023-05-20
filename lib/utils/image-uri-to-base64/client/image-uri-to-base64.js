const imageUriToBase64 = (imageURI) => {
  return new Promise((resolve, reject) => {
    const errHandler = (error) => {
      reject(error)
    }

    resolveLocalFileSystemURL(
      imageURI,
      function (fileEntry) {
        fileEntry.file(function (file) {
          const reader = new FileReader()

          reader.onloadend = function () {
            resolve(this.result)
          }

          reader.readAsDataURL(file)
        }, errHandler)
      },
      errHandler
    )
  })
}

export { imageUriToBase64 }
