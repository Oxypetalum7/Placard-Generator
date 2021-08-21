import React, { useState, useEffect } from 'react';
import fukidashi from './fukidashi.png'
import {AppBar, Typography, Toolbar, Box, Button, createTheme, ThemeProvider, Container, Grid, TextField} from '@material-ui/core'
import './App.css'
import { blue } from '@material-ui/core/colors';

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans JP"
  },
  palette: {
    primary: blue,
  },
  })
function App() {
  const [text, setName] = useState("");
  const  [context,setContext] = useState(null)
  const [isDownloadButton, setIsDownloadButton] = useState("none")

  useEffect(()=>{
    const canvas = document.getElementById("canvas")
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
    document.getElementById("download").style.display = {isDownloadButton}
  },[])

  function DrawImage(){
    const fontSize = 392 / text.length
    if(context!=null){
      const img = new Image()
      img.src = fukidashi // 描画する画像など
      img.onload = () => {
        context.drawImage(img,0,0)
        context.font = (fontSize+'px Noto Sans JP')
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(text, 650, 340)
      }
      setIsDownloadButton("block")
    }
  }

  function DownloadImage(){
    const img = document.getElementById('canvas')
    const dl = document.createElement('a')
    dl.href = img.toDataURL('imgae/png')
    dl.download = 'PlacardGenerator.png'
    dl.click()
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}> 
      <AppBar>
          <Toolbar display="flex" justifyContent="center" alignItems="center" >
                <Box>
                    <Typography variant="h5">
                        プラカードジェネレータ
                    </Typography>
                </Box>
          </Toolbar>
        </AppBar>
        <Container className='body'>
          <Grid container justifyContent='center' spacing={5}>
            <Grid item>
              <Typography variant='body'>
              プラカードに入れたいテキストを下に入力して、"Generate"ボタンを押してください。
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' spacing={5}>
            <Grid item>
                <TextField id="outlined-basic" label="Text" variant="outlined" value={text} onChange={(e) => { setName(e.target.value) }}/>
            </Grid>
            <Grid item>
              <Button onClick={DrawImage} id="generatebtn" color="primary">
                Generate
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' spacing={5}>
            <Grid item>
              <Box className="canvasWrapper">
                <canvas width="1280" height="720" id="canvas"></canvas>
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' spacing={3}>
            <Button id="download" label='Download' onClick={DownloadImage} color="primary">
              Download
            </Button>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
