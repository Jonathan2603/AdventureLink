const axios = require('axios');

exports.generateItinerary = async (req, res) => {
  const { place, travelDates, numberOfTravelers, interests, budget, travelRadius } = req.body;

  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant that generates detailed travel itineraries in a structured format.',
    },
    {
      role: 'user',
      content: `Generate a detailed travel itinerary for visiting ${place} from ${travelDates.start} to ${travelDates.end} for ${numberOfTravelers} people interested in ${interests}. The budget is £${budget} per person and the travel should be within a ${travelRadius}km radius. Include restaurants, hotels and activities based on the time of travel and interests.`
    }
  ];

  try {
    const openAIResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ itinerary: openAIResponse.data.choices[0].message.content }); // Adjusted to fit the chat completions API response structure
  } catch (error) {
    console.error('Error generating itinerary with OpenAI', error);
    if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Status code:', error.response.status);
    }
    res.status(500).json({ message: 'Failed to generate itinerary', error: error.message });
  }
};
