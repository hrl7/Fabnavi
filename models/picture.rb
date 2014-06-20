class Picture < ActiveRecord::Base
  has_many :annotation
  belongs_to :project

  scope :pictures_list, ->(id) {
    order("order_in_project asc").where(:project_id => id)  
  }
end
