import json
from django.shortcuts import render
from django.views import View
from .models import UserProfile
from .forms import UserProfileForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class UserProfileView(View):

    def crud_demo(self, request):
        return render(request, 'crud_demo/crud_demo_form.html')

    def get(self, request):
        user_profile = UserProfile.objects.all()
        return render(request, 'crud_demo/crud_demo_form.html', {'user_data': user_profile, 'form': UserProfileForm()})

    def post(self, request):
        form = UserProfileForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data.get('name')
            email = form.cleaned_data.get('email')
            mobile = form.cleaned_data.get('mobile')
            address = form.cleaned_data.get('address')
            gender = form.cleaned_data.get('gender')
            date_of_birth = form.cleaned_data.get('date_of_birth')
            blood_grp = form.cleaned_data.get('blood_group')

            if 'store_id' in request.POST and request.POST['store_id'] != '':
                pk = int(request.POST['store_id'])
                # Update record Query
                UserProfile.objects.filter(pk=pk).update(name=name, email=email, mobile=mobile,
                                                         address=address, gender=gender, date_of_birth=date_of_birth, blood_group=blood_grp)
                UserProfile.objects.get(id=pk).save()
                request_data = request.POST.copy()
                request_data['id'] = pk
                return JsonResponse({'status': 'success', 'response': json.dumps(request_data)})
            else:
                # Create record
                new_record_id = UserProfile.objects.create(
                    name=name, email=email, mobile=mobile, address=address, gender=gender, date_of_birth=date_of_birth, blood_group=blood_grp)
                new_record_id.save()
                request_data = request.POST.copy()
                request_data['id'] = new_record_id.id
                return JsonResponse({'status': 'success', 'response': json.dumps(request_data)})
        else:
            return JsonResponse({'status': 'fail', 'response': json.dumps(form.errors)})
        return render(request, 'profile_form.html', {'form': UserProfileForm(), 'errors': form.errors})

    @csrf_exempt
    def delete(self, request, *args, **kwargs):
        if request and request.body:
            body = (request.body).decode('utf-8')
            if len(body.split('=')) == 2:
                del_rec_id = int(body.split('=')[1])
            else:
                return JsonResponse({'status': 'not_found'})
            if del_rec_id:
                UserProfile.objects.filter(id=del_rec_id).delete()
            return JsonResponse({'status': 'success', 'row_id': del_rec_id})
        else:
            return JsonResponse({'status': 'fail'})
        return JsonResponse({'status': 'fail'})
