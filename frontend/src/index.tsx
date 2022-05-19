import React from "react"
import ReactDOM from "react-dom"
import { TopNav } from './TopNav'
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { AuthSwitch } from "auth"

import "./style/index.scss"
import "./translations"
import { PageIntroduction } from "pages/PageIntroduction"
import { PageErrorAuth } from "pages/PageErrorAuth"
import { PageDays } from "pages/PageDays"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

function App() {
  return <>
    <TopNav />
    <AuthSwitch
      loading={() => (<PageIntroduction />)}
      error={() => (<PageErrorAuth />)}
      loggedOut={() => (<PageIntroduction />)}
      loggedIn={() => (<PageDays />)}
      unknown={() => (<PageErrorAuth />)}
    />
  </>
}

reportWebVitals(console.log)
