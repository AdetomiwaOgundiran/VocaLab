import OpenAI from 'openai';

export default async function handler(req, res) {
  try {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'API key not configured',
        message: 'OPENAI_API_KEY environment variable is missing'
      });
    }

    // Check API key format
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey.startsWith('sk-')) {
      return res.status(500).json({
        error: 'Invalid API key format',
        message: 'API key should start with sk-',
        keyPrefix: apiKey.substring(0, 3)
      });
    }

    // Try to initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Test with a simple API call (cheapest possible)
    const response = await openai.models.list();

    return res.status(200).json({
      success: true,
      message: 'OpenAI connection successful!',
      apiKeyPresent: true,
      apiKeyFormat: 'Valid (starts with sk-)',
      modelsAvailable: response.data.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'OpenAI connection failed',
      message: error.message,
      errorType: error.constructor.name,
      details: error.response?.data || error.toString()
    });
  }
}
