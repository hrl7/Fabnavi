class Playlist < ActiveRecord::Base
    validates_uniqueness_of :projectName
end
