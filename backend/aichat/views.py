from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework .response import Response
from authenticate.authenticate import CookieJWTAuthentication
import requests, json, uuid

class GenerateResponseView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        if request.method == 'POST':
            try:
                # Parse JSON data from request body
                data = json.loads(request.body)
                model = data.get('model', 'llama3.2:1b')  # Model can be provided by user. Defaults to Llama3.2:1B
                prompt = data.get('prompt')
                
                # Validate Response
                if not prompt:
                    return JsonResponse({'error': 'Prompt is required'}, status=400)
                
                # Get or create session ID
                #session_id = data.get('auth_token') or uuid.uuid4()

                # Send request to local Ollama API
                ollama_url = 'http://localhost:11434/api/generate'
                payload = {
                    'model': model,
                    'prompt': prompt,
                    'stream': False
                }
                
                # Call Model API
                model_response = requests.post(ollama_url, json=payload)
                model_response.raise_for_status()  # Raise exception for HTTP errors
                
                model_data = model_response.json()
                return JsonResponse({'response': model_data.get('response', '')})
                
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON'}, status=400)
            except requests.exceptions.RequestException as e:
                return JsonResponse({'error': f'Ollama connection error: {str(e)}'}, status=502)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
    
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)