
from django.conf.urls import include
from django.urls import path

from landing_page.models import BikeRack
from .views import BikeRackView, BikeRacksADDView

urlpatterns = [
    path('get-data', BikeRackView.as_view()),
    path('add-data', BikeRacksADDView.as_view())
]