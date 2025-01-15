import { Provider } from 'react-redux';
import AppRouter from './navigation/AppRouter';
import store from './redux/store';




export default function App() {

  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>

  );
}

