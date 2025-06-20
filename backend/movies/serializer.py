from rest_framework import serializers
from movies.models import Movies, Genre, Show


class GenereSerializer(serializers.ModelSerializer):
    class Meta:
        model=Genre
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):

    genres = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(),
        many=True
    )

    class Meta:
        model = Movies
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['genres'] = [genre.name for genre in instance.genres.all()]
        return rep

    def create(self, validated_data):
        genres = validated_data.pop('genres', [])
        movie = Movies.objects.create(**validated_data)
        movie.genres.set(genres)
        return movie

    def update(self, instance, validated_data):
        genres = validated_data.pop('genres', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if genres is not None:
            instance.genres.set(genres)
        return instance
    


class ShowsSerializer(serializers.ModelSerializer):
    movie = serializers.CharField(source='movie.title')  # Use the movie's title instead of its ID

    class Meta:
        model = Show
        fields = '__all__'