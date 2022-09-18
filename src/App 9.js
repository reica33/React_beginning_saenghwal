import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// CRUD(CREATE 생성 READ 읽기 UPDATE 수정 DELETE 삭제)
// 자 지금부터 UPDATE 기능을 어떻게 구현하는지 살펴보겠습니다.
// UPDATE = CREATE + READ 를 하이브리드해서 구현하게 됩니다.
// 난이도 면에서 상당히 높지만 UPDATE 를 할 수 있게 되면 CRUD 를 다 할 줄 아는 거라 해도 과언이 아닙니다.

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

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

// (8) Create 와 거의 유사하므로 copy 진행 - Create와 동일하게 props 라는 파라미터 지정해주기 -> (9) 로 이동
function Update(props) {
  {/* (13) 그래서 해야할 것 : 아래 (12)의 props 를 state 로 환승하는 것!
      props 는 사용자가 외부자가 내부자에게 전달하는 값. 그 값을 state 로 바꾼다.
      state 는 내부자가 사용하는 데이터 그러면 state 는 해당 컴포넌트 안에서 얼마든지 변경수정 가능! */}
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
    <h2>Update</h2>
    {/* (17)-1 정리 : Update 버튼을 클릭하면 onSubmit 이 호출되면서 title 과 body 값을 onUpdate 로 전달 -> (17)-2 로 이동 */}
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      {/* <p><input type="text" name="title" placeholder="title"></input></p> */}
      {/* <p><textarea name="body" placeholder="body"></textarea></p> */}

      {/* (12) Update(props) 를 통해 들어온 값을 아래 title 과 body 에 value 값으로 넣는다 */}
      {/* 현재 폼 안에 기존 내용이 들어가 있지만.. 값을 입력해도 수정이 안되는 상황 */}
      {/* 왜냐하면 React 에서 props 라는 데이터는 사용자가 해당 컴포넌트로 전달한 일종의 명령
          비유하자면 조선시대 왕의 어명과 같은 것
          - content = <Update title={title} body={body} 의 {} 안의 값이 유저님께서 컴포넌트에게 내린 어명!
          어명을 따르고 있기 때문에 폼 안의 내용을 수정해도 그냥 그대로 props.title 과 props.body 인 것 -> (13) 으로 이동 */}
      {/* <p><input type="text" name="title" placeholder="title" value={props.title}></input></p> */}
      {/* <p><textarea name="body" placeholder="body" value={props.body}></textarea></p> */}

      {/* (14) (13) 의 const ['title', setTitle], const ['body', setBody] 의 'title', 'body'로 변경
          -> 즉,  props 데이터를 state 데이터로 변경*/}
      {/* <p><input type="text" name="title" placeholder="title" value={title}></input></p> */}
      {/* <p><textarea name="body" placeholder="body" value={body}></textarea></p> */}
            
      {/* (15) 하지만 아직 수정 안됨. 왜냐하면 폼에 연결된 state 가 바뀌지 않은 것! 그러므로 onChange 이벤트 사용 */}
      {/* ** onChange 는 html 의 onChange와 다르게 동작한다!!
              : html 에서는 값이 바뀌고 마우스 포인트가 바깥쪽으로 빠져나갈 때 호출되지만
                React 에서는 값을 입력할 때마다 onChange 가 호출됨 */}
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
        // 값을 입력했을 때 해당 값이 무엇인지가 필요하다
        // console.log - 어떤 값을 입력해도 마지막 값 중 맨 처음 글자 1개만 출력됨
        // javascriptd
        // javascripts
        // javascriptf
        console.log(event.target.value);
        // (16) 자 이제 우리가 할 것 : 우리가 획득한 방금 바뀐 값(event.target.value)을 새로운 state로 바꿔야 함
        // 즉, 우리가 알아낸 가장 최근에 변경된 값(event.target.value)을 새로운 title 값으로 바꾸는 것
        setTitle(event.target.value);
        // 다시 한번 정리하면, props 로 들어온 title에서 state 로 환승 했음. 그 state 를 value 값으로 줌.
        // state 는 컴포넌트 안에서 바꿀 수 있죠? 그래서 onChange 에서
        // 새로운 value 로 키워드를 입력할 떄마다 setTitle 의 값을 지정합니다.
        // 그러면 그 때마다 title 값이 바뀌고 컴포넌트가 다시 랜더링되면서
        // 그 새로운 값이 value 값으로 들어오고 값이 바뀌고 새로운 값이 되는 일련의 과정임
      }}></input></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]);

  let content = null;
  // (3) <li><a href="/update">Update</a></li> 의 세련된 구현을 위한 지역변수 정의
  // 맥락적으로 만들어진, 노출되는 ui 라는 뜻의 context
  let contextControl = null

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
    // (4) mode === 'READ' 일 때만 노출시키기 위해 아래와 같이 작성
    // contextControl = <li><a href="/update">Update</a></li>
    // (6) update 를 했을 때 그 update한 대상의 고유 아이디가 있으니 주소에 추가 - 형식지키기 (현재는 클릭해도 url 변동X)
    // contextControl = <li><a href={'/update/'+id}>Update</a></li>
    // (7) 업데이트를 클릭했을 때 create 추가 및 setMode 로 UPDATE 로 이동하게 만듬
    // setMode 에 상응하기 위해 아래에 else if(mode === 'UPDATE') 작성 -> (8) function Update 로 이동
    contextControl = <li><a href={'/update/'+id} onClick={event => {
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE') {
    // (10) 우리가 이전에 했던 else if(mode === 'READ') 일 때 알아낸 것을 참고! - Update 컴포넌트가 시작하기 전에 코드 삽입
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    // content = <Update></Update>

    // (9) (8) 의 onSubmit 이 됐을 때 해당 props 로 onUpdate를 해주고 있음. 
    // Update 를 사용하는 쪽도 onUpdate 라는 props를 전달해줘야 함
    // () 는 title, body 값을 전달받는 함수
    // ** 기본적으로 업데이트는 수정이기 때문에, 폼의 기존의 내용이 담겨있을 필요성이 있음
    // 그러기 위해서는 Update 컴포넌트가 prop들인 title={} body={} 의 값을 기본적으로 가지고 있어야함
    // 그렇다면 Update 컴포넌트가 어떻게 타이틀과 바디 값을 알아낼까? -> (10) 으로 이동
    // content = <Update onUpdate={(title, body)=>{}}></Update>

    // (11) prop들인 title={} body={} 값을 넣음 - Update 에 title과 body 값이 흘러들어간다
    // 이제 해당 값을 폼에 출력하면 된다 -> (12) function Update 로 이동
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      // (17)-2 title 과 body 에 수정된 값이 잘 들어오는지 확인
      console.log(title, body);
      // (19)-1 우리가 바꾸려고 하는 Topics는 데이터가 객체이다(배열이라는 객체) - 그냥 수정하면 안된다 - 복제하기!
      const newTopics = [...topics]
      // (18) 해야될 것 : 새로운 title 과 body 에 변경된 값으로 Topics를 바꾸면 된다
      // 여기서 id 는 어디서 가져오지? : update는 read 일 때만 작동하며, read 일 때 id 가 자동셋팅돼 있으니 id state 바로 가져오면 된다. 
      const updatedTopic = {id:id, title:title, body:body}
      // (19)-2 기존의 Topics 에서 아이디가 일치하는 것을 찾아야 한다
      for(let i=1; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      // (20) 상세보기 페이지로 이동
      // setId, setNextId 는 할 필요 없음. 새로 생성한 것도 아니고 이미 read 에서 셋팅된 걸 가져다 쓰니까!
      // ** 가장 난이도가 높은 업데이트
      // ** 주의할 점 : 수정이기 때문에 기존의 값이 value 값으로 주입됐을 때, props 에서 state로 갈아탄다
      //               값이 바뀔 때 마다 바뀐 값을 state 로 바꿔서 그 값을 다시 피드백 받아야한다
      setMode('READ');
    }}></Update>
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

      {/* Create 와 Update 둘 다 컨텐츠에 변화를 가하는 오퍼레이션 - (1)-1 강사님이 목록으로 묶음 */}
      {/* 딱히 Create 와 Update 순서가 중요하지 않으니까 ul 로 감싸 목록화 */}
      <ul>
        <li>
        <a href="/create" onClick={(event)=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a>
        </li>
        {/* (1) UPDATE 로 가는 링크 추가 */}
        {/* 업데이트하려면 업데이트할 대상이 필요하잖아요? 예시로 목록의 css 가 2번이니 /update/2 가 우아해(형식 지키기 중요)
            그리고 update 는 상세 정보 페이지에 들어가야 노출되고 웰컴페이지에 안 보이는 것이 세련된 구현 */}

        {/* (2) 위에서 말한 세련된 구현을 위해서 아래의 코드를 잘라내기 -> (3)으로 이동 */}
        {/* <li><a href="/update">Update</a></li> */}
        {/* (5) 사용자가 상세보기에 갔을 때만 update 가 나타남(mode === 'READ' 일 때, contextControl 가 세팅됨) */}
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
