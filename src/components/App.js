import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); //init이 false면 라우터 숨김
    });
  }, []);

  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "로딩중"}</>;
}

export default App;
