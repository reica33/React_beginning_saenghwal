import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// CRUD(CREATE 생성 READ 읽기 UPDATE 수정 DELETE 삭제)
// 자 이제 마지막 조각을 맞추면 퍼즐이 완성이 됩니다. DELETE 기능을 구현해 봅시다.
// Delete 를 구현하기 위해서는 update 버튼 밑에 구현할 겁니다.
// 그런데 Create나 Update는 특정 페이지로 이동하기 때문에 링크에요
// 하지만 Delete 는 누르자마자 삭제를 시켜버릴 것이기 때문에 링크를 사용하면 안되고 버튼을 사용해야 합니다.

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

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return <article>
    <h2>Update</h2>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
        console.log(event.target.value);
        setTitle(event.target.value);
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
    // (2) contextControl 에 기존 li 태그가 있었고 거기에 또 하나의 li 태그를 묶어야 함.
    // React 에서는 태그를 다룰 때 꼭 하나의 태그 안에 들어있어야 한다 
    // 그래서 제목이 없는 태그(<></>)를 쓰면 그냥 복수의 태그를 그룹핑하는 용도로만 사용하는 빈 태그 라고 생각하면 된다.
    // contextControl = <li><a href={'/update/'+id} onClick={event => {
    //   event.preventDefault();
    //   setMode('UPDATE');
    // }}>Update</a></li>
    // 실제로 <></> 빈 태그를 사용하면 html 코드상에서는 어떤 태그도 존재하지 않음.
    contextControl = <>
      <li><a href={'/update/'+id} onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      {/* (3) button 타입은 특별히 기본 behavior 가 없기 때문에 event.preventDefault(); 안해도 됨 */}
      <li>
        <input type="button" value="Delete" onClick={()=>{
          // (4) 우리가 삭제할 데이터 : Topics 데이터
          // 삭제하기 위해서 아래와 같이 newTopics 배열을 만들고 for 문을 돌림
          // 여기서 newTopics 는 오리지널 데이터인 Topics 가 아님. 복제본은 아니지만 오리지널과는 다른 데이터.
          const newTopics = []
          for(let i=0; i<topics.length; i++) {
            // topics 의 아이디와 현재 선택된 아이디가 같지 않다면
            if(topics[i].id !== id) {
              // 위 newTopics 에 새로운 데이터topics[i]를 push 해서 새로운 topics 를 만듬
              newTopics.push(topics[i]);
            }
          }
          // 새로 만든 그 topics 를 setTopics 에 newTopics 로 던져주는 것
          setTopics(newTopics);
          // (5) 마무리 : 토픽을 삭제하면 상세보기를 볼 수 없으니 웰컵 페이지로 가야 한다
          setMode('WELCOME');
        }} />
      </li>
    </>
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
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      console.log(title, body);
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=1; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
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

      <ul>
        <li>
        <a href="/create" onClick={(event)=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a>
        </li>
        {/* (1) 자 그러면 delete 버튼을 어디에 위치시킬 것이냐?
            - read 로 들어갔을 때 보여지는 ui 가 담겨져있는 contextControl 을 이용하자 -> (2) 로 이동 */}
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
