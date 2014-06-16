class Project < ActiveRecord::Base
  validates_uniqueness_of :author, scope: :project_name
  has_many :picture
  belongs_to :author
end
