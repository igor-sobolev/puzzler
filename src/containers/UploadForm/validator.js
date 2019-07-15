
export function validator (values) {
  const errors = {}
  const requiredFields = ['files']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is required'
    }
  })
  return errors
}