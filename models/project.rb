class Project < ActiveRecord::Base
  validates_uniqueness_of :author, scope: :project_name
  has_many :picture
  belongs_to :author
  scope :project_list_LP, -> {
    joins(:author).all(:order => 'updated_at desc')
  }

  scope :find_project, -> (author,project_name){
    joins(:author).where(:project_name => project_name, :authors => {:name => author}).first
  }
end
