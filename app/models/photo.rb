class Photo < ActiveRecord::Base
  mount_uploader :file, FileUploader
  mount_uploader :thumbnail, FileUploader
end
