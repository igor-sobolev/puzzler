
export function validator (values) {
  const errors = {}
  if (!(values.files && Array.isArray(values.files) && values.files.length)) {
    errors.files = 'This field is required'
  }
  return errors
}