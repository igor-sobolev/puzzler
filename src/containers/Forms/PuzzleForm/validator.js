export function validator (values) {
  const errors = {}
  const requiredFields = ['name', 'size']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is required'
    }
  })
  if (!values.name) {
    errors.name = 'Name can not be empty'
  }
  return errors
}
