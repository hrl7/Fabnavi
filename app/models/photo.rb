class Photo < ActiveRecord::Base
  belongs_to :project
  mount_uploader :file, FileUploader
  mount_uploader :thumbnail, FileUploader
end
