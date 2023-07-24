export const signIn = (db, bcrypt) => (req, res) => {
  const { username, password } = req.body
  db('login')
    .select('*')
    .where({ username })
    .then(data => {
      const { hash } = data[0]
      const isValid = bcrypt.compareSync(password, hash)
      if (isValid) {
        res.status(200).json(isValid)
      }
    })
    .catch(() => res.status(400).json('Username or password does not exists'))
}
