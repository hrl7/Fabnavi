class Tag < ActiveRecord::Base
 validates :name, presence: true
 validates :name, length: { maximum:30, minimum:4}
 has_many :tagging
end
