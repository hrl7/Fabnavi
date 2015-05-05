class Project < ActiveRecord::Base
  enum status: [:private_project, :public_project, :group_project]
  validates :project_name , presence: true
  validates :user , presence: true
  validates :status , presence: true
  validates_uniqueness_of :user, scope: :project_name
  validates :project_name, length:{maximum:30,minimum:4}
  has_many :photo
  has_many :tagging
  belongs_to :user

  def thumbnail_src
    t = Photo.where(:project => self, :order_in_project => self.thumbnail_picture_id).first
    src = t.try(:thumbnail).try(:url).to_s
    if src == ""
      src = t.try(:file).try(:url).to_s
    end

    if src == nil or src == ""
      return "/images/play.png"
    else
      return convert_file_to_s3 src
    end
  end

  # development only
  def convert_file_to_s3 url
    url.gsub(/^.*https%3A/,"https:/")
  end

  def visible_to_user? user
    self.public_project? or self.user == user
  end
end
