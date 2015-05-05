class Oldpicture < ActiveRecord::Base
    self.table_name = "pictures"
   establish_connection(:old)
end
