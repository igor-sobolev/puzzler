
export function validator (values) {
  const errors = {}
  const requiredFields = ['firstName', 'lastName', 'email']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is required'
    }
  })
  return errors
}
