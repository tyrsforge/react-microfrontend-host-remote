import { Suspense, lazy } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// This import works thanks to Module Federation
const RemoteApp = lazy(() => import("remote/RemoteApp"));

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Host Shell</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/remote">Remote microfrontend</Link>
        </nav>
      </header>
      <main>
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={<p>This is the host home route (local component)</p>}
            />
            <Route path="/remote" element={<RemoteApp />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
