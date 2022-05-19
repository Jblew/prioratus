import React from "react"
import ReactDOM from "react-dom"
import { TopNav } from './TopNav'
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { AuthSwitch, UserCondition } from "auth"

import "./style/index.scss"
import "./translations"
import { PageIntroduction } from "pages/PageIntroduction"
import { PageErrorAuth } from "pages/PageErrorAuth"
import { PageDay } from "pages/PageDay"
import { PageClosedBeta } from "pages/PageClosedBeta"

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
      loggedIn={() => (
        <UserCondition
          condition={(profile) => profile.enrolledInBeta == true}
          met={<AllowedApp />}
          unmet={<PageClosedBeta />}
          error={<PageErrorAuth />}
        />
      )}
      unknown={() => (<PageErrorAuth />)}
    />
  </>
}

function AllowedApp() {
  return <Routes>
    <Route path="/">
      <Route index element={<NavigateToToday />} />
      <Route path="days">
        <Route index element={<NavigateToToday />} />
        <Route path=":date" element={<PageDay />} />
      </Route>
    </Route>
  </Routes>
}

function NavigateToToday() {
  return <Navigate to={"/days/" + new Date().toISOString().substring(0, 10)} replace={true} />
}

reportWebVitals(console.log)
