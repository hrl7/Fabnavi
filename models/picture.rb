class Picture < ActiveRecord::Base
  has_many :annotation
  belongs_to :project
end
