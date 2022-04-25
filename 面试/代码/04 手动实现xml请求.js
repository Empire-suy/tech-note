function request(url, method = 'get') {
  let xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      console.log('res', xhr.responseText)
    }
  }

  xhr.send()
}