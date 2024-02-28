import { Body } from "./components"
import { Provider } from "react-redux"
import store from "./utils/store"
import "./index.css"
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <Body />
    </Provider>
  )
}

export default App
