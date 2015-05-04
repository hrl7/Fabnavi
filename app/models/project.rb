class Project < ActiveRecord::Base
  enum status: [:private_project, :public_project, :group_project]
  validates :project_name , presence: true
  validates :user , presence: true
  validates :status , presence: true
  validates_uniqueness_of :user, scope: :project_name
  validates :project_name, length:{maximum:30,minimum:4}
  has_many :picture
  belongs_to :user
end
