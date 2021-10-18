
import React , {useEffect} from 'react';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './redux/reducers/rootReducer'
import thunk from "redux-thunk";
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/MainNavDrawer';




const myStore = createStore(rootReducer, applyMiddleware(thunk))


const App = (props) => { 

  return(
    <Provider store={myStore}>
      <NavigationContainer>
          <Navigator/>
      </NavigationContainer>
    </Provider>
    
  )
}


export default App



