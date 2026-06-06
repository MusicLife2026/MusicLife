import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import HistoryScreen from './components/HistoryScreen';
import ComposersScreen from './components/ComposersScreen';
import ComposerDetailScreen from './components/ComposerDetailScreen';
import PeopleScreen from './components/PeopleScreen';
import PeopleDetailScreen from './components/PeopleDetailScreen';
import MyPageScreen from './components/MyPageScreen';

function App() {
  const [page, setPage] = useState('home');
  const [selectedComposer, setSelectedComposer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const navigate = (p, data = null) => {
    if (p === 'composer-detail' && data) setSelectedComposer(data);
    if (p === 'people-detail' && data) setSelectedPerson(data);
    setPage(p);
    window.scrollTo(0, 0);
  };

  const screens = {
    home: <HomeScreen onNavigate={navigate} />,
    history: <HistoryScreen onNavigate={navigate} />,
    composers: <ComposersScreen onNavigate={navigate} />,
    'composer-detail': <ComposerDetailScreen composer={selectedComposer} onNavigate={navigate} />,
    people: <PeopleScreen onNavigate={navigate} />,
    'people-detail': <PeopleDetailScreen person={selectedPerson} onNavigate={navigate} />,
    mypage: <MyPageScreen onNavigate={navigate} />,
  };

  return screens[page] || screens.home;
}

export default App;