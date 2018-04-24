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
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const User = use('App/Models/User')

Route.on('/').render('welcome')

Route.get('/login', async ({ auth, response }) => {
  let user = await User.first()
  if (!user) {
    user = await User.create({ name: 'Duy Luong' })
  }
  auth.login(user.toJSON())
  return response.json('login success')
})

Route.get('/check', async ({ auth, response }) => {
  let user = auth.user
  return response.json('already logged with: ' + user.name)
}).middleware('auth')
