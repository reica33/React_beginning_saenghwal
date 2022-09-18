import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// 대부분의 애플리케이션은 이 4가지 기능을 가지고 있습니다 : CRUD(CREATE 생성 READ 읽기 UPDATE 수정 DELETE 삭제)
// 이전에 READ 기능을 이미 구현했고 이번에 우리가 할 것은 CREATE 기능입니다.
// 어떻게 글을 생성할 수 있는지, form 은 리액트에서 어떻게 다뤄지는 등을 배울 것입니다.

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
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);
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

// (3) Create UI 별도 생성
function Create(props){
  return <article>
    <h2>Create</h2>

    {/* form 태그 : 어떤 정보로 서버로 전송할 때 쓰는 HTML 태그 (맨 아래 메모 참고) */}
    {/* (5) <form> 태그에 onSubmit 이라는 prop 을 제공 */}
    <form onSubmit={(event)=>{
      event.preventDefault();
      // (5)-1 이벤트 함수 안에서 form 태그 소속돼 있는 name 이 title, name 이 body 의 value 값을 얻어내야 됨
      // 이벤트 타겟 = 이벤트가 발생한 태그 = submit 버튼을 눌러서 이벤트가 발생한 form 태그 + 의 title 이라는 태그 -> title의 value 값 가져옴 (body도 동일)
      const title = event.target.title.value;
      const body = event.target.body.value;
      // (5)-2 그렇게 가져온 타이틀과 바디를 이 크리에이트 컴포넌트 사용자에게 공급해야 됨
      // 사용자는 어떻게 크리에이트 컴포넌트로부터 submit 정보를 공급 받아요? - onCreate 를 통해 받음
      // onCreate 는 props -> function Create() 컴포넌트 에 props 넣어주기 => function Create(props)
      // (5)-3 onCreate 함수 호출 하기 : App 에 있는 content 의 onCreate 가 가르키는 함수가 실행된다
      // 그 함수의 타이틀과 바디값을 이용해서 사용자가 입력한 타이틀과 바디 값을 Create 컴포넌트 사용자에게 공급할 수 있다 - (6) App const topics 로 이동
      props.onCreate(title, body);
    }}>
      {/* (3)-3 구현하고 나면 다닥다닥 붙어서 나오는 게 보기 안 좋으니까 <p></p> 사용하기! */}
      {/* (3)-1 사용자가 입력할 내용 타입 text, 사용자가 입력한 데이터 이름 title, 어떤 정보 입력할지 안내 placeholder */}
      <p><input type="text" name="title" placeholder="title"></input></p>
      {/* (3)-2 본문은 여러줄로 표현해야 하기 떄문에 html 에서 여러줄 표현할 때 쓰는 textarea 사용 */}
      <p><textarea name="body" placeholder="body"></textarea></p>
      {/* (3)-4 글을 생성하기 위해 만든 submit. 기본값이 '제출' -> Create 로 변경 */}
      {/* Create 버튼을 누르고 나서 어떤 작업을 해야할까? -> (4) Create 컴포넌트 이용자가 Create 버튼을 눌렀을 때 후속 작업을 할 수 있는 인터페이스 제공! */}
      {/*  -> App 의 else if (mode === 'CREATE')로 이동 */}
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  // (8) App content const newTopic = {title: _title, body: _body}; 에 하고 나니 id값은 어쩌지? - 강사님은 따로 관리
  // useState 의 초기값은 현재 topics의 마지막 원소의 id값이 3이니까 다음에 생성되는 원소의 id값을 4로 지정
  // nextId 를 통해서 그 다음에 생성될 topics 원소의 id값을 지정할 수 있음! -> (9) App 의 else if (mode === 'CREATE')로 이동
  const [nextId, setNextId] = useState(4);

  // (6) topics 변수에 새로운 원소를 추가해서 Navi 목록이 추가되도록 하자
  // 그 함수의 타이틀과 바디값을 통해서 사용자가 입력한 타이틀과 바디값을 크리에이트 컴포넌트 사용자에게 공급할 수 있다
  // topics 변수에 새로운 원소를 추가해서 웹 목록에 목록이 추가 되도록 하기 -> topics 를 state로 업그레이드 시키기
  // const topics = [
  //   {id:1, title:'html', body:'html is ...'},
  //   {id:2, title:'css', body:'css is ...'},
  //   {id:3, title:'javascript', body:'javascript is ...'},
  // ];
  // topics 배열을 useState 이용해서 state로 승격 - topics는 읽을 때 쓰는 것, setTopics 는 topics 를 바꿀 때 쓰기(읽기, 쓰기 인터페이스 추가)
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]);
  // 이제 여기서 해야할 것은 topics 에 새로운 원소를 만들어야 함. 원소는 객체 -> (7) App 의 else if (mode === 'CREATE')로 이동

  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE') { // (2) 'mode 가 Create 라면 어떻게 contetn 변수가 바뀌어야 하는가'의 조건문 생성
    // * 이때 여기서 바로 Create UI 를 만들어도 되지만 꽤 복잡한 UI 를 가지고 있기 때문에 별도의 컴포너트 생성 추천! -> (3)
    // content = <Create></Create>

    // (4) Create 컴포넌트를 이용하는 이용자가 생성 버튼(Create 버튼)을 눌렀을 때 후속 작업을 할 수 있는 인터페이스를 제공해 주고 싶다면 onCreate 사용
    content = <Create onCreate={(_title, _body)=>{
      // onCreate 의 Prop 에 함수를 전달하면 사용자가 Create 버튼을 눌렀을 때 이 함수가 실행될 겁니다 라고 사용자에게 고지해야겠죠?
      // 그 때의 콜백 함수는 title 값과 body 값을 받을 수 있어야 한다
      // 이 onCreate 를 어떻게 호출할 것인가! -> (5) function Create 로 이동


      // (7) topics 에 들어갈 새로운 객체(=원소) newTopic를 만들자
      // 헷갈리지 마세요! title(해당 객체의 프로퍼티 이름) : _title(파라미터로부터 온 이름)
      // 어? 하나 빠진 게 있죠? id 값은 어떻게 하죠? - 강사님은 ID 값을 별도 관리 추천 -> (8) App const [topics, setTopics] 로 이동
      // (9) 위에 정의된 nextId 를 사용하여 newTopic 의 id 값으로 사용
      const newTopic = {id: nextId, title: _title, body: _body};
      // (10) newTopic 에 id값까지 생겼고 이제 이걸 어떻게 topics 에 넣어야 할까요?
      // topics.push(newTopic); // 안됨 - topics 는 state를 읽을 때 쓰는 거라서 setTopics 를 써야 함
      // setTopics(topics); // 안됨
      // 자 여기서 잠깐! 상당한 어려운 이슈가 도사리고 있습니다.
      // 원리를 너무 깊게 들어가면 너무 어렵고 복잡해 지기 때문에 현상만 설명을 드리고 이럴 때는 이렇게, 저럴 때는 저렇게 지침을 알려드리고 나중에 차차 공부!
      // 여러분이 상태를 만들 때 그 상태의 데이터가 원시데이터 타입이다
      // const[value, setValue] = useState(PRIMITIVE);
      // : *1. string, *2. number, 3. bigint, *4. boolean, 5. undefined, 6. symbol, 7. null (1, 2, 4 가 제일 중요하니 이것만 기억)
      // 이러한 데이터들로 상태를 만든다? 배운 방식 그대로 하면 됩니다 (옛날에 배운 방식이라고 하시는데 어떤 걸 말하시는 걸까...ㅋㅋ)
      // 만약 여러분이 상태로 만들려고 하는 것이 범객체라면
      // const[value, setValue] = useState(Object);
      // *1. object, *2. array
      // 이러한 것들이라면 처리방법이 달라져야 한다 -> "데이터 복제"
      // newValue = {...value}
      // {...value} : value 값을 복제한 새로운 데이터 = newValue -> 그러고 나서 복제데이터 newValue 값을 변경하고 오리지널 값을 바꾸지 않음(손대지 않는다)
      // - object
      // newValue = {...value}
      // newValue 변경
      // setValue(newValue) 이렇게 넣어줘야 그때 비로소 컴포넌트가 실행이 된다
      // - array
      // newValue = [...value]
      // newValue 변경
      // setValue(newValue) 이렇게 넣어줘야 그때 비로소 컴포넌트가 실행이 된다

      // 원리 추가 설명!
      // - 배열로 만들어진 객체 1
      // const [value, setValue] = useState([1]);
      // value.push(2); - 오리지널 데이터를 바꾼 코딩
      // setValue(value); - 오리지널 데이터를 입력해 준 코딩
      // REACT는 setValue 를 호출했을 때 오리지널 데이터와 새로 들어온 데이터가 같은 데이터인지 확인하고, 같은 데이터라면 굳이 컴포넌트를 다시 새로 랜더링 안함
      // 같은 데이터라서 현재 위 코딩으로는 컴포넌트가 새로 랜더링 되지 않음
      // - 반면에 아래는 다름 (아래의 useState는 원시데이터 타입일 수도 있음)
      // const [value, setValue] = useState(1);
      // setValue(2); - 여기있는 값은 새로운 값. 오리지널 데이터는 여전히 1, 새로운 데이터는 2 -> 둘은 다른 데이터 -> 컴포넌트 랜더링 됨
      // 그래서 어떻게 해야 된다고요?
      // const [value, setValue] = useState([1]);
      // newValue = [...value] : 기존의 오리지널 데이터를 복제해서
      // newValue.push(2); : 그 복제한 데이터를 변경하고
      // setValue(newValue); : 그 변경한 데이터를 set 한다
      // 자 이것이 여러분이 상태를 다룰 때 그 상태가 객체와 같이 복합적인 데이터인 경우에 처리해야할 간단한 지침!
      
      // (10)-1 topics 의 복제데이터 생성
      const newTopics = [...topics]
      // (10)-2 위 복제본 newTopics에 newTopic을 push 해서 복제본 newTopics을 바꾼다
      newTopics.push(newTopic);
      // (10)-3 그리고 복제본 newTopics을 topics 에 전달을 한다면
      // React는 오리지널 데이터는 topics 와 새로 들어온 복제본 데이터 newTopics 와 같은지 다른지 판단해서 다르다면 그 때 컴포넌트를 다시 실행(랜더링)한다.
      setTopics(newTopics);

      // (11) 자 이제 감동받을 일만 남았습니다~
      // 우리가 글을 추가하고 그대로 끝내면 아쉬우니까 세련된 어플리케이션들은 글이 잘 추가됐는지 확인할 수 있게 글의 상세페이지로 이동이 가능하다.
      // (11)-1 상세페이지로 이동, 즉 상세페이지 읽을 수 있도록 세팅
      setMode('READ');
      // (11)-2 지금 우리가 추가한 글의 id 를 nextId로 지정
      setId(nextId);
      // (11)-3 다음에 글을 추가할 경우를 대비해서 id 를 setNextId 를 기존의 nextId + 1 하기
      setNextId(nextId+1);

    }}></Create>
  }

  return (
    <div className="App">

      <Header title="WEB" onChangeMode={function(){
        setMode('WELCOME');
      }}></Header>

      <Navi topics={topics} onChangeMode={(_id)=> {
        setMode('READ');
        setId(_id);
      }}></Navi>

      {content}

      {/* (1) create 태그로 이동하는 페이지 만들기 : a href 사용 */}
      {/* 링크를 클릭했을 때 create 로 이동하면 되는데 우리는 실제 페이지로 이동하지 않고
       const mode 와 setMode 의 값을 바꿈으로서 페이지를 바꾸고 있음 */}
      {/* create 를 클릭하면 mode 가 create로 바뀌고 create에 해당되는 UI 가 나타나게 할 것임 */}
      <a href="/create" onClick={(event)=>{
        event.preventDefault();
        setMode('CREATE');
        // 여기까지만 하면 아무 내용이 안 나옴
        // -> mode 값이 CREATE 로 바뀌고 APP 컴포넌트가 다시 실행되면서 Create에 걸리는 if 문이 아무 것도 없기 때문에 내용없음
      }}>Create</a>
    </div>
  );
}

