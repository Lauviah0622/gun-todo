import styled from "styled-components";
import useTodos from './hooks/useTodos';
import useFilter from "./hooks/useFilter";
import Todolist from "./components/Todolist";
import Header from "./components/Header/Header";
import Filter from './components/Filter';

const AppWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 50px auto 50px auto;
  background-color: #fefefe;
  box-shadow: 5px 5px 20px #cccccc;
  border-radius: 10px;
  width: 512px;
  top: 20%;
  & * {
    box-sizing: border-box;
  }
`;

const Quote = styled.div`
  position: absolute;
  bottom: -120px;
`

const Link = styled.a`
  color: #dc6e6e;
  &:hover {
    text-shadow: 1px 1px 2px #a74b4b;
  }

`

function App() {
  const [filterState, setFilter] = useFilter();
  const {todosData, 
    addTodo, 
    deleteTodo, 
    updateTodoContent, 
    toggleTodoDone
  } = useTodos();
  console.log(todosData);

  const filtedTodosData = todosData.filter((todo) => {
    if (filterState === "done") return todo.isDone;
    if (filterState === "undone") return !todo.isDone;
    return true;
  });

  

  return (
    <AppWrapper>
      <Header addToto={addTodo} />
      <Todolist
        todosData={filtedTodosData}
        deleteTodo={deleteTodo}
        updateTodoContent={updateTodoContent}
        toggleTodoDone={toggleTodoDone}
      />
      <Filter setFilter={setFilter} />
      <Quote>This todo List use <Link href="https://gun.eco/" target="_blank"> GunJS </Link>  - Decentralized
        database. The app only for test, don't submit any sensitive data.<br />
        <br/> 
        Try to open another window, the data will automaticly syncronize between windows.</Quote>
    </AppWrapper>
    
  );
}

export default App;
