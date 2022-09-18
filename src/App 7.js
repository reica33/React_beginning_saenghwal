import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// Prop(입력 데이터) -> State(우리가 만든 component 함수가 처리) -> return(출력, 결과물)
// 프롭과 함께 컴포넌트 함수를 다시 실행해서 새로운 리턴값을 만들어 주는 또 하나의 데이터 = State
// Prop 과 State 모두 이 값이 변경되면 새로운 리턴값을 만들어서 UI 를 바꿉니다
// * 차이점
//       Prop : 컴포넌트를 사용하는 외부자를 위한 데이터
//       State : 컴포넌트를 만드는 내부자를 위한 데이터

function Header(props) {
  return <header className="App-header">
    <h1><a href="/" onClick={(event) => {
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Navi(props) {
  const lis = []
  for(let i=0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      {/* <11> {t.id} 에 입력한 값은 숫자였다.(topics의 id) 그걸 태그의 속성으로 넘기면 문자가 됨(문자가 된 데이터) */}
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();

        // <10> event.target의 id 를 통해서 id 값을 알아냈는데 그 id는 a id={t.id} 에 들어 있다
        props.onChangeMode(event.target.id); // <12> 문자가 된 데이터를 끌고 와서 id에 넣으면 '문자열' id가 됨
        // <13> 이 문자열 id를 숫자로 컨버팅 해주자 - title, body 내용 잘 뜸
        props.onChangeMode(Number(event.target.id));
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
  // 1. 이 mode의 값에 따라서 본문이 달라지길 바람 -> 아래 if else if 조건문을 작성
  // mode는 현재 일반적인 지역 상수(const) 임
  // (1) state(상태) 로 업그레이드 해주기 -> (2) state(상태)가 리턴됨 -> (3) 리턴된 결과를 _mode 로 명명
  // const mode = 'WELCOME';

  // useState의 인자는 useState의 초기값 = () 안의 값
  // const _mode = useState('WELCOME');

  // console.log('_mode', _mode);
  // 아래는 콘솔 로그 내용
  // _mode (2) ['WELCOME', ƒ] : _mode 의 값 2개 라는 뜻
  // 0: "WELCOME"             - 배열의 0번째 원소(데이터) : useState ()안의 값 -> 상태의 값을 읽을 때 쓰는 데이터(초기값)
  // 1: ƒ ()                  - 배열의 1번째 원소(데이터) : 함수 -> 그 상태의 값을 변경할 때 사용하는 함수
  // length: 2
  // [[Prototype]]: Array(0)  : * useState는 배열을 리턴함!

  // 이 mode의 값을 통해서 상태의 값을 읽을 수 있다 = state의 값은 0번째 원소(=데이터, 인덱스값) 로 읽는다
  // const mode = _mode[0];
  // 이 1번째 원소의 setMode를 통해서 mode 의 값을 바꿀 수 있다 = state 의 값을 바꿀 때는 1번째 원소(=데이터, 인덱스값) 로 바꾼다
  // const setMode = _mode[1];
  // 위 세 가지 식을 합친 것이 아래의 식. 익숙해져야 함
  const [mode, setMode] = useState('WELCOME');

  // Navi 컴포넌트의 글을 클릭해서 id 값이 바뀌면 -> 컴포넌트가 새로 실행되면서 새로운 id 값이 지정된다
  // 현재 값이 선택되지 않았으니까 null 로 해서 초기값이 없다 로 해 놓음
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ];

  // 3. content 라는 변수를 하나 만들어 둠 (초기화)
  let content = null;
  // 2. 만약에 mode 의 값이 WELCOME 이라고 하면 어떻게 되고 mode의 값이 READ 이면 어떻게 된다의 조건문을 작성
  if(mode === 'WELCOME') {
    // 4. 만약에 mode 의 값이 WELCOME 이면 content 는 <Article title="Welcome" body="Hello, WEB"></Article> 태그가 된다
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    // <3> title 과 body 초기화
    let title, body = null;
    
    // <2> topics에 쓴 값 중에 우리가 선택한 id와 일치하는 원소를 찾아서 그것을 title 과 body 값으로 세팅해주면 됨 - 반복문 사용
    // (i는 topics.length(원소의 숫자, 즉 갯수) 만큼 순회한다 , i를 1씩 더한다)
    for(let i=0; i<topics.length; i++) {
      // <6> 디버깅
      console.log(topics[i].id, id); // <8> id 값은 setId 로 부터 옴. setId 는 어디서 이용될까? - 아래 return 으로 이동
      // Navi 의 3 JavaScript를 클릭시
      // 1 '3'
      // 2 '3'
      // 3 '3'
      // 1 '3'
      // 2 '3'
      // 3 '3'
      // <7> topics의 값은 '숫자' 1 2 3 으로 바뀌지만 id.state의 값은 '문자' 3
      // 웹에서도 title 과 body 내용이 뜨지 않음
      // * cosole.log 가 두번 찍히는 것은 index.js 에 있는 StrictMode 때문임(개발할 때만 작동)
      // 왜 일까 어려운 주제이지만 아이디 값이 만들어지는 방법을 봐야 한다.

      // <4> 만약 topics의 i의 아이디와 id의 state 가 일치한다면 -> title 과 body 값을 세팅해 주면 됨
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    // 5. 만약에 mode 의 값이 READ 이면 content 는 <Article title="Read" body="Hello, Read"></Article> 태그가 된다
    // content = <Article title="Read" body="Hello, Read"></Article>
    // <5> 위 내용을 아래와 같이 변경 -> 아무 일도 안 일어나네 왜일까?
    content = <Article title={title} body={body}></Article>
  }

  return (
    <div className="App">
      {/* 이벤트에 따라서 mode 의 값을 바꾸기! - setMode*/}
      <Header title="WEB" onChangeMode={function(){
        // alert('Header');
        // mode = 'WELCOME';
        setMode('WELCOME');
      }}></Header>

      {/* setId 때문에 const 부분의 id 와 헷갈리니까 파라메터 id 를 _id 로 이름 변경 */}
      <Navi topics={topics} onChangeMode={(_id)=> {
        // alert(id);
        // mode = 'READ';
        setMode('READ');
        // 하지만 setMode('READ') 로 끝나기 애매함. 해당 목록 클릭하면 연관된 글(내용)이 안 나오기 때문..
        // else if(mode === 'READ') {content = <Article title="Read" body="Hello, Read"></Article>} : READ 일 때 컨텐트를 결정하는 부분
        // 해당 부분의 title 과 body 에 적당한 값을 가지면 된다 -> 어떤 글을 선택했는지 그걸 state 로 만들어야 함! - const [id, setId]

        // <9> setId는 return Navi 안에서 이용됨. setId의 _id 값은 Navi 안에 있음 - function Navi 로 이동
        setId(_id);
        // : <1> Navi 컴포넌트의 글을 클릭할 때 id 값이 바뀌면 컴포넌트가 새로 실행되면서 새로운 id 값이 지정된다 - 그러면 그 아이디 값으로 우린 뭘 하면 될까?
      }}></Navi>
      {/* mode 값을 READ 로 바꾸긴 했지만 APP 컴포넌트 함수가 다시 실행되지 않기 떄문에 return 값이 변경되지 않는 것(변화없음) */}
      {/* 우리가 하고 싶은 것 : mode 의 값이 바뀌면 이 컴포넌트 함수가 새로 실행되면서 새로운 리턴값이 만들어지고 그 리턴값이 UI 에 반영되는 것 */}
      {/* 해결법 : 이때 state 를 사용한다! -> import 해야함 */}

      {/* <Article title="Welcome" body="Hello, WEB"></Article> */}
      {/* 위 문법을 아래와 같이 바꾸어서 content 변수가 출력이 되도록 한다 */}
      {content}
    </div>
  );
}

export default App;
