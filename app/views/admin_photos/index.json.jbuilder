json.array!(@photos) do |photo|
  json.extract! photo, :id, :file, :thumbnail, :project_id, :order_in_project
  json.url photo_url(photo, format: :json)
end
