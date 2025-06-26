// DOM elements
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
const preview = document.getElementById('preview');
const imagePreview = document.getElementById('imagePreview');
const progress = document.getElementById('progress');
const results = document.getElementById('results');

// API keys
const IMGBB_API_KEY = "e76f18f10afab25316a8f8bddae4a928";
const GROQ_API_KEY = "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";

// Handle button click to trigger file input
uploadBtn.addEventListener('click', () => imageInput.click());

// Handle file input change
imageInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  preview.classList.remove('hidden');
  imagePreview.src = URL.createObjectURL(file);
  progress.classList.remove('hidden');
  results.innerHTML = '';

  try {
    // Upload to ImgBB
    const formData = new FormData();
    formData.append('image', file);
    const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });
    const uploadJson = await uploadRes.json();
    if (!uploadJson.success) throw new Error('ImgBB upload failed');
    const imageUrl = uploadJson.data.url;

    // Send to Groq
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        temperature: 0.7,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are a nutrition expert. Analyze the following food image. Your task is:

- Identify each individual food item visible in the image (e.g., rice, paneer, dal, roti, etc.)
- For each item, estimate its total nutritional content based on the visible quantity

Return ONLY valid JSON using this exact structure:

{
  "items": [
    {
      "item_name": "string",
      "total_calories": number,
      "total_protein": number,
      "total_carbs": number,
      "total_fats": number
    }
  ]
}

⚠️ Do NOT group items into dishes.
⚠️ Do NOT explain anything.
Return ONLY the JSON object.
Avoid values if an item is unidentifiable.`
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
      }),
    });

    const groqData = await groqRes.json();
    progress.classList.add('hidden');

    try {
      const content = groqData.choices[0].message.content;
      const json = JSON.parse(content);

      json.items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'food-card bg-white rounded-lg shadow-md p-4';
        card.innerHTML = `
          <h3 class="text-lg font-semibold mb-2 capitalize">${item.item_name}</h3>
          <p class="text-gray-600">Calories: <strong>${item.total_calories} kcal</strong></p>
          <p class="text-gray-600">Protein: ${item.total_protein} g</p>
          <p class="text-gray-600">Carbs: ${item.total_carbs} g</p>
          <p class="text-gray-600">Fats: ${item.total_fats} g</p>
        `;
        results.appendChild(card);
      });
    } catch (e) {
      results.innerHTML = `<p class="text-red-500">Error parsing response: ${e.message}</p>`;
    }
  } catch (error) {
    progress.classList.add('hidden');
    results.innerHTML = `<p class="text-red-500">Error processing image: ${error.message}</p>`;
  }
});

// Drag and drop support
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    imageInput.files = e.dataTransfer.files;
    imageInput.dispatchEvent(new Event('change'));
  }
});
