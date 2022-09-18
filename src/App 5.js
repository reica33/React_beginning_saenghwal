import logo from './logo.svg';
import './App.css';

// 리액트는 속성을 PROP 프롭이라고 부름 -> props

// function Header 를 건드리지 않고 아래 Header 를 손대서 반영하고 싶을 때 props 사용!
function Header(props) {
  console.log('props', props);
  // props Object -> 프롭스에는 객체가 들어온다
  // title: "REACT" (이 객체의 타이틀이 리액트이다)
  console.log('props', props, props.title);
  // props {title: 'REACT'}
  // title: "REACT"[[Prototype]]: Object REACT

  return <header className="App-header">
    {/* <h1><a href="/">WEB</a></h1> */}
    {/* <h1><a href="/">props.title</a></h1> */}

    {/* 중괄호 안의 정보는 일반적인 문자열이 아니라 표현식으로 표현됨 -> 중괄호 안의 내용을 해석해서 표현하는 것! */}
    <h1><a href="/">{props.title}</a></h1>
  </header>
}

// 목록을 하드코딩하지않고 내부도 props를 줘서 props에 주입된 값에 따라 저절로 li를 생성해준다면 얼마나 좋을까요?
// 그러기 위해서는 해당 정보('html', 'css', 'js')를 자바스크립트에 데이터 스트럭쳐에 맞게 바꿔줘야 함!
function Navi(props) {
  const lis = [
    // 순간 그냥 복붙해서 배열에 담으면 JSX 식에는 부모 요소가 하나 있어야 합니다. 라고 오류 메세지가 뜸
    // 배열에 담을 각각의 li 태그 사이에 쉼표 넣어서 내용을 나누기
    <li><a href="/read/1">html</a></li>,
    <li><a href="/read/2">css</a></li>,
    <li><a href="/read/3">js</a></li>
  ]
  // 동적으로 목록 만들어 줄 반복문
  for(let i=0; i < props.topics.length; i++) {
    let t = props.topics[i];
    // (1) 타이틀 넣기 : lis.push(<li>{t.title}</li>)
    // (2) 링크 만들어 넣기 a href : lis.push(<li><a href={'/read/'+t.id}>{t.title}</a></li>)
    // 링크도 동적으로 만들어 줘야 하기 때문에 a href 에 {} 썼음
    // -> 콘솔 : Each child in a list should have a unique "key" prop.
    // : 우리가 만든 동적으로 만들어준 각각의 태그들은 각자 key라는 prop의 값을 그 반복문 안에서는 유니크해야 한다(=고유해야 한다)는 말
    //    애플리케에션 전체에서 고유하라는 것이 아니라 반복문 안에서만 고유하면 됨!
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
    // key 에 대한 깊은 설명은 어려우므로 간단하게 정리!
    // react : 자동으로 생성한 태그의 경우, react 가 이 태그들을 추적해야 하는데 타당한 근거가 필요하다
    // 그 근거로서 우리가 react 에게 key 라고 하는 약속된 prop을 부여함으로써 react 가 성능을 높이고 정확한 동작을 하게 하는데 우리가 협조해주는 것
  }

  return <nav>
    {/* 리액트에 의해서 해당 배열의 원소들을 하나씩 꺼내서 자동으로 목록 배치 됨 - 이거 자체론 쓸데없고 동적 배치가 필요함 */}
    {/* Navi 의 props 에 topics 로 받은 값을 전달 받아서 동적으로 태그를 만들어 배열하면 좋음 */}
    <ol>
      {/* 배열의 원소를 풀어헤치기 위해 {lis} 넣기 */}
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
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ];

  return (
    <div className="App">
      {/* function Header 를 건드리지 않고 아래 Header 를 손대서 반영하고 싶을 때 props 사용! */}
      <Header title="REACT"></Header>
      {/* topics 를 Navi 의 props 로 전달 - {} 로 전달하면 문자열이 아닌 데이터 있는 그대로 전달*/}
      {/* 아래와 같이 "topics" 로 할 경우, 단순한 문자열만 전달됨 */}
      {/* <Navi topics="topics"></Navi> */}
      <Navi topics={topics}></Navi>
      {/* 하지만 언제나 똑같이 동작하는 게 아니라 아래처럼 내용을 따로 변경하면 그에 맞게 변경됨 */}
      <Article title="Welcome" body="Hello, WEB"></Article>
      <Article title="Hi" body="Hello, React"></Article>
    </div>
  );
}

export default App;
