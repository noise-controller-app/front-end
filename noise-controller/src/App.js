import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import TeacherPage from './components/TeacherPage';
import Forms from './components/Forms';
import AnimalScreen from './components/AnimalScreen';


function App() {
  const [ second, setSecond ] = useState(0);
  const [ minute, setMinute ] = useState(0);
  const [ isActive, setIsActive ] = useState(true);
  const [ user, setUser ] = useState(undefined);

  // This useEffect works properly. However, we want this to be able to start and stop, not just
  // run when the page starts. I am having a hard time figuring out how to run it through the button.
  // The info has been passed down via props, but does not alter the state.

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if(second >= 59) {
  //       setMinute(minute + 1);
  //       setSecond(0);
  //     } else {
  //       setSecond(second + 1);
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [second]);

  const toggleButton = () => {
    console.log('Clicked!')
    if(isActive) {
      console.log('Active!')
      const intervalId = setInterval(() => {
        if(second >= 59) {
          console.log('counting?')
          setMinute(minute + 1);
          setSecond(0);
        } else {
          setSecond(second + 1);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    } else {
      return
    }
  }

  return (
    <div>
<<<<<<< HEAD
      <Page>
        <RegisterForm />
        <LoginForm />
      </Page>

      <Route path='/teacher/:id' component={TeacherPage} />

      {/* <AnimalScreen /> */}
=======
      {/* {(user === undefined) ? <Forms />
        : <TeacherPage timer={clock} />
      } */}
    
      <TeacherPage minute={minute} second={second} toggleButton={toggleButton} />
      <Route path='/teacher/:id' component={TeacherPage} />
      {/* <Route path='/teacher/:id' component={TeacherPage} /> */}
>>>>>>> 8fa668970663c6acc762069ad1eb85ee330980d6
    </div>
  );
}

export default App;