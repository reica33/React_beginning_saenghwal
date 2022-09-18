import logo from './logo.svg';
import './App.css';

// 코드 내용이 많으면 웹 페이지 파악하기 어렵다(어지럽힌 상태) -> 정리정돈 하고 싶다 -> 연관된 것을 묶어 이름 붙이기 : 그루핑 
// 결론 : 복잡한 태그를 하나의 태그로 이름을 붙여서 사용자 정의 태그를 만들자!
// 각각의 코드가 이름을 가지고 있어 어떤 취지인지 금방 파악할 수 있고 따로 만들어 둔 Header, Navi, Article 을 이용해
// 해당 function 과 연결된 component를 사용하는 곳을 모두 수정, 변경 가능
// -> 이것이 리액트의 본질
// 여러 태그들을 하나의 독립된 부품으로 만들 수 있고 그 부품을 이용하면 더 적은 복잡도로 소프트웨어를 만들 수 있고
// 내가 만든 컴포넌트를 다른 사람에게 공유하거나 다른 사람이 만든 컴포넌트를 내가 만들고 있는 프로젝트에 사용할 수 있게 함
// 생산성을 획기적으로 올리는 역할! (거대한 리액트 생태계가 존재한다)

// 리액트에서는 사용자 정의 태그라는 말 대신 컴포넌트라는 말을 사용

// 리액트에서는 사용자 정의 태그를 사용할 경우, ***꼭 대문자로 시작***할 것!
function Header() {
  return <header className="App-header">
    <h1><a href="/">WEB</a></h1>
  </header>
}


function Navi(props) {
  return <nav>
    <ol>
      <li><a href="/read/1">html</a></li>
      <li><a href="/read/2">css</a></li>
      <li><a href="/read/3">js</a></li>
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>Welcome</h2>
    Hello, WEB
  </article>
}

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Navi></Navi>
      <Article></Article>
    </div>
  );
}

export default App;
