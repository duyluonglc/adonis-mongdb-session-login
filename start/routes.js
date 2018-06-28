'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')
const User = use('App/Models/User')
const Database = use('Database')

Route.on('/').render('welcome')

Route.get('/login', async ({ auth, response }) => {
  let user = await User.where({ email: 'test@gmail.com' }).first()
  if (!user) {
    await User.create({ name: 'Duy Luong', email: 'test@gmail.com', password: '123456' })
  }
  await auth.logout()
  try {
    await auth.attempt('test@gmail.com', '123456')
  } catch (error) {
    console.log(error)
  }
  return response.json('login success')
})

Route.get('/check', async ({ auth, response }) => {
  const user = auth.user
  const row = await Database.collection('my_test_user').where({ email: 'test@gmail.com' }).first()
  return response.json({
    logged: user.toJSON(),
    row
  })
})
  .middleware('auth')
