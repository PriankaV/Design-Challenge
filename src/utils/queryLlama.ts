export async function queryLlama(prompt: string): Promise<string> {
  console.log('API Key:', process.env.OPENROUTER_API_KEY); 

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistral:7b',
      messages: [
        {
          role: 'system',
          content:
            'You are a friendly nutrition expert. Provide detailed and practical advice on healthy eating, building muscle, and fitness. If unsure, suggest resources to consult.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  console.log('Response status:', res.status);

  const rawText = await res.text();
  console.log('Raw response text:', rawText);

  try {
    const data = JSON.parse(rawText);
    if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
      return data.choices[0].message.content;
    } else {
      return 'Hmm, I didn’t find a clear answer. Please try rephrasing!';
    }
  } catch (err) {
    console.error('Failed to parse JSON:', err);
    return 'Hmm, there was an error parsing the response. Please try again later!';
  }
}
