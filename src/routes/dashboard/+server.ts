import OpenAI from 'openai';
import type { RequestHandler } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const OpenAIConfiguration = {
    apiKey: OPENAI_API_KEY,
};

const openai = new OpenAI(OpenAIConfiguration);

export const POST: RequestHandler = async ({ request }) => {
    const {
        messages,
        highProtein,
        highCarbs,
        highGrass,
        diet }
        = await request.json();

    if (highProtein) messages[0] += '. I want to eat high protein food.';
    if (highCarbs) messages[0] += '. I want to eat high carbs food.';
    if (highGrass) messages[0] += '. I want to eat high grass food.';
    if (diet) messages[0] += '. I want to eat diet food.';

    console.warn(messages[0]);

    const completion = await openai.chat.completions.create({
        messages: (messages as string[]).map((message) => ({ role: 'user', content: message })),
        model: 'gpt-3.5-turbo',
    });

    const chatGPTMessages = completion.choices[0];
    return json(chatGPTMessages);
};