import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [showDetailh,setShowDetailh] = useState(false);
  const handleToggleh = () => setShowDetailh(!showDetailh);
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])



  return (
    <>
      <div className="file">
        <h3>File Explorer</h3>
      <h5><button style={{ backgroundColor: "white", border: "2px solid #4CAF50", height: "20px"}} onClick={handleToggleh}>
        show files </button></h5> 
      </div>
      <div className="baki">
        <div className="pane top-pane">
          {showDetailh&&<Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />}
          {showDetailh&&<Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />}
          {showDetailh&&<Editor
            language="javascript"
            displayName="JS"
            value={js}
            onChange={setJs}
          />}
        <div className="pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
     </div>
     </div> 
    </>
  )
}

export default App;
