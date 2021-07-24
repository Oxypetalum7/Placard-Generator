import React, { useState, useEffect } from 'react';
import fukidashi from './fukidashi.png'
import './App.css'
function App() {
  const [text, setName] = useState("");
  const  [context,setContext] = useState(null)

  useEffect(()=>{
    const canvas = document.getElementById("canvas")
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
  },[])

  function DrawImage(){
    const fontSize = 392 / text.length
      if(context!=null){
        const img = new Image()
              img.src = fukidashi // 描画する画像など
              img.onload = () => {
                  context.drawImage(img,0,0)
                  context.font = (fontSize+'px Sans')
                  context.textAlign = 'center'
                  context.textBaseline = 'middle'
                  context.fillText(text, 650, 340)
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header" style={{textAlign:'center'}}>
        <h1>
          プラカードジェネレータ
        </h1>
      </header>
        <body className="body">
          <p>
          プラカードに入れたいテキストを下に入力して、"Generate"ボタンを押してください。
          </p>
          <input type="text" name="name" value={text}onChange={(e) => { setName(e.target.value) }}/>
          <button onClick={DrawImage} id="generatebtn" >
            Generate
          </button>
          <br/>
          <br/>
          <div className="canvasWrapper">
            <canvas width="1280" height="720" id="canvas"></canvas>
          </div>
          <br/>
        </body>
      <footer>
        created by <a href="https://twitter.com/E_oxypetalum_7">@E_oxypetalum_7</a>
      </footer>
    </div>
  );
}

export default App;
