import { GoogleGenerativeAI } from '@google/generative-ai';

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
    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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

    // Build conversation history
    const conversationHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Add the new user message
    conversationHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Build the full prompt with context
    const fullPrompt = `${paulContext}\n\nQuestion: ${message}`;

    // Generate content using the SDK
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: fullPrompt }]
        },
        ...conversationHistory.slice(0, -1) // Add previous messages for context
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
    });

    // Extract the response text
    const botResponse = result.response.text() || 
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
