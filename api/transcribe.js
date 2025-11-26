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
    const { audio } = req.body;

    if (!audio) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    console.log('API Key present:', !!process.env.OPENAI_API_KEY);
    console.log('Audio data length:', audio.length);

    // Convert base64 audio to buffer
    const base64Data = audio.includes(',') ? audio.split(',')[1] : audio;
    const audioBuffer = Buffer.from(base64Data, 'base64');

    console.log('Buffer size:', audioBuffer.length);

    // Create a File object compatible with OpenAI SDK
    // The SDK expects a File with name and type properties
    const file = new File([audioBuffer], 'recording.webm', {
      type: 'audio/webm',
    });

    console.log('Calling Whisper API...');

    // Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
    });

    console.log('Transcription successful:', transcription.text);

    return res.status(200).json({
      success: true,
      transcription: transcription.text,
    });
  } catch (error) {
    console.error('Transcription error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    return res.status(500).json({
      error: 'Failed to transcribe audio',
      details: error.message,
      errorName: error.name,
    });
  }
}
