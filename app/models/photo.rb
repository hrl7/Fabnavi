class Photo < ActiveRecord::Base
  belongs_to :project
  mount_uploader :file, FileUploader
  mount_uploader :thumbnail, FileUploader


  def file_url
    convert_file_to_s3 self.file.url
  end

  def thumbnail_url
    convert_file_to_s3 self.thumbnail.url
  end

  def convert_file_to_s3 url
    url.gsub(/^.*https%3A/,"https:/")
  end
end
