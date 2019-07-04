import { emailRE } from '@/util/regexp'

export function validator (values) {
  const errors = {}
  const requiredFields = ['email', 'password']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is required'
    }
  })
  if (values.email && !emailRE.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}
