import logo from './logo.svg';
import './App.css';

{/* html 태그의 onclick 덕분에 경고창 띄울 수 있음 -> 우리의 기본적인 컴포넌트는 아직 저런 기능이 없음(속성은 있지만) */}
{/* ex) <input type="button" onclick="alert('hi')"> */}
{/* 컴포넌트도 이벤트 기능이 있어서 컴포넌트에 어떤 일이 발생했을 때 사용자가 추가적인 작업을 처리할 수 있도록 해 보자! */}

function Header(props) {
  return <header className="App-header">
    {/* react의 a 태그는 순수한 html과 다른 유사 html이다 */}
    {/* -> onClick 에 코드를 작성하면 react 개발환경이 최종적으로 브라우저가 이해할 수 있는 html 로 컨버팅해주므로 문법 다르다. */}
    {/* onClick="" 가 아니라 onClick={} 이라고 해서 {}안에 함수를 적어야 함 -> a 태그를 누르면 함수 funtion()가 호출되는 것! */}
    {/* onClick의 콜백함수로 들어간 함수 funtion()이 호출 될때 react는 저 함수의 괄호안에 event 객체를 첫번째 파라미터로 넣어줌 */}
    {/* <h1><a href="/" onClick={function(event){} 를 아래와 같이 arrow 표기법으로 변경 */}
    <h1><a href="/" onClick={(event) => {
      // event 객체는 이벤트 상황을 제어할 수 있는 여러가지 정보와 기능이 들어가 있음
      // preventDefault : a태그가 동작하는 기본동작(페이지 리로드)을 prevent 방지한다 -> 즉, 클릭해도 리로드 방지함.
      event.preventDefault();
      // onClick 의 함수가 호출됐을 때, Header의 props 로 전달된 onChangeMode 가 가르키는 함수를 도출하는 것
      // onChangeMode={function(){alert('Header');}} 를 가르키는 props.onChangeMode() -> 컴포넌트에 이벤트 기능 부여 완료!!
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Navi(props) {
  const lis = []
  for(let i=0; i < props.topics.length; i++) {
    let t = props.topics[i];
    // lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
    // a 태그를 클릭했을 때 이벤트 발생하게 만들기
    lis.push(<li key={t.id}>
      {/* (2) id 값을 받아오는 제일 쉬운 방법 : 함수를 호출해 오는 태그에 id 값 부여하기 -> id={t.id} */}
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        // preventDefault 하고 나서 (1) Navi 내부의 onChangeMode 를 호출 - id 값 필요(주입해야 함)
        // 그 다음 이벤트 함수 안에서의 a 태그의 id 속성을 얻어 내려면 - event 객체를 사용한다.
        // event 를 유발시키는 태그 -> target = a 태그 + 의 id -> a 태그의 id
        props.onChangeMode(event.target.id);
      }}>
        {t.title}
        </a>
      </li>)
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
  
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // App 함수 안에 변수 topics 생성 -> 변수는 함수 안에서는 바꾸지 않아 const 로 정의 하기 -> topics가 나중에 바뀔 수 없어서 코드가 튼튼해짐
  // 배열로 정의하는 이유 -> 정보가 여러가지라서 배열에 담았고 각각의 정보는 제목과 본문이 있고 각자의 아이디값이 있다
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ];

  return (
    <div className="App">
      {/* 헤더 컴포넌트에 이벤트를 넣자! -> onChangeMode (이벤트핸들러) : 결과값으로 함수를 전달함 */}
      {/* 헤더 컴포넌트 안에서 링크를 클릭하면 컴포넌트가 이 함수를 호출해서 헤더를 클릭했을 때 해야할 작업들이 알아서 실행 */}
      {/* <Header title="WEB" onChangeMode={function(){
        alert('Header');
      }}></Header> */}
      {/* 위 문법에서 arrow 표기법으로 바꾸기 */}
      {/* <Header title="WEB" onChangeMode={() => {
        alert('Header');
      }}></Header> */}
      <Header title="WEB" onChangeMode={function(){
        alert('Header');
      }}></Header>

      <Navi topics={topics} onChangeMode={(_id)=> {
        alert(id);
      }}></Navi>

      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
