import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { InvoiceDashboard } from './components/InvoiceDashboard/InvoiceDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => (
  <Provider store={store}>
    <InvoiceDashboard />
  </Provider>
);

export default App;
