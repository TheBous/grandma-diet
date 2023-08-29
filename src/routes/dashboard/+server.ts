import OpenAI from 'openai';
import type { RequestHandler } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const OpenAIConfiguration = {
    apiKey: OPENAI_API_KEY,
};
const openai = new OpenAI(OpenAIConfiguration);

export const POST: RequestHandler = async ({ request }) => {
    const { messages } = await request.json();

    const completion = await openai.chat.completions.create({
        messages: (messages as string[]).map((message) => ({ role: 'user', content: message })),
        model: 'gpt-3.5-turbo',
    });

    const chatGPTMessages = completion.choices[0];
    console.warn(chatGPTMessages);
    return json(chatGPTMessages);
};