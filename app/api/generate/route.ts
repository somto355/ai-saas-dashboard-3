export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  const data = await response.json();

  return Response.json({
    result: data[0]?.generated_text || "No response",
  });
}
