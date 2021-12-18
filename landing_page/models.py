from django.db import models

# Create your models here.
class LocalBusiness(models.Model):
    name = models.CharField(max_length=50, default="", unique=True)
    address = models.CharField(max_length=50, default="", unique=True)
    address_number = models.IntegerField(default="", unique=False)
    postal_code = models.IntegerField(default="", unique=False)
    security = models.IntegerField(default="", unique=False) #TODO: https://stackoverflow.com/questions/33772947/django-set-range-for-integer-model-field-as-constraint
    proposed_by = models.CharField(max_length=50, unique=True)


class BikeRack(models.Model):
    address = models.CharField(max_length=50, default="", unique=True)
    rating = models.IntegerField(default="", unique=False)
    school = models.CharField(max_length=50, default='', unique=False)
    players = models.CharField(max_length=50, default='', unique=False)

    def __str__(self) -> str:
        return self.address