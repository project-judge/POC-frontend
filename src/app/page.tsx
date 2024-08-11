'use client'

import { useState } from "react";

export default function Home() {

  const [code, setCode] = useState('')

  async function sendCode() {

    const data = {
      code
    }
    const response = await fetch('/api/solution', {
      method: 'POST', // Especifica o método HTTP como POST
      headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify(data) // Converte o objeto JavaScript para JSON
  });

  const result = await response.json();
  console.log({result})
  }


  return (
    <div>
       <h1>Editor</h1>

       <textarea value={code} onChange={(e) => setCode(e.target.value)} />

        <button onClick={sendCode}>Enviar</button>

    </div>
   
  );
}
