import './App.css'
import AutoSuggestionSearch from './components/AutoSuggestionSearch/AutoSuggestionSearch';
import VirtualizedInfiniteScroll from './components/VirtualizedInfiniteScroll/VirtualizedInfiniteScroll';
import ToastProvider from './Context/ToastProvider';
import NotificationToast from './components/NotificationToast/NotificationToast';

function App() {

  return (
    <>
      {/* <AutoSuggestionSearch /> */}
      {/* <VirtualizedInfiniteScroll /> */}
      <ToastProvider>
        <NotificationToast />
      </ToastProvider>
    </>
  )
}

export default App
