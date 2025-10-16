import express, { Request, Response } from "express";
import cors from 'cors';
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = '02578860-ade7-4d51-9b99-063333103ba6';

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/src')));
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/dictionary/:word', async (req: Request, res: Response) => {
  const { word } = req.params;
  
  try {
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${API_KEY}`;
    console.log('Fetching:', apiUrl);
    
    const response = await fetch(apiUrl);
    console.log('Response status:', response.status);
    
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      return res.status(response.status).json({
        error: 'Failed to fetch definition',
        details: errorText
      });
    }
    
    // Check if response is actually JSON
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Data received:', data);
      return res.json(data);
    } else {
      // Handle non-JSON response
      const textResponse = await response.text();
      console.log('Non-JSON response:', textResponse);
      return res.status(500).json({
        error: 'API returned non-JSON response',
        details: textResponse
      });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch word definition',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});