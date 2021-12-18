from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import BikeRackSerializer, LocalBusinessSerializer
from .models import BikeRack, LocalBusiness

# Create your views here.
""" class LocalBusinessView(generics.CreateAPIView):
    queryset = LocalBusiness.objects.all()
    serializer_class = LocalBusinessSerializer """
    

class BikeRackView(generics.ListAPIView):
    queryset = BikeRack.objects.all()
    serializer_class = BikeRackSerializer

class BikeRacksADDView(generics.CreateAPIView):
    queryset = BikeRack.objects.all()
    serializer_class = BikeRackSerializer