export default App;

// https://inpa.tistory.com/entry/HTML-%F0%9F%93%9A-%ED%8F%BCForm-%ED%83%9C%EA%B7%B8-%EC%A0%95%EB%A6%AC

// 우리가 특정 사이트에 로그인 할때, 계정 아이디와 비밀번호를 입력하는 화면을 수도 없이 많이 봤을 것이다.
// 거의 대부분의 사이트가 데이터베이스 서버로 나의 계정 정보를 가지고 있고,
//  나의 아이디, 비밀번호를 입력해서 서버에 내 정보가 있고, 이것이 일치하면 로그인을 할 수 있다.
// 이때 웹페이지에서 서버로 내 계정 정보를 보내야 되는데 이때 사용되는 HTML의 태그가 FORM 이다.

// Form elements (FrontEnd HTML&CSS) -> Form Processing(BackEnd Server)

// HTML폼은 사용자와 웹사이트 또는 어플리케이션이 서로 상호 작용하는 것 중 중요한 기술 중에 하나이다.
// 폼은 사용자가 웹사이트에 데이터를 전송하는 것을 허용한다.
// 일반적으로 데이터는 웹 서버로 전송되지만 웹페이지가 데이터를 사용하기 위하여 사용할 수 도 있다.

// <form>
// 입력 양식 전체를 감싸는 태그
// form은 컨트롤 요소(control element)로 구성된다.
// Form 태그의 속성	        설명
// method	                전송 방식 선택 / - get : 256~4096 byte까지만 전송 가능 / - post : 입력 내용의 길이에 제한 X
// name                   form의 이름 / 서버로 제출된 폼 데이터(form data)를 참조하기 위해 사용
// action	                form을 전송할 서버 쪽의 script 파일을 지정 / 전송되는 서버 url 또는 html 링크
// target	                action에서 지정한 script 파일을 현재 창이 아닌 다른 위치에 열도록 지정
// autocomplete	          자동 완성.
//                        / on으로 명시하면, 브라우저는 사용자가 이전에 입력했던 값들을 기반으로 사용자가 입력한 값과 비슷한 값들을 드롭다운 옵션으로 보여준다.
// enctype	              폼 데이터(form data)가 서버로 제출될 때 해당 데이터가 인코딩되는 방법을 명시
//                        / - application/x-www-form-urlencoded 기본값으로, 모든 문자들은 서버로 보내기 전에 인코딩됨을 명시함. 
//                        / - multipart/form-data 모든 문자를 인코딩하지 않음을 명시함. 이 방식은 <form> 요소가 파일이나 이미지를 서버로 전송할 때 주로 사용함. 
//                        / - text/plain 공백 문자(space)는 "+" 기호로 변환하지만, 나머지 문자는 모두 인코딩되지 않음을 명시함.
// novalidate	            폼 데이터(form data)를 서버로 제출할 때 해당 데이터의 유효성을 검사하지 않음을 명시