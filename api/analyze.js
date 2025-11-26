import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { transcription } = req.body;

    if (!transcription) {
      return res.status(400).json({ error: 'Transcription is required' });
    }

    console.log('Transcription received:', transcription.substring(0, 100));
    console.log('Calling GPT-4...');

    // Analyze the pitch using GPT-4o-mini (more accessible and cheaper)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert product strategist and startup advisor. Analyze startup pitches and recommend the best product development framework, then generate a detailed roadmap.

Available frameworks:
1. Lean Startup - Build-Measure-Learn for rapid iteration
2. Design Thinking - Human-centered innovation approach
3. Agile Scrum - Iterative development with sprints
4. Jobs-to-be-Done - Focus on customer goals
5. Double Diamond - Divergent and convergent thinking

Return your response as valid JSON with this exact structure:
{
  "framework": {
    "name": "Framework Name",
    "description": "Brief description"
  },
  "phases": [
    {
      "title": "Phase title",
      "description": "Detailed description",
      "priority": "high|medium|low",
      "tags": ["tag1", "tag2"]
    }
  ]
}

Generate 6-8 phases that are specific to the pitch, not generic templates.`,
        },
        {
          role: 'user',
          content: `Analyze this startup pitch and create a customized product roadmap:\n\n${transcription}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    console.log('GPT response received');

    const analysis = JSON.parse(completion.choices[0].message.content);

    console.log('Analysis successful');

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    return res.status(500).json({
      error: 'Failed to analyze pitch',
      details: error.message,
      errorName: error.name,
      errorCode: error.code,
    });
  }
}
