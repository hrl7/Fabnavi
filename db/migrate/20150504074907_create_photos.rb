class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :file,              null: false
      t.string :thumbnail,         null: false
      t.string :project_id,        null: false
      t.integer :order_in_project, null: false, default: -1

      t.timestamps null: false
    end
    add_index :photos , :file
    add_index :photos , :project_id
  end
end
