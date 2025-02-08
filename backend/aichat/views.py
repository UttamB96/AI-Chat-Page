from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt  # For simplicity in development; use proper auth in production
def generate_response(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            model = data.get('model', 'llama3.2:1b')  # Model can be provided by user. Defaults to Llama3.2:1B
            prompt = data.get('prompt')
            
            if not prompt:
                return JsonResponse({'error': 'Prompt is required'}, status=400)

            # Send request to local Ollama API
            ollama_url = 'http://localhost:11434/api/generate'
            payload = {
                'model': model,
                'prompt': prompt,
                'stream': False
            }
            
            response = requests.post(ollama_url, json=payload)
            response.raise_for_status()  # Raise exception for HTTP errors
            
            ollama_data = response.json()
            return JsonResponse({'response': ollama_data.get('response', '')})
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': f'Ollama connection error: {str(e)}'}, status=502)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Only POST method allowed'}, status=405)