json.array!(@timings) do |timing|
  json.extract! timing, :id, :time, :movie
  json.url timing_url(timing, format: :json)
end
