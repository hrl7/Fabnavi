json.array!(@movies) do |movie|
  json.extract! movie, :id, :file, :project
  json.url movie_url(movie, format: :json)
end
