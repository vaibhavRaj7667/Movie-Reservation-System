from django.db import models
from django.core.exceptions import ValidationError
from datetime import timedelta
from django.db.models import UniqueConstraint
from django.db.models.functions import Lower


class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    class Meta:
        constraints=[
            UniqueConstraint(
                Lower('name'),
                name="genre_name_case_indenstive_unique",
                violation_error_message="genre alredy exist"

            )
        ]
        pass

class Movies(models.Model):
    language = models.CharField(max_length=100)
    genres = models.ManyToManyField(Genre, related_name='movies')
    title = models.CharField(max_length=100)
    description = models.TextField()
    release_date = models.DateField()
    duration = models.IntegerField()  
    imdb_page = models.URLField()
    poster = models.URLField()

    def __str__(self):
        return self.title


class Show(models.Model):
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, related_name='show')
    show_time = models.DateTimeField()
    available_seats = models.IntegerField()

    def __str__(self):
        return f"{self.movie.title} - {self.show_time.strftime('%Y-%m-%d %H:%M')}"
    
    def clean(self):
        show_end_time = self.show_time + timedelta(minutes=self.movie.duration)
        gap = timedelta(minutes=15)
        show_end_time_with_gap = show_end_time + gap

        overlapping_shows = Show.objects.filter(
            movie=self.movie,
            show_time__lt=show_end_time_with_gap,
            show_time__gte=self.show_time - timedelta(minutes=self.movie.duration) - gap
        ).exclude(pk=self.pk)

        for other_show in overlapping_shows:
            other_end_time = other_show.show_time + timedelta(minutes=other_show.movie.duration) + gap
            if self.show_time < other_end_time and show_end_time_with_gap > other_show.show_time:
                raise ValidationError("Show times overlap with another show for this movie.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)