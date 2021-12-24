from rest_framework import serializers
from .models import BikeRack, LocalBusiness


class LocalBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalBusiness
        fields = ('id', 'name','address','address_number','postal_code','security','proposed_by')

class BikeRackSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikeRack
        fields = ('id', 'address', 'rating', 'school', 'players', 'surveillance_efficiency')
