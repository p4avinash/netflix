// import OpenAI from "openai"

// const openai = new OpenAI({
//   apiKey: process.env.REACT_APP_GEMINI_API_KEY,
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
//   dangerouslyAllowBrowser: true,
// })

// export default openai

import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
})

export default client
