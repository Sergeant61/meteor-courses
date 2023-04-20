
/**
 * JavaScript asenkron çalışan bir script dilidir.
 */
const printLog = function () {
  let message = 'a'

  setTimeout(function () {
    message = 'b'
  }, 100)

  console.log(message)
}

const printLogAsync = async function () {
  let message = 'a'

  await new Promise(function (resolve, reject) {
    setTimeout(function () {
      message = 'b'
      resolve()
    }, 100)
  })

  console.log(message)
}

printLog()
printLogAsync()