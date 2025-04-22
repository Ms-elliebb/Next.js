import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { prompt }: { prompt: string } = await request.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.' },
      { status: 500 } // 500 daha uygun olabilir çünkü bu sunucu yapılandırma hatası
    );
  }

  if (!prompt) {
    return NextResponse.json(
      { error: 'İstek gövdesinde "prompt" alanı eksik.' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' }, // İsteğe bağlı sistem mesajı
          { role: 'user', content: prompt },
        ],
        temperature: 0.7, // Yaratıcılık seviyesi (isteğe bağlı)
        max_tokens: 150,  // Maksimum token sayısı (isteğe bağlı)
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const aiResponse = response.data.choices[0]?.message?.content;

    if (!aiResponse) {
      console.error('OpenAI API yanıtında beklenen içerik bulunamadı:', response.data);
      return NextResponse.json(
        { error: 'Yapay zekadan geçerli bir yanıt alınamadı.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: aiResponse });

  } catch (error: unknown) {
    console.error('OpenAI API çağrısı sırasında hata:', error);

    let errorMessage = 'Metin üretilirken bir hata oluştu.';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // OpenAI API'den gelen hata
        errorMessage = error.response.data?.error?.message || errorMessage;
        statusCode = error.response.status;
        if (statusCode === 401) {
            errorMessage = "Geçersiz OpenAI API anahtarı."
        } else if (statusCode === 429) {
            errorMessage = "OpenAI API limitleri aşıldı. Lütfen daha sonra tekrar deneyin."
        }
      } else if (error.request) {
        // İstek yapıldı ama yanıt alınamadı (ağ hatası vb.)
        errorMessage = 'Yapay zeka servisine ulaşılamadı. Ağ bağlantınızı kontrol edin.';
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
} 