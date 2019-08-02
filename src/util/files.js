import q from 'q'
import config from '@/properties'

const { SERVER_URL } = config

export const readAsBase64 = (file) => {
  let deferred = q.defer()
  let reader = new FileReader()
  reader.onload = (e) => {
    deferred.resolve(e.target.result)
  }
  reader.readAsDataURL(file)
  return deferred.promise
}

export const addThumbnails = (array) => {
  return array.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file)
    })
  )
}

export const resolveImage = (name) => name ? `${SERVER_URL}/files/${name}` : null
