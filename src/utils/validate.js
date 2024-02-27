export const checkValidation = (email, password) => {
  const isEmailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)

  if (!isEmailValid) return "Email isn't Valid"
  if (!isPasswordValid)
    return "Password isn't Valid (password should at least be 6 characters, include a letter [a-z, A-Z], a number [0-9], a special character [!,@,#,$,%,^,&,*])"
  return null
}
