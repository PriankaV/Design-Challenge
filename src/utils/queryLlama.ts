export async function queryLlama(prompt: string): Promise<string> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3-8b-instruct', // or 'meta-llama/llama-3-70b-instruct'
      messages: [
        { role: 'system', content: 'You are a helpful assistant focused on food, nutrition, and general health.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'Sorry, I couldn’t find anything!';
}
