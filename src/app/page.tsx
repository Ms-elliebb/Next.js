'use client'; // State kullanacağımız için client component olarak işaretliyoruz

import React, { useState } from 'react';
import axios from 'axios'; // axios import'u ekleniyor

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('AI response will appear here...'); // Başlangıç değeri
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu (Faz 3'te kullanılacak)
  const [error, setError] = useState<string | null>(null); // Hata mesajları için state

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous error before new request
    setResult(''); // Clear previous result before new request (optional)

    try {
      const response = await axios.post('/api/generate', {
        prompt: prompt,
      });

      if (response.data.result) {
        setResult(response.data.result);
      } else {
        // API response format unexpected
        console.error("API response format unexpected:", response.data);
        setError("Unexpected response received from API.");
      }

    } catch (err: unknown) {
      console.error('API call error:', err); // Log the original error
      let message = "An error occurred while generating text. Please try again.";
      if (axios.isAxiosError(err) && err.response) {
        // Use error message from API if available
        message = err.response.data.error || message;
      } else if (err instanceof Error) {
        // Other JavaScript errors
        message = err.message;
      }
      setError(message);
      setResult(''); // Clear result on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-center p-6">
      <div className="complex-gradient-background thin-white-glow w-full max-w-2xl p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          AI Text Generator
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="prompt-input" className="block text-sm font-medium text-white mb-2">
              Enter Text:
            </label>
            <textarea
              id="prompt-input"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y shadow-sm text-white placeholder:text-gray-200"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write something here to generate or process text..."
              required
              disabled={isLoading} // Yükleme sırasında girişi devre dışı bırak
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()} // Boş prompt gönderimini de engelle
              className={`px-6 py-2 border border-white text-white rounded-md transition-colors duration-200 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading || !prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </button>
          </div>
        </form>

        {(error || result) && ( // Sadece hata veya sonuç varsa göster
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 text-white">
              {error ? 'Error:' : 'Result:'}
            </h2>
            <div className={`w-full p-4 border rounded-md whitespace-pre-wrap min-h-[100px] ${error ? 'border-red-200 text-red-300' : 'border-gray-200 text-white'}`}>
              {error || result}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-10 text-center text-gray-500 text-sm">
         AI Text Tool v0.1
      </footer>
    </main>
  );
}
