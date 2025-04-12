import { AppRoutes } from '@/routes/Index';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SignalrProvider } from './context/SignalrContext' 

function App() {

  return (

    <BrowserRouter>
      <SignalrProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </SignalrProvider>
    </BrowserRouter>

  );
}

export default App;
