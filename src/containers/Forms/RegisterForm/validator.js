import { passwordRE, emailRE } from '@/util/regexp'

const passwordLimitation = 8

export function validator (values) {
  const errors = {}
  const requiredFields = ['email', 'password', 'password2', 'firstName', 'lastName']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is required'
    }
  })
  if (values.email && !emailRE.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password && !passwordRE.test(values.password)) {
    errors.password =
      'Should contain at least ' + passwordLimitation + ' characters including letters and numbers'
  }
  if (values.password !== values.password2) {
    errors.password2 = 'Passwords should match'
  }
  return errors
}
