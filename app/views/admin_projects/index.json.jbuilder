json.array!(@projects) do |project|
  json.extract! project, :id, :project_name, :thumbnail_picture_id, :user_id, :status, :description
  json.url project_url(project, format: :json)
end
