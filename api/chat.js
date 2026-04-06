import Groq from 'groq-sdk';

// Function to clean Markdown formatting for better readability
function cleanMarkdown(text) {
  // Remove bold formatting (**text** -> text)
  text = text.replace(/\*\*(.+?)\*\*/g, '$1');
  
  // Remove italic formatting (*text* -> text)
  text = text.replace(/\*(.+?)\*/g, '$1');
  
  // Remove markdown headers (# -> empty, ## -> empty, etc)
  text = text.replace(/^#+\s+/gm, '');
  
  // Convert markdown lists to simple text with bullets
  text = text.replace(/^\s*[-*+]\s+/gm, '• ');
  
  // Remove code blocks formatting (```code``` -> code)
  text = text.replace(/```[\s\S]*?```/g, (match) => {
    return match.replace(/```/g, '').trim();
  });
  
  // Remove inline code formatting (`code` -> code)
  text = text.replace(/`([^`]+)`/g, '$1');
  
  // Clean up multiple spaces
  text = text.replace(/  +/g, ' ');
  
  // Clean up multiple newlines (keep max 2)
  text = text.replace(/\n{3,}/g, '\n\n');
  
  // Trim whitespace
  text = text.trim();
  
  return text;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'API key not configured',
      response: "Désolé, le chatbot n'est pas configuré correctement. Veuillez contacter l'administrateur."
    });
  }

  try {
    // Initialize Groq client
    const client = new Groq({ apiKey });

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

Réponds de manière professionnelle et amicale aux questions sur le profil, les expériences et les compétences de Paul. Réponds de manière concise et lisible, sans utiliser de formatage Markdown complexe.`;

    // Build conversation history for Groq
    const conversationHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add the new user message
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Call Groq API with conversation history
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: paulContext
        },
        ...conversationHistory
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.95,
    });

    // Extract the response text
    let botResponse = response.choices[0]?.message?.content || 
      "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer.";

    // Clean up Markdown formatting for better readability
    botResponse = cleanMarkdown(botResponse);

    return res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process message',
      response: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer."
    });
  }
}
