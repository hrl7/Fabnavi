class Picture < ActiveRecord::Base
  validates_uniqueness_of :order_in_project,scope: :project_id
  has_many :annotation
  belongs_to :project
end
