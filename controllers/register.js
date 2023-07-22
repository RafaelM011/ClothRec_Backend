export const register = (db, bcrypt) => (req, res) => {
  const { username, email, password } = req.body
  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)

  db.transaction(trx => {
    trx
      .insert({ username, email })
      .into('users')
      .then(() => {
        trx.insert({ username, hash })
          .into('login')
          .returning('*')
          .then(response => res.status(200).json(response[0]))
          .catch(() => res.status(400).json('Username or email already exist'))
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(() => res.status(400).json('Username or email already exist'))
}
