import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.jsx'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="text-center">
      <div class="flex justify-center space-x-4 mb-8">
        <a href="https://vite.dev" target="_blank" class="block transition-transform hover:scale-110">
          <img src="${viteLogo}" class="w-24 h-24 hover:drop-shadow-lg" alt="Vite logo" />
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" class="block transition-transform hover:scale-110">
          <img src="${javascriptLogo}" class="w-24 h-24 hover:drop-shadow-lg" alt="JavaScript logo" />
        </a>
      </div>
      <h1 class="text-5xl font-bold text-gray-800 mb-8">Hello Vite + Tailwind!</h1>
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <button id="counter" type="button" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"></button>
      </div>
      <p class="text-gray-600 mt-8">
        Click on the Vite and JavaScript logos to learn more
      </p>
    </div>
  </div>
  </div>
`

setupCounter(document.querySelector('#counter'))
