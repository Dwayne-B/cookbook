import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';
import Nav from './components/elements/NavLinks';
import HomePage from './components/pages/HomePage';
import NotFound from './components/pages/NotFound';
import SavedCardsPage from './components/pages/SavedCardsPage';
import { RecipeProvider } from './Context/RecipeContext';
import './css/main.css';
function App() {
	return (
		<RecipeProvider>
			<div className='App '>
				<BrowserRouter>
					<Nav />
					<Routes>
						<Route
							index
							exact
							path='/'
							element={<HomePage />}
						/>
						<Route
							exact
							path='SavedCardsPage'
							element={<SavedCardsPage />}
						/>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</RecipeProvider>
	);
}

export default App;
