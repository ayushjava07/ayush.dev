import Portfolio from './components/Portfolio';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Portfolio />
      </div>
    </ThemeProvider>
  );
}

export default App;

