import q from 'q'

export const readAsBase64 = (file) => {
  let deferred = q.defer()
  let reader = new FileReader()
  reader.onload = (e) => {
    deferred.resolve(e.target.result)
  }
  reader.readAsDataURL(file)
  return deferred.promise
}