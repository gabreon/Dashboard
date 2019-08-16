import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './modules/Login'
import Dashboard from './modules/Dashboard'

export default createAppContainer(
  createSwitchNavigator({
    Login: { screen: Login },
    Dashboard: { screen: Dashboard }
  }, {
    initialRouteName: 'Dashboard',
    mode: 'modal'
  })
)