from django.shortcuts import render


def crud_demo(request):
    return render(request, 'crud_demo/crud_demo.html')
