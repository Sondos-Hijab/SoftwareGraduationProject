from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax
import sys
import json
import numpy as np

def analyze_sentiment(sentence):
    # Sentiment Analysis using RoBERTa Model
    MODEL = "cardiffnlp/twitter-roberta-base-sentiment"
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)

    encoded_text = tokenizer(sentence, return_tensors='pt')
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)

    # Convert float32 values to standard Python floats
    scores = scores.astype(np.float64)

    # Combine results
    combined_result = {
        # **vader_result,
        **{
            'neg': float(scores[0]),
            'neu': float(scores[1]),
            'pos': float(scores[2])
        }
    }

    return combined_result

# Read sentence from standard input
sentence = sys.stdin.readline().strip()

# Analyze sentiment and output result
result = analyze_sentiment(sentence)
print(json.dumps(result))
