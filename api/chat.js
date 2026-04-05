export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Context about Paul for the AI
    const paulContext = `Tu es l'assistant IA de Paul Chauvière, un jeune professionnel spécialisé en Marketing Digital et Business Development.

Informations sur Paul:
- Récemment diplômé d'un Master à KEDGE BS
- Spécialisé en Marketing Digital, Business Development, E-commerce, SEO/SEA
- Expériences: BNP Paribas (Stage), CFP Animation, GONG Design, Oveja Negra Wines
- Compétences: Pack Office, E-commerce, SEO/SEA, Développement commercial, Gestion CRM, LLM (GPT, Claude, Gemini), Économie Digitale
- Langues: Français (natif), Anglais (C1 - TOEIC 845), Espagnol (C1)
- Intérêts: Sport, Web3, Investissements, Apprentissage
- Disponible pour: CDI, CDD, VIE

Réponds de manière professionnelle et amicale aux questions sur le profil, les expériences et les compétences de Paul.`;

    // Build messages for the API call
    const messages = [
      {
        role: 'system',
        content: paulContext
      },
      ...history,
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API (or your preferred LLM)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Failed to process message',
      response: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer."
    });
  }
}
