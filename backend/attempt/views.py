from django.http import JsonResponse
import os
import json
from django.conf import settings

def get_questions(request):
    # file_path = os.path.join(settings.STATICFILES_DIRS[0], 'questions.json')
    file_path = os.path.join(settings.BASE_DIR, 'attempt/static/questions.json')
    
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            print(data)
        return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({'error': 'File not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Error decoding JSON'}, status=500)
