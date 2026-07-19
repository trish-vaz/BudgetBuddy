import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ActivityProvider } from './context/ActivityContext';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import LogExpense from './pages/LogExpense';
import SetBudget from './pages/SetBudget';
import Summary from './pages/Summary';

export default function App() {
  return (
    <BrowserRouter>
      <ActivityProvider>
        <NavBar />
        <main>
          <Routes>
            <Route path="/"        element={<Dashboard />} />
            <Route path="/log"     element={<LogExpense />} />
            <Route path="/budget"  element={<SetBudget />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>
      </ActivityProvider>
    </BrowserRouter>
  );
}
