import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from "./styles/Layouts";
import BackgroundWindow from "./Components/BackgroundWindow/BackgroundWindow";
import Navigation from "./Components/Navigation/Navigation";
import { useMemo, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Incomes from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";


function App() {

  const [active, setActive] = useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Incomes />
      case 3:
        return <Expenses />
    
      default:
        return <Dashboard />
    }
  }

  //no refreshing of animation
  const windowMemo = useMemo(() => {
        return <BackgroundWindow />
  }, [])

  return (
    <AppStyled bg={bg} className="App">
    {windowMemo}
     <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
     </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
