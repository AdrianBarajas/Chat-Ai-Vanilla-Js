import './style.css'
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

 const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY
 })

const app = document.querySelector('#app');
const form = document.querySelector('form')
const submitBtn = document.querySelector('#submit')

form.addEventListener('submit',async e => {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value

  

  if(prompt.trim() === ''){
    alert('La consulta no puede ir vacia');
    return;
  }

  submitBtn.disabled = true;

  const result = streamText({
    model:openrouter('nvidia/nemotron-3.5-lightning:free'),
    //model:openrouter('google/gemma-4-26b-a4b-it:free'),
    prompt,
    system:'You are an expert'
  })

  while(app.firstChild){
    app.removeChild(app.firstChild);
  }

  for await( const text of result.textStream){
    app.append(text);
  }

  submitBtn.disabled = false;

})