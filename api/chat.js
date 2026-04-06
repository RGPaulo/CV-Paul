export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'API key not configured',
      response: "Désolé, le chatbot n'est pas configuré correctement. Veuillez contacter l'administrateur."
    });
  }

  try {
    // Context about Paul for the AI
    const paulContext = `Tu es l'assistant IA de Paul Chauvière, un jeune professionnel spécialisé en Marketing Digital et Business Development.

Informations sur Paul:
- Récemment diplômé d'un Master à KEDGE BS
- Spécialisé en Marketing Digital, Business Development, E-commerce, SEO/SEA
- Expériences: BNP Paribas (Stage), CFP Animation, GONG Design, Oveja Negra Wines
- Compétences: Pack Office, E-commerce, SEO/SEA, Développement commercial, Gestion CRM, LLM (GPT, Claude, Gemini), Économie Digitale, Investissements financiers
- Langues: Français (natif), Anglais (C1 - TOEIC 845), Espagnol (C1)
- Intérêts: Sport, Web3, Investissements, Apprentissage
- Disponible pour: CDI, CDD, VIE

Réponds de manière professionnelle et amicale aux questions sur le profil, les expériences et les compétences de Paul.`;

    // Build conversation history for Gemini
    const conversationHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add the new user message
    conversationHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Google Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: paulContext }]
          },
          ...conversationHistory
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
        ],
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from Gemini
    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer.";

    return res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process message',
      response: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer."
    });
  }
}
