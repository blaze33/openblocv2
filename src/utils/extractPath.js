
(function (console) {
  console.save = function (data, filename) {
    if (!data) {
      console.error('Console.save: No data')
      return
    }

    if (!filename) filename = 'console.json'

    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4)
    }

    const blob = new Blob([data], {type: 'text/json'})
    const e = document.createEvent('MouseEvents')
    const a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console)

const arr = Array.prototype.slice.call(document.getElementsByTagName('path'))
const out = arr.map((el, i) => {
  return {
    length: el.getTotalLength(),
    path: Array.prototype.slice.call(el.pathSegList).map((el) => {
      return {x: el.x, y: el.y, letter: el.pathSegTypeAsLetter}
    })
  }
})

console.save(out, 'out.json')
