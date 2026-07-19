from dotenv import load_dotenv
import os
from google import genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)


def summarize_prompt(title, article_text):
    response = client.models.generate_content(
        model='gemini-3.1-flash-lite',
        contents=f"Summarize this news article in 3-4 simple, plain-English sentences (a TLDR). Avoid jargon. Return only the summary text, with no preamble or labels.\n\nTitle: {title}\nArticle: {article_text}"
    )
    return response.text
